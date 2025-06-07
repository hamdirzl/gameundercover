// supabase/functions/game-logic/index.ts
// Pastikan versi impor sesuai dengan yang disarankan Supabase saat ini
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Ini penting untuk keamanan: fungsi hanya dapat diakses dengan kunci anon
// dan Anda perlu memverifikasi JWT dari klien untuk otorisasi lebih lanjut
serve(async (req) => {
    // Inisialisasi klien Supabase di sisi fungsi
    // Menggunakan env vars untuk kunci dan URL adalah praktik terbaik
    const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        {
            auth: {
                // Jangan menyimpan sesi di fungsi karena ini stateless
                persistSession: false,
            },
        },
    );

    // Ambil JWT dari header Authorization jika ada
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Authorization header missing' }), { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];

    // Verifikasi token untuk mendapatkan user ID
    const { data: userAuth, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError || !userAuth.user) {
        console.error('Authentication error:', authError?.message);
        return new Response(JSON.stringify({ error: 'Invalid authentication token' }), { status: 401 });
    }
    const userId = userAuth.user.id; // Ini adalah ID pengguna yang melakukan permintaan

    const { action, roomId, ...body } = await req.json();

    try {
        // Logika utama switch-case untuk menangani berbagai aksi game
        switch (action) {
            case 'startGame':
                // Pastikan hanya host yang bisa memulai game
                await verifyHost(supabaseClient, roomId, userId); // Fungsi pembantu untuk verifikasi
                return handleStartGame(supabaseClient, roomId);
            case 'playerReadyForDiscussion': // Aksi baru untuk memberitahu server bahwa pemain sudah melihat kartu
                await verifyPlayer(supabaseClient, roomId, userId);
                return handlePlayerReadyForDiscussion(supabaseClient, roomId, userId);
            case 'playerVote':
                // Pastikan pemain adalah yang mengirim vote dan tidak tereliminasi
                await verifyPlayer(supabaseClient, roomId, userId);
                return handlePlayerVote(supabaseClient, roomId, userId, body.targetId);
            case 'mrWhiteGuess':
                // Pastikan ini adalah Mr. White yang baru tereliminasi
                await verifyMrWhiteGuessRequest(supabaseClient, roomId, userId); // Perlu verifikasi spesifik untuk Mr. White
                return handleMrWhiteGuess(supabaseClient, roomId, userId, body.guess);
            case 'continueAfterElimination':
                // Verifikasi bahwa ini adalah pemain yang relevan (misal, siapa pun yang tidak tereliminasi)
                await verifyPlayer(supabaseClient, roomId, userId);
                return handleContinueAfterElimination(supabaseClient, roomId);
            case 'resetGame':
                // Hanya host yang bisa mereset game
                await verifyHost(supabaseClient, roomId, userId);
                return handleResetGame(supabaseClient, roomId);
            // Tambahkan case lain untuk aksi game (misal: 'submitClue', 'nextTurn', dll.)
            default:
                return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400 });
        }
    } catch (error) {
        console.error(`Error in game-logic function for action '${action}':`, error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: error.status || 500 });
    }
});

// ============================================
// FUNGSI PEMBANTU (Helper Functions)
// ============================================

// Fungsi untuk memverifikasi apakah pemanggil adalah host room
async function verifyHost(supabase, roomId, userId) {
    const { data: player, error } = await supabase
        .from('players')
        .select('is_host')
        .eq('id', userId)
        .eq('room_id', roomId)
        .single();

    if (error || !player || !player.is_host) {
        throw { message: 'Unauthorized: Only the host can perform this action.', status: 403 };
    }
}

// Fungsi untuk memverifikasi apakah pemanggil adalah pemain yang valid di room tersebut
async function verifyPlayer(supabase, roomId, userId) {
    const { data: player, error } = await supabase
        .from('players')
        .select('id, is_eliminated') // Ambil is_eliminated juga
        .eq('id', userId)
        .eq('room_id', roomId)
        .single();

    if (error || !player) {
        throw { message: 'Unauthorized: You are not a player in this room or invalid player ID.', status: 403 };
    }
    // Opsional: Anda bisa tambahkan pemeriksaan !player.is_eliminated di sini jika aksi hanya boleh dilakukan oleh pemain yang tidak tereliminasi.
    // Misalnya, untuk playerVote, tambahkan `if (player.is_eliminated) throw { message: 'Eliminated players cannot vote.', status: 403 };`
    return player; // Mengembalikan data pemain yang sudah diverifikasi
}

// Fungsi verifikasi spesifik untuk tebakan Mr. White
async function verifyMrWhiteGuessRequest(supabase, roomId, userId) {
    const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('last_eliminated_id')
        .eq('id', roomId)
        .single();
    if (roomError) throw { message: 'Room not found.', status: 404 };

    // Pastikan pemanggil adalah pemain yang terakhir tereliminasi DAN dia adalah Mr. White
    const { data: eliminatedPlayer, error: playerError } = await supabase
        .from('players')
        .select('id, role')
        .eq('id', room.last_eliminated_id)
        .eq('room_id', roomId)
        .single();

    if (playerError || !eliminatedPlayer || eliminatedPlayer.id !== userId || eliminatedPlayer.role !== 'Mr. White') {
        throw { message: 'Unauthorized: Only the eliminated Mr. White can guess.', status: 403 };
    }
}

// ============================================
// IMPLEMENTASI LOGIKA GAME UNTUK SETIAP AKSI
// ============================================

async function handleStartGame(supabase, roomId) {
    // 1. Ambil data room dan semua pemain di room
    const { data: roomPlayers, error: playerError } = await supabase
        .from('players')
        .select('*')
        .eq('room_id', roomId);

    if (playerError) throw { message: `Failed to fetch players: ${playerError.message}`, status: 500 };
    if (roomPlayers.length < 3) throw { message: 'Minimal 3 pemain untuk memulai game.', status: 400 };

    // 2. Tentukan jumlah peran dan kata (Anda perlu mengambil ini dari konfigurasi room jika ada)
    // Untuk saat ini, kita bisa hardcode atau ambil dari data room jika ada kolom konfigurasi
    const totalPlayers = roomPlayers.length;
    // Contoh pembagian peran sederhana (Anda perlu menyesuaikan ini dengan aturan game Anda)
    // Misalnya, 1 Undercover dan 1 Mr. White untuk 3-5 pemain, dst.
    let numUndercovers = 1;
    let numMrWhites = 1;
    let numCivilians = totalPlayers - numUndercovers - numMrWhites;

    // Menyesuaikan konfigurasi jika jumlah pemain terlalu sedikit
    if (totalPlayers >= 3 && totalPlayers <= 5) {
        numUndercovers = 1;
        numMrWhites = 1; // Opsional: Mr. White bisa 0 jika 3-4 pemain
        numCivilians = totalPlayers - numUndercovers - numMrWhites;
        if (numCivilians <= 0) { // Jika Civilian menjadi 0 atau negatif, sesuaikan
            numMrWhites = 0;
            numCivilians = totalPlayers - numUndercovers;
            if (numCivilians < 1) throw { message: 'Tidak cukup Civilian dengan konfigurasi ini.', status: 400 };
        }
    } else if (totalPlayers > 5 && totalPlayers <= 8) {
        numUndercovers = 2;
        numMrWhites = 1;
        numCivilians = totalPlayers - numUndercovers - numMrWhites;
        if (numCivilians < 1) throw { message: 'Tidak cukup Civilian dengan konfigurasi ini.', status: 400 };
    } else { // Untuk pemain lebih banyak, Anda bisa tambahkan logika sendiri
        // Default ke konfigurasi yang aman jika tidak ada aturan spesifik
        numUndercovers = Math.max(1, Math.floor(totalPlayers / 5)); // 1 UC setiap 5 pemain
        numMrWhites = (totalPlayers > 6) ? 1 : 0; // Mr. White jika > 6 pemain
        numCivilians = totalPlayers - numUndercovers - numMrWhites;
        if (numCivilians < 1) { // Fallback jika perhitungan di atas menghasilkan terlalu sedikit Civilian
            numUndercovers = 1;
            numMrWhites = 0;
            numCivilians = totalPlayers - numUndercovers;
        }
    }


    // 3. Distribusikan peran dan kata secara acak
    const roles = [];
    for (let i = 0; i < numCivilians; i++) roles.push("Civilian");
    for (let i = 0; i < numUndercovers; i++) roles.push("Undercover");
    for (let i = 0; i < numMrWhites; i++) roles.push("Mr. White");

    // Acak peran
    for (let i = roles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]];
    }

    // Pilih pasangan kata acak dari daftar kata bawaan
    const defaultWordPairs = [
        { civilian: "Apel", undercover: "Pir" }, { civilian: "Pantai", undercover: "Gurun" }, { civilian: "Kucing", undercover: "Anjing" },
        { civilian: "Buku", undercover: "Majalah" }, { civilian: "Mobil", undercover: "Motor" }, { civilian: "Rumah", undercover: "Apartemen" },
        { civilian: "Sepak Bola", undercover: "Basket" }, { civilian: "Dokter", undercover: "Perawat" }, { civilian: "Nasi", undercover: "Roti" },
        { civilian: "Hujan", undercover: "Salju" }, { civilian: "Sungai", undercover: "Danau" }, { civilian: "Gitar", undercover: "Piano" },
        { civilian: "Kopi", undercover: "Teh" }, { civilian: "Sendok", undercover: "Garpu" }, { civilian: "Gunung", undercover: "Bukit" },
        { civilian: "Laptop", undercover: "Komputer" }, { civilian: "Sepatu", undercover: "Sandal" }, { civilian: "Matahari", undercover: "Bulan" },
        { civilian: "Pintu", undercover: "Jendela" }, { civilian: "Meja", undercover: "Kursi" }, { civilian: "Guru", undercover: "Dosen" }
    ];
    // TODO: Jika Anda ingin menggunakan word packs kustom dari `wordPacks` table,
    // Anda perlu mengambilnya dari DB di sini berdasarkan user_id host (atau room_id jika disimpan di room)
    const selectedWordPair = defaultWordPairs[Math.floor(Math.random() * defaultWordPairs.length)];
    const civilianWord = selectedWordPair.civilian;
    const undercoverWord = selectedWordPair.undercover;

    // Update setiap pemain dengan peran dan kata mereka
    const updates = roomPlayers.map((player, index) => {
        const assignedRole = roles[index];
        const assignedWord = (assignedRole === "Civilian") ? civilianWord : (assignedRole === "Undercover") ? undercoverWord : null;
        return {
            id: player.id,
            room_id: roomId, // Penting untuk upsert agar tidak membuat baris baru
            role: assignedRole,
            word: assignedWord,
            is_eliminated: false, // Reset status eliminasi untuk ronde baru
            voted_for: null, // Reset vote
            // score tidak direset di sini, karena score bersifat kumulatif
            ready_for_discussion: false // Tambahkan kolom baru untuk melacak kesiapan pemain
        };
    });

    // 4. Lakukan update batch ke tabel players
    // Menggunakan upsert dengan onConflict: id untuk memperbarui baris yang sudah ada
    const { error: updatePlayersError } = await supabase.from('players').upsert(updates, { onConflict: 'id' });
    if (updatePlayersError) throw { message: `Failed to update players: ${updatePlayersError.message}`, status: 500 };

    // 5. Update status room menjadi 'card_distribution' dan simpan kata
    // Set current_turn_player_id ke pemain pertama (host) atau secara acak
    const firstPlayerId = roomPlayers[0].id; // Atau pilih secara acak
    const { error: updateRoomError } = await supabase
        .from('rooms')
        .update({
            game_state: 'card_distribution',
            civilian_word: civilianWord,
            undercover_word: undercoverWord,
            last_eliminated_id: null,
            winner_details: null,
            current_turn_player_id: firstPlayerId // Set giliran pertama
        })
        .eq('id', roomId);
    if (updateRoomError) throw { message: `Failed to update room state: ${updateRoomError.message}`, status: 500 };

    return new Response(JSON.stringify({ message: 'Game started successfully', civilianWord, undercoverWord }), { status: 200 });
}

// Fungsi baru: Pemain memberi tahu server bahwa mereka sudah melihat kartu dan siap berdiskusi
async function handlePlayerReadyForDiscussion(supabase, roomId, playerId) {
    // Tandai pemain ini sebagai siap
    const { error: updatePlayerError } = await supabase
        .from('players')
        .update({ ready_for_discussion: true })
        .eq('id', playerId)
        .eq('room_id', roomId);
    if (updatePlayerError) throw { message: `Failed to set player ready status: ${updatePlayerError.message}`, status: 500 };

    // Cek apakah semua pemain aktif sudah siap
    const { data: playersInRoom, error: playersError } = await supabase
        .from('players')
        .select('id, is_eliminated, ready_for_discussion')
        .eq('room_id', roomId);
    if (playersError) throw { message: `Failed to fetch players for ready check: ${playersError.message}`, status: 500 };

    const activePlayers = playersInRoom.filter(p => !p.is_eliminated);
    const allActivePlayersReady = activePlayers.every(p => p.ready_for_discussion);

    if (allActivePlayersReady) {
        // Jika semua siap, ubah state room ke 'discussion'
        const { error: updateRoomError } = await supabase
            .from('rooms')
            .update({ game_state: 'discussion' })
            .eq('id', roomId);
        if (updateRoomError) throw { message: `Failed to update room state to discussion: ${updateRoomError.message}`, status: 500 };
    }

    return new Response(JSON.stringify({ message: 'Player ready status updated.' }), { status: 200 });
}


async function handlePlayerVote(supabase, roomId, voterId, targetId) {
    // 1. Verifikasi pemain yang memilih dan statusnya (tidak boleh tereliminasi)
    const voter = await verifyPlayer(supabase, roomId, voterId);
    if (voter.is_eliminated) {
        throw { message: 'Eliminated players cannot vote.', status: 403 };
    }
    // Pastikan pemain belum vote
    if (voter.voted_for) {
        throw { message: 'You have already voted this round.', status: 400 };
    }

    // 2. Update vote pemain yang mengirim permintaan
    const { error: voteError } = await supabase
        .from('players')
        .update({ voted_for: targetId })
        .eq('id', voterId)
        .eq('room_id', roomId); // Tambahkan room_id untuk keamanan tambahan

    if (voteError) throw { message: `Failed to record vote: ${voteError.message}`, status: 500 };

    // 3. Ambil semua pemain aktif (belum tereliminasi)
    const { data: activePlayers, error: activePlayersError } = await supabase
        .from('players')
        .select('*')
        .eq('room_id', roomId)
        .eq('is_eliminated', false);

    if (activePlayersError) throw { message: `Failed to fetch active players: ${activePlayersError.message}`, status: 500 };

    // 4. Cek apakah semua pemain aktif sudah melakukan vote
    const playersWhoVoted = activePlayers.filter(p => p.voted_for !== null);
    if (playersWhoVoted.length === activePlayers.length) {
        // Semua sudah vote, hitung hasil vote
        const voteCounts = {};
        playersWhoVoted.forEach(p => {
            voteCounts[p.voted_for] = (voteCounts[p.voted_for] || 0) + 1;
        });

        let eliminatedPlayerId = null;
        let maxVotes = 0;
        let tiedCandidates = [];

        // Identifikasi kandidat dengan suara terbanyak
        for (const playerId in voteCounts) {
            if (voteCounts[playerId] > maxVotes) {
                maxVotes = voteCounts[playerId];
                tiedCandidates = [playerId]; // Reset jika ada yang lebih tinggi
            } else if (voteCounts[playerId] === maxVotes) {
                tiedCandidates.push(playerId); // Tambahkan jika suara sama
            }
        }

        // Jika ada seri, pilih secara acak dari yang seri
        if (tiedCandidates.length > 1) {
            eliminatedPlayerId = tiedCandidates[Math.floor(Math.random() * tiedCandidates.length)];
        } else {
            eliminatedPlayerId = tiedCandidates[0];
        }

        // Dapatkan data pemain yang tereliminasi
        const { data: eliminatedPlayer, error: eliminatedPlayerFetchError } = await supabase
            .from('players')
            .select('*')
            .eq('id', eliminatedPlayerId)
            .single();

        if (eliminatedPlayerFetchError) throw { message: `Failed to fetch eliminated player: ${eliminatedPlayerFetchError.message}`, status: 500 };

        // Update status eliminasi pemain
        const { error: updateEliminationError } = await supabase
            .from('players')
            .update({ is_eliminated: true })
            .eq('id', eliminatedPlayerId);

        if (updateEliminationError) throw { message: `Failed to update player elimination status: ${updateEliminationError.message}`, status: 500 };

        // Reset voted_for untuk semua pemain untuk ronde berikutnya (atau biar bersih)
        await supabase.from('players').update({ voted_for: null }).eq('room_id', roomId);

        // Update status room dan last_eliminated_id
        let nextGameState = 'elimination_result';
        if (eliminatedPlayer.role === 'Mr. White') {
            nextGameState = 'mr_white_guess';
        }

        await supabase
            .from('rooms')
            .update({
                game_state: nextGameState,
                last_eliminated_id: eliminatedPlayerId,
                current_turn_player_id: null // Reset giliran sementara setelah voting
            })
            .eq('id', roomId);

        return new Response(JSON.stringify({ message: 'Voting concluded', eliminatedPlayerId: eliminatedPlayerId }), { status: 200 });

    } else {
        // Belum semua vote, biarkan state 'voting'
        return new Response(JSON.stringify({ message: 'Vote recorded, waiting for other players' }), { status: 202 });
    }
}

async function handleMrWhiteGuess(supabase, roomId, mrWhitePlayerId, guess) {
    // 1. Ambil data room untuk mendapatkan kata Civilian dan last_eliminated_id
    const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('civilian_word, last_eliminated_id')
        .eq('id', roomId)
        .single();
    if (roomError) throw { message: `Room not found for guess: ${roomError.message}`, status: 404 };

    // Pastikan pemanggil adalah Mr. White yang baru tereliminasi
    if (room.last_eliminated_id !== mrWhitePlayerId) {
        throw { message: 'Unauthorized: You are not the eliminated Mr. White for this guess.', status: 403 };
    }

    const civilianWord = room.civilian_word;
    let newGameState = 'game_over'; // Mr. White guess selalu mengakhiri permainan
    let winnerDetails = null;

    if (guess.toLowerCase() === civilianWord.toLowerCase()) {
        // Ambil nama Mr. White dari DB
        const { data: mwPlayer, error: mwPlayerError } = await supabase.from('players').select('name').eq('id', mrWhitePlayerId).single();
        if (mwPlayerError || !mwPlayer) console.error("Could not fetch Mr. White's name for winner details:", mwPlayerError);
        winnerDetails = `🎉 Selamat! Mr. White (${mwPlayer ? mwPlayer.name : 'Tidak Diketahui'}) berhasil menebak kata rahasia Civilian!`;

    } else {
        winnerDetails = `Mr. White gagal menebak kata.`;
    }

    // Set game_state ke game_over, dan update winner_details
    const { error: updateRoomError } = await supabase
        .from('rooms')
        .update({
            game_state: newGameState,
            winner_details: winnerDetails,
        })
        .eq('id', roomId);
    if (updateRoomError) throw { message: `Failed to update room after Mr. White guess: ${updateRoomError.message}`, status: 500 };

    return new Response(JSON.stringify({ message: 'Mr. White guess processed', correct: guess.toLowerCase() === civilianWord.toLowerCase() }), { status: 200 });
}

async function handleContinueAfterElimination(supabase, roomId) {
    // 1. Ambil data room dan semua pemain (aktif dan tereliminasi)
    const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('civilian_word, undercover_word, last_eliminated_id')
        .eq('id', roomId)
        .single();
    if (roomError) throw { message: `Room not found for continue: ${roomError.message}`, status: 404 };

    const { data: playersInRoom, error: playersError } = await supabase
        .from('players')
        .select('*')
        .eq('room_id', roomId);
    if (playersError) throw { message: `Failed to fetch players for continue: ${playersError.message}`, status: 500 };

    const activePlayers = playersInRoom.filter(p => !p.is_eliminated);
    const activeCivilians = activePlayers.filter(p => p.role === 'Civilian');
    const activeUndercovers = activePlayers.filter(p => p.role === 'Undercover');
    const activeMrWhite = activePlayers.filter(p => p.role === 'Mr. White');

    let newGameState = 'discussion'; // Default: kembali ke diskusi
    let winnerDetails = null;

    // --- Cek Kondisi Kemenangan ---
    // Kemenangan Civilian: Semua Undercover dan Mr. White tereliminasi
    if (activeUndercovers.length === 0 && activeMrWhite.length === 0) {
        newGameState = 'game_over';
        winnerDetails = '🎉 Selamat, Tim Civilian! 🎉\nTim Civilian berhasil mengungkap semua penjahat!';
    }
    // Kemenangan Undercover/Mr. White: Civilian tereliminasi semua
    else if (activeCivilians.length === 0) {
        newGameState = 'game_over';
        if (activeUndercovers.length > 0 && activeMrWhite.length > 0) {
            winnerDetails = '🎉 Selamat, Tim Undercover & Mr. White! 🎉\nTim Undercover dan Mr. White berhasil mengeliminasi semua Civilian!';
        } else if (activeUndercovers.length > 0) {
            winnerDetails = '🎉 Selamat, Tim Undercover! 🎉\nTim Undercover berhasil bertahan hingga akhir!';
        } else if (activeMrWhite.length > 0) {
            winnerDetails = '🎉 Selamat, Tim Mr. White! 🎉\nMr. White berhasil bertahan hingga semua Civilian tersingkir!';
        }
    }

    // Jika game_state berubah menjadi 'game_over', hitung skor
    if (newGameState === 'game_over') {
        const POINTS_MW_GUESS_WIN = 7;
        const POINTS_UC_WIN = 5;
        const POINTS_MW_SURVIVAL_WIN = 5;
        const POINTS_CIVILIAN_TEAM_WIN_SURVIVED = 3;
        const POINTS_CIVILIAN_TEAM_WIN_ELIMINATED = 1;
        const POINTS_LOSER = 0;

        const updatedPlayerScores = playersInRoom.map(p => {
            let roundScore = POINTS_LOSER;
            // Pastikan p.role di sini adalah role aslinya (misalnya jika Mr. White menang tebak)
            // Atau Anda perlu menyimpan original_role di tabel players
            const originalRole = p.role; // Asumsi 'role' di DB adalah peran aslinya untuk tujuan skor

            if (room.winner_details && room.winner_details.includes('Mr. White') && room.winner_details.includes('menebak')) {
                // Kasus Kemenangan Mr. White Menebak Kata (Jika sebelumnya masuk via mr_white_guess)
                if (originalRole === 'Mr. White' && p.id === room.last_eliminated_id) {
                    roundScore = POINTS_MW_GUESS_WIN;
                }
            } else if (winnerDetails && winnerDetails.includes('Tim Civilian')) {
                // Kasus Kemenangan Tim Civilian
                if (originalRole === 'Civilian') {
                    roundScore = p.is_eliminated ? POINTS_CIVILIAN_TEAM_WIN_ELIMINATED : POINTS_CIVILIAN_TEAM_WIN_SURVIVED;
                }
            } else if (winnerDetails && (winnerDetails.includes('Tim Undercover') || winnerDetails.includes('Tim Mr. White'))) {
                // Kasus Kemenangan Tim Undercover atau Mr. White (bertahan)
                const isWinningTeamMember = (originalRole === 'Undercover' || originalRole === 'Mr. White');
                if (isWinningTeamMember && !p.is_eliminated) {
                    if (originalRole === 'Undercover') roundScore = POINTS_UC_WIN;
                    if (originalRole === 'Mr. White') roundScore = POINTS_MW_SURVIVAL_WIN;
                }
            }
            return { id: p.id, score: p.score + roundScore }; // Tambahkan skor ronde ke skor total
        });

        // Lakukan update batch untuk skor
        const { error: updateScoresError } = await supabase.from('players').upsert(updatedPlayerScores, { onConflict: 'id' });
        if (updateScoresError) console.error("Error updating player scores:", updateScoresError);
    }
    
    // Reset ready_for_discussion untuk semua pemain jika game berlanjut
    if (newGameState === 'discussion') {
        const { error: resetReadyError } = await supabase
            .from('players')
            .update({ ready_for_discussion: false })
            .eq('room_id', roomId);
        if (resetReadyError) console.error("Failed to reset ready_for_discussion:", resetReadyError);
    }

    // Update status room
    const { error: updateRoomError } = await supabase
        .from('rooms')
        .update({
            game_state: newGameState,
            winner_details: winnerDetails,
            current_turn_player_id: activePlayers.length > 0 ? activePlayers[0].id : null // Set giliran untuk ronde berikutnya jika game berlanjut
        })
        .eq('id', roomId);

    if (updateRoomError) throw { message: `Failed to update room state after continuation: ${updateRoomError.message}`, status: 500 };

    return new Response(JSON.stringify({ message: 'Continued to next phase', newGameState, winnerDetails }), { status: 200 });
}

async function handleResetGame(supabase, roomId) {
    // Reset status room ke lobby
    const { error: roomError } = await supabase
        .from('rooms')
        .update({
            game_state: 'lobby',
            civilian_word: null,
            undercover_word: null,
            last_eliminated_id: null,
            winner_details: null,
            current_turn_player_id: null
        })
        .eq('id', roomId);
    if (roomError) throw { message: `Failed to reset room: ${roomError.message}`, status: 500 };

    // Reset status pemain di room (tapi biarkan skor)
    const { error: playersError } = await supabase
        .from('players')
        .update({
            role: null,
            word: null,
            is_eliminated: false,
            voted_for: null,
            ready_for_discussion: false // Reset status siap
            // score tidak direset di sini, karena score bersifat kumulatif antar ronde
        })
        .eq('room_id', roomId);
    if (playersError) throw { message: `Failed to reset players: ${playersError.message}`, status: 500 };

    return new Response(JSON.stringify({ message: 'Game reset successfully' }), { status: 200 });
}