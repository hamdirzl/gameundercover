// File: online.js (Versi Sempurna dengan State Management Terpusat dan Integrasi Supabase Edge Functions)

document.addEventListener('DOMContentLoaded', () => {
    // === ELEMEN UI ===
    const lobbySection = document.getElementById('online-lobby-section');
    const gameRoomSection = document.getElementById('online-game-room');
    const playerNameInput = document.getElementById('player-name-online');
    const createRoomBtn = document.getElementById('create-room-btn');
    const joinRoomBtn = document.getElementById('join-room-btn');
    const joinRoomCodeInput = document.getElementById('join-room-code');
    const errorUI = document.getElementById('online-error');
    const roomCodeDisplay = document.getElementById('room-code-display');
    const copyCodeBtn = document.getElementById('copy-code-btn');
    const gameStatusInfo = document.getElementById('game-status-info');
    const playerCountUI = document.getElementById('player-count');
    const playerListUI = document.getElementById('online-player-list');
    const startGameBtn = document.getElementById('start-game-online-btn');
    const leaveRoomBtn = document.getElementById('leave-room-btn');
    
    // Elemen Modal
    const cardRevealModal = document.getElementById('card-reveal-modal');
    const cardRevealTitle = document.getElementById('card-reveal-popup-title');
    const roleCard = document.getElementById('role-card');
    const cardRole = document.getElementById('card-player-role');
    const cardWord = document.getElementById('card-player-word');
    const cardMission = document.getElementById('card-player-mission');
    const hideCardBtn = document.getElementById('hide-card-and-proceed-btn');

    const mrWhiteGuessModal = document.getElementById('mr-white-guess-section');
    const mrWhiteNameGuess = document.getElementById('mr-white-name-guess');
    const mrWhiteGuessInput = document.getElementById('mr-white-word-guess-input');
    const submitMrWhiteGuessBtn = document.getElementById('submit-mr-white-guess-btn');
    const mrWhiteWaitMessage = document.getElementById('mr-white-wait-message');
    const mrWhiteWaitName = document.getElementById('mr-white-wait-name');

    const eliminationModal = document.getElementById('elimination-result-popup');
    const eliminatedInfo = document.getElementById('eliminated-player-info');
    const truthDareSection = document.getElementById('truth-or-dare-section');
    const truthBtn = document.getElementById('truth-btn');
    const dareBtn = document.getElementById('dare-btn');
    const penaltyDisplay = document.getElementById('penalty-display');
    const penaltyText = document.getElementById('penalty-text');
    const penaltyWaitMessage = document.getElementById('penalty-wait-message');
    const closeEliminationBtn = document.getElementById('close-elimination-popup-btn');

    const winnerModal = document.getElementById('winner-popup-modal');
    const confetti = document.getElementById('confetti-animation');
    const winnerMessage = document.getElementById('popup-winner-message');
    const winnerDetail = document.getElementById('popup-winner-detail');
    const roundRolesList = document.getElementById('round-roles-list');
    const playAgainBtn = document.getElementById('play-again-btn');
    const hostWaitMessage = document.getElementById('host-wait-message');

    // === GAME STATE ===
    let localPlayer = { id: null, name: null, is_host: false, role: null, word: null, is_eliminated: false, voted_for: null };
    let currentRoom = null;
    let playersInRoom = []; // Daftar semua pemain di room, disinkronkan dari DB
    let roomChannel = null; // Channel Realtime Supabase
    let eliminatedThisRoundPlayer = null; // Data pemain yang tereliminasi di ronde ini

    // Biarkan ToD di sisi client agar cepat (tidak perlu disinkronkan ke DB)
    const truths = [ "Apa hal paling memalukan minggu ini?", "Hewan apa kamu & kenapa?", "Siapa paling bikin ketawa disini?", "Kebiasaan burukmu?", "Film/serial favorit sepanjang masa?", "Nemu dompet isi uang, kamu apain?", "Hal konyol dipercaya waktu kecil?", "Tokoh fiksi inspiratif?", "Makanan aneh pernah dicoba?", "Satu permintaan, minta apa?", "Lagu guilty pleasure?", "Bakat terpendammu?", "Liburan paling berkesan?", "Guru/dosen paling berpengaruh?", "Mimpi teraneh?" ];
    const dares = [ "Tiru suara kartun 15d.", "Tarian robot 30d.", "Sebut 5 benda merah 10d.", "Jadi reporter kejadian aneh.", "Nyanyi reff 'Balonku' gaya opera.", "Cerita lelucon.", "Jalan mundur keliling meja.", "Mata tertutup tebak 3 benda.", "Puji 3 orang disini.", "10 push-up/squat/jumping jack.", "Bicara aksen daerah lain 1m.", "Buat wajah paling lucu.", "Peluk (izin) pemain kananmu.", "Telepon teman nyanyi HBD.", "Pakai kaus kaki jadi sarung tangan." ];

    // === FUNGSI BANTUAN ===
    const showError = (message) => {
        errorUI.textContent = message;
        errorUI.classList.remove('hidden');
        setTimeout(() => errorUI.classList.add('hidden'), 5000);
    };

    const switchView = (view) => {
        lobbySection.classList.add('hidden');
        gameRoomSection.classList.add('hidden');
        if (view === 'lobby') lobbySection.classList.remove('hidden');
        if (view === 'room') gameRoomSection.classList.remove('hidden');
    };

    const hideAllModals = () => {
        [cardRevealModal, mrWhiteGuessModal, eliminationModal, winnerModal].forEach(m => m.classList.add('hidden'));
    };
    
    // Fungsi untuk memanggil Supabase Edge Function dengan penanganan error terpusat
    const invokeGameFunction = async (action, body = {}) => {
        // Dapatkan sesi pengguna saat ini untuk token autentikasi
        const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
        if (sessionError) {
            console.error("Error getting session:", sessionError);
            showError("Gagal mendapatkan sesi. Silakan coba login kembali.");
            // Mungkin arahkan ke halaman utama untuk login jika tidak ada sesi
            return false;
        }

        const token = session?.access_token;

        if (!token) {
            showError("Anda tidak terautentikasi. Silakan masuk atau daftar terlebih dahulu.");
            // Redirect ke halaman utama (index.html) yang memiliki modal auth
            window.location.href = 'index.html'; 
            return false;
        }

        const { data, error } = await supabaseClient.functions.invoke('game-logic', {
            body: { action, roomId: currentRoom ? currentRoom.id : null, playerId: localPlayer.id, ...body }, // Selalu kirim roomId & playerId
            headers: {
                'Authorization': `Bearer ${token}`, // PENTING: Tambahkan header ini
            },
        });
        if (error) {
            console.error(`Error on action '${action}':`, error);
            showError(`Gagal melakukan aksi: ${error.message}`);
            // Kembalikan state tombol ke semula jika ada error (opsional, tergantung aksi)
            document.querySelectorAll('button').forEach(b => b.disabled = false);
            return false;
        }
        return true;
    };


    // === FUNGSI INTI GAME (CLIENT-SIDE) ===

    // --- LOBBY & JOIN ---
    const handleCreateRoom = async () => {
        const name = playerNameInput.value.trim();
        if (!name) return showError("Nama Anda tidak boleh kosong!");

        localPlayer.name = name;
        localPlayer.is_host = true; // Akan dikonfirmasi oleh server

        // Dapatkan sesi pengguna saat ini. Host harus login.
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            showError("Anda harus login untuk membuat room.");
            // Redirect ke halaman utama (index.html) yang memiliki modal auth
            window.location.href = 'index.html'; 
            return;
        }

        try {
            // Panggil Edge Function untuk membuat room
            // Di sini Anda tidak invoke 'game-logic' karena ini adalah aksi khusus lobby.
            // Anda bisa membuat fungsi Edge Function terpisah untuk lobby,
            // atau tambahkan 'createRoom' action ke game-logic jika mau.
            // Untuk kesederhanaan, kita akan lakukan insert langsung di client.
            // CATATAN: Ini berarti RLS untuk INSERT rooms harus mengizinkan authenticated user.
            const code = Math.random().toString(36).substring(2, 7).toUpperCase();
            const { data: room, error: roomCreateError } = await supabaseClient
                .from('rooms')
                .insert({ code, host_name: name, game_state: 'lobby' })
                .select()
                .single();
            
            if (roomCreateError) throw roomCreateError;
            
            // Setelah room berhasil dibuat, langsung join
            await handleJoinRoom(code, name, true); // Teruskan isHost: true
            
        } catch (error) {
            console.error("Error creating room:", error);
            showError(`Gagal membuat room: ${error.message}`);
            localPlayer.is_host = false; // Reset status host jika gagal
        }
    };

    const handleJoinRoom = async (code = null, name = null, isHost = false) => {
        const playerName = name || playerNameInput.value.trim();
        if (!playerName) return showError("Nama Anda tidak boleh kosong!");
        
        const roomCode = (code || joinRoomCodeInput.value.trim()).toUpperCase();
        if (!roomCode) return showError("Kode room tidak boleh kosong!");

        // Dapatkan sesi pengguna saat ini. Pemain harus login.
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            showError("Anda harus login untuk bergabung ke room.");
            // Redirect ke halaman utama (index.html) yang memiliki modal auth
            window.location.href = 'index.html'; 
            return;
        }

        try {
            // 1. Cek apakah room ada & valid untuk join
            const { data: room, error: roomError } = await supabaseClient
                .from('rooms')
                .select('*')
                .eq('code', roomCode)
                .single();
            if (roomError || !room) throw new Error(`Room ${roomCode} tidak ditemukan.`);
            if (room.game_state !== 'lobby') throw new Error('Game sudah dimulai, tidak bisa bergabung.');
            
            currentRoom = room;

            // 2. Masukkan pemain baru ke database
            // Supabase Realtime akan mengidentifikasi user berdasarkan auth.uid()
            // Kita akan menggunakan auth.uid() sebagai ID pemain di tabel 'players'
            const { data: player, error: playerInsertError } = await supabaseClient
                .from('players')
                .upsert({ id: session.user.id, name: playerName, room_id: currentRoom.id, is_host: isHost }, { onConflict: 'id' })
                .select()
                .single();
            
            if (playerInsertError) throw playerInsertError;

            localPlayer.id = player.id;
            localPlayer.name = player.name;
            localPlayer.is_host = player.is_host; // Konfirmasi status host dari DB
            
            // Simpan info ke session storage untuk re-join jika disconnect
            sessionStorage.setItem('undercoverPlayerId', localPlayer.id);
            sessionStorage.setItem('undercoverRoomId', currentRoom.id);

            // 3. Pindah view dan mulai listen ke perubahan
            switchView('room');
            roomCodeDisplay.textContent = currentRoom.code;
            await listenToRoomChanges(); // Mulai mendengarkan perubahan realtime

        } catch (error) {
            console.error("Error joining room:", error);
            showError(error.message);
            currentRoom = null; // Reset currentRoom jika gagal
        }
    };

    // --- REALTIME & DATA SYNC ---
    const listenToRoomChanges = async () => {
        if (roomChannel) {
            await supabaseClient.removeChannel(roomChannel); // Hapus channel lama jika ada
            roomChannel = null;
        }
        
        roomChannel = supabaseClient.channel(`room_${currentRoom.id}`) // Nama channel unik per room
            .on('postgres_changes', { event: '*', schema: 'public', table: 'players', filter: `room_id=eq.${currentRoom.id}` }, handleDataChange)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${currentRoom.id}` }, handleDataChange)
            .subscribe(status => {
                if (status === 'SUBSCRIBED') {
                    console.log('Tersambung ke room, mengambil data awal...');
                    fetchAndUpdateGameData(); // Ambil data lengkap saat pertama kali terhubung
                } else if (status === 'CHANNEL_ERROR') {
                    console.error('Realtime channel error:', status);
                    showError('Koneksi Realtime terputus. Coba refresh halaman.');
                    handleLeaveRoom(); // Kembali ke lobi jika ada error channel serius
                }
            });
    };
    
    // Fungsi baru untuk menangani payload realtime
    const handleDataChange = (payload) => {
        console.log('Perubahan terdeteksi:', payload);
        // Untuk kesederhanaan dan ketangguhan, setiap perubahan di DB akan memicu fetch ulang data lengkap
        fetchAndUpdateGameData();
    };
    
    const fetchAndUpdateGameData = async () => {
        if (!currentRoom || !localPlayer.id) { // Pastikan currentRoom dan localPlayer.id sudah ada
            console.warn("fetchAndUpdateGameData dipanggil tanpa currentRoom atau localPlayer.id.");
            return;
        }

        // Ambil data room dan player secara bersamaan
        const { data, error } = await supabaseClient
            .from('rooms')
            .select('*, players(*)') // Mengambil semua kolom room dan semua pemain terkait
            .eq('id', currentRoom.id)
            .single();

        if (error || !data) {
            console.error('Gagal fetch data atau room sudah tidak ada:', error);
            alert("Room tidak ditemukan atau terjadi error. Kembali ke lobi.");
            await handleLeaveRoom(); // Penting untuk kembali ke lobi jika room hilang
            return;
        }
        
        const oldGameState = currentRoom.game_state; // Simpan state lama untuk deteksi perubahan
        currentRoom = data; // Update data room
        // Sortir pemain berdasarkan created_at atau nama untuk konsistensi
        playersInRoom = data.players.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        // PENTING: Perbarui data localPlayer dengan data terbaru dari server
        const self = playersInRoom.find(p => p.id === localPlayer.id);
        if (self) {
            // Update localPlayer dengan semua properti dari objek player di DB
            localPlayer = { 
                ...localPlayer, 
                ...self,
                // Pastikan role dan word juga terupdate
                role: self.role,
                word: self.word,
                is_eliminated: self.is_eliminated,
                voted_for: self.voted_for,
                is_host: self.is_host // Perbarui status host juga
            };
        } else {
            // Pemain tidak ditemukan di room (mungkin di-kick atau room di-reset)
            console.warn("Pemain lokal tidak ditemukan di room. Kembali ke lobi.");
            alert("Anda tidak lagi berada di dalam room.");
            await handleLeaveRoom();
            return;
        }

        // Render UI berdasarkan data baru
        renderPlayerList();
        updateUIBasedOnState();
        
        // Panggil fungsi spesifik jika state game berubah
        if (currentRoom.game_state !== oldGameState) {
            handleStateChange(currentRoom.game_state, oldGameState);
        }
    };

    // --- RENDER & UI UPDATE ---
    const renderPlayerList = () => {
        playerListUI.innerHTML = '';
        // Tentukan apakah fase voting dan apakah pemain bisa vote
        const canVote = currentRoom.game_state === 'voting' && !localPlayer.is_eliminated && !localPlayer.voted_for;

        playerCountUI.textContent = `${playersInRoom.filter(p => !p.is_eliminated).length}/${playersInRoom.length}`; // Update counter
        startGameBtn.classList.toggle('hidden', !(localPlayer.is_host && playersInRoom.length >= 3 && currentRoom?.game_state === 'lobby'));

        playersInRoom.forEach((player, index) => {
            const li = document.createElement('li');
            li.dataset.playerId = player.id;
            li.className = 'player-avatar-card';

            if (player.id === localPlayer.id) li.classList.add('is-me');
            if (player.is_eliminated) li.classList.add('eliminated'); // Tambahkan class eliminated
            
            // Tambahkan class jika player sedang aktif untuk di-vote
            if (canVote && !player.is_eliminated) {
                li.classList.add('voting-active');
            }
            
            const img = document.createElement('img');
            img.src = `assets/images/avatar${(index % 6) + 1}.png`; // Menggunakan indeks untuk avatar
            img.className = 'player-avatar-img';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = player.name + (player.is_host ? ' 👑' : '');
            nameSpan.className = 'player-avatar-name';
            
            li.append(img, nameSpan);

            // Tombol Vote
            if (canVote && !player.is_eliminated && player.id !== localPlayer.id) {
                const voteBtn = document.createElement('button');
                voteBtn.className = 'vote-button';
                voteBtn.dataset.targetId = player.id;
                voteBtn.innerHTML = '<i class="fas fa-vote-yea"></i> Vote';
                li.appendChild(voteBtn);
            }
            
            // Indikator Voted (jika pemain lain sudah vote)
            if (currentRoom.game_state === 'voting' && player.voted_for) {
                const votedForTarget = playersInRoom.find(p => p.id === player.voted_for);
                if (votedForTarget) {
                    const votedIndicator = document.createElement('div');
                    votedIndicator.className = 'voted-indicator'; // Anda perlu CSS untuk ini
                    votedIndicator.innerHTML = `<span><i class="fas fa-arrow-right"></i> memilih ${votedForTarget.name}</span>`;
                    // Atau hanya visual kecil di avatar yang memilih
                }
            }

            playerListUI.appendChild(li);
        });
        
        // Tampilkan/sembunyikan tombol mulai berdasarkan kondisi
        startGameBtn.classList.toggle('hidden', !(localPlayer.is_host && playersInRoom.length >= 3 && currentRoom?.game_state === 'lobby'));
    };

    const updateUIBasedOnState = () => {
        // Update info status berdasarkan state dari DB
        const statusMap = {
            'lobby': localPlayer.is_host ? 'Anda adalah Host. Tunggu pemain lain bergabung, lalu mulai game.' : 'Menunggu Host memulai permainan...',
            'card_distribution': localPlayer.is_host ? 'Membagikan kartu kepada pemain...' : 'Membagikan kartu... Cek kartu Anda!',
            'discussion': 'Waktunya Diskusi! Berikan petunjuk satu kata secara bergiliran. (Host akan mengarahkan giliran)',
            'voting': localPlayer.voted_for ? 'Anda sudah memilih. Menunggu pemain lain melakukan vote...' : 'Waktunya Voting! Pilih pemain yang paling mencurigakan.',
            'elimination_result': 'Menunggu hasil eliminasi...',
            'mr_white_guess': 'Menunggu tebakan Mr. White...',
            'game_over': 'Permainan Selesai!'
        };
        gameStatusInfo.textContent = statusMap[currentRoom.game_state] || 'Memuat...';

        // Tampilkan/sembunyikan modal berdasarkan state
        hideAllModals(); // Sembunyikan semua modal terlebih dahulu

        switch (currentRoom.game_state) {
            case 'card_distribution':
                // Hanya tampilkan kartu jika localPlayer.role sudah ada
                if (localPlayer.role) {
                    showRoleOnCard();
                } else {
                    // Jika role belum terdistribusi ke localPlayer, tunggu update berikutnya
                    console.log('Menunggu distribusi peran ke pemain lokal...');
                }
                break;
            case 'elimination_result':
                // Tampilkan hasil eliminasi jika ada pemain yang tereliminasi di room.last_eliminated_id
                eliminatedThisRoundPlayer = playersInRoom.find(p => p.id === currentRoom.last_eliminated_id);
                if (eliminatedThisRoundPlayer) {
                    showEliminationResult();
                }
                break;
            case 'mr_white_guess':
                // Tampilkan modal tebakan Mr. White jika ada pemain yang tereliminasi di room.last_eliminated_id
                eliminatedThisRoundPlayer = playersInRoom.find(p => p.id === currentRoom.last_eliminated_id);
                if (eliminatedThisRoundPlayer) {
                    showMrWhiteGuessModal();
                }
                break;
            case 'game_over':
                showWinnerScreen();
                break;
        }
    };
    
    // --- STATE CHANGE HANDLER ---
    // Dipanggil saat currentRoom.game_state berubah
    const handleStateChange = (newState, oldState) => {
        console.log(`Game State changed from ${oldState} to ${newState}`);
        hideAllModals(); // Sembunyikan semua modal saat transisi state

        switch (newState) {
            case 'lobby':
                // Jika game di-reset kembali ke lobby, reset UI game
                // Ini akan dihandle oleh fetchAndUpdateGameData yang memanggil renderPlayerList dan updateUIBasedOnState
                break;
            case 'card_distribution':
                // UI akan diupdate oleh updateUIBasedOnState, dan jika localPlayer.role sudah ada, showRoleOnCard akan dipanggil
                break;
            case 'discussion':
                // Logika UI untuk fase diskusi
                // Misalnya, tampilkan chat, indikator giliran, dll.
                // Jika modal kartu masih terbuka, tutup
                cardRevealModal.classList.add('hidden');
                break;
            case 'voting':
                // Logika UI untuk fase voting
                // updateUIBasedOnState dan renderPlayerList akan mengaktifkan tombol vote
                break;
            case 'elimination_result':
                // Logic ini sudah di handle oleh updateUIBasedOnState
                break;
            case 'mr_white_guess':
                // Logic ini sudah di handle oleh updateUIBasedOnState
                break;
            case 'game_over':
                // Logic ini sudah di handle oleh updateUIBasedOnState
                break;
        }
    };

    // --- FUNGSI MODAL & POPUP ---
    const showRoleOnCard = () => {
        if (!localPlayer.role) {
            console.log("Local player role not yet distributed, waiting...");
            return; // Tunggu sampai localPlayer.role terupdate dari DB
        }
        cardRevealTitle.innerHTML = `<i class="fas fa-id-card"></i> Kartu untuk ${localPlayer.name}!`;
        cardRole.textContent = localPlayer.role;
        cardWord.textContent = localPlayer.word || "Anda tidak punya kata. Amati!";
        const missionMap = {
            "Civilian": "Bongkar kedok para penyamar!",
            "Undercover": "Berpura-puralah menjadi Civilian!",
            "Mr. White": "Tebak kata rahasia jika identitasmu terbongkar!"
        };
        cardMission.textContent = missionMap[localPlayer.role] || "";
        roleCard.classList.remove('is-flipped');
        hideCardBtn.classList.remove('hidden'); // Tombol 'Saya Mengerti'
        cardRevealModal.classList.remove('hidden');
    };

    const showEliminationResult = () => {
        if (!eliminatedThisRoundPlayer) return;

        eliminatedInfo.innerHTML = `<i class="fas fa-skull-crossbones"></i> ${eliminatedThisRoundPlayer.name} (Peran: ${eliminatedThisRoundPlayer.role || 'Tidak Diketahui'}) telah tereliminasi.`;
        
        // Atur ulang tombol Truth/Dare
        truthBtn.classList.remove('selected');
        dareBtn.classList.remove('selected');
        truthBtn.disabled = false;
        dareBtn.disabled = false;
        penaltyDisplay.classList.add('hidden');
        penaltyText.textContent = '';
        closeEliminationBtn.classList.add('hidden'); // Sembunyikan tombol Lanjut awalnya

        // Tampilkan/sembunyikan UI Truth/Dare dan pesan tunggu
        const canContinue = !localPlayer.is_eliminated; // Hanya pemain yang tidak tereliminasi yang bisa memilih Truth/Dare/Lanjut
        truthDareSection.style.display = 'flex'; // Selalu tampilkan, tapi disabled jika tidak bisa memilih
        
        if (canContinue) {
            // Player ini belum tereliminasi, bisa memilih hukuman dan melanjutkan
            penaltyWaitMessage.classList.add('hidden');
        } else {
            // Player ini tereliminasi, atau sudah selesai dengan hukumannya, tampilkan pesan menunggu
            truthBtn.disabled = true;
            dareBtn.disabled = true;
            penaltyWaitMessage.classList.remove('hidden');
        }
        
        eliminationModal.classList.remove('hidden');
    };

    const showMrWhiteGuessModal = () => {
        if (!eliminatedThisRoundPlayer) return;

        mrWhiteNameGuess.textContent = eliminatedThisRoundPlayer.name;
        mrWhiteWaitName.textContent = eliminatedThisRoundPlayer.name;

        const isMeMrWhite = localPlayer.id === eliminatedThisRoundPlayer.id;
        mrWhiteGuessInput.classList.toggle('hidden', !isMeMrWhite);
        submitMrWhiteGuessBtn.classList.toggle('hidden', !isMeMrWhite);
        mrWhiteWaitMessage.classList.toggle('hidden', isMeMrWhite);
        mrWhiteGuessInput.value = ''; // Bersihkan input
        submitMrWhiteGuessBtn.disabled = false; // Aktifkan tombol

        mrWhiteGuessModal.classList.remove('hidden');
    };

    const showWinnerScreen = () => {
        // currentRoom.winner_details diisi oleh Edge Function
        winnerMessage.innerHTML = currentRoom.winner_details?.split('\n')[0] || "Permainan Berakhir!";
        winnerDetail.textContent = currentRoom.winner_details?.split('\n').slice(1).join('\n') || "";
        
        roundRolesList.innerHTML = '';
        playersInRoom.forEach(p => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${p.name}</strong> - Peran: ${p.role}`; // Tampilkan peran asli dari DB
            roundRolesList.appendChild(li);
        });

        playAgainBtn.classList.toggle('hidden', !localPlayer.is_host); // Hanya host yang bisa Play Again
        hostWaitMessage.classList.toggle('hidden', localPlayer.is_host); // Tampilkan pesan tunggu jika bukan host
        
        confetti.classList.remove('hidden');
        confetti.src = confetti.src.split("?")[0] + "?" + new Date().getTime(); // Memaksa animasi ulang

        winnerModal.classList.remove('hidden');
    };


    // === FUNGSI AKSI PEMAIN (MENGIRIM EVENT KE SERVER) ===
    const handleStartGameClick = async () => {
        startGameBtn.disabled = true;
        startGameBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Memulai...`;
        const success = await invokeGameFunction('startGame'); // Panggil Edge Function
        if (!success) { // Jika gagal, aktifkan kembali tombol
            startGameBtn.disabled = false;
            startGameBtn.innerHTML = `<i class="fas fa-play"></i> Mulai Permainan (Host)`;
        }
        // UI akan update via realtime, tak perlu enable tombol manual
    };
    
    // Memberi tahu server bahwa pemain sudah melihat kartu
    const handleHideCardAndProceed = async () => {
        roleCard.classList.remove('is-flipped'); // Pastikan kartu tertutup
        cardRevealModal.classList.add('hidden');
        await invokeGameFunction('playerReadyForDiscussion'); // Panggil Edge Function
    };

    const handleVote = async (targetPlayerId) => {
        if (localPlayer.voted_for || localPlayer.is_eliminated) return;
        
        // Menonaktifkan semua tombol vote untuk mencegah double click
        document.querySelectorAll('.vote-button').forEach(btn => btn.disabled = true);
        
        // Panggil Edge Function untuk merekam vote
        const success = await invokeGameFunction('playerVote', { targetId: targetPlayerId });
        
        if (!success) {
            // Jika vote gagal, aktifkan kembali tombol
            document.querySelectorAll('.vote-button').forEach(btn => btn.disabled = false);
        }
    };

    const handleMrWhiteGuessSubmit = async () => {
        const guess = mrWhiteGuessInput.value.trim();
        if (!guess) {
            alert('Tebakan tidak boleh kosong!');
            return;
        }
        submitMrWhiteGuessBtn.disabled = true; // Nonaktifkan tombol untuk mencegah double submit
        const success = await invokeGameFunction('mrWhiteGuess', { guess: guess });
        if (!success) {
            submitMrWhiteGuessBtn.disabled = false; // Aktifkan kembali jika gagal
        }
    };
    
    const handlePenaltyChosen = (type) => {
        const item = (type === 'truth') ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        penaltyText.innerHTML = (type === 'truth') ? `<i class="fas fa-check-circle"></i> <strong>TRUTH:</strong> ${item}` : `<i class="fas fa-fire"></i> <strong>DARE:</strong> ${item}`;
        penaltyDisplay.classList.remove('hidden');
        truthBtn.disabled = true;
        dareBtn.disabled = true;
        closeEliminationBtn.classList.remove('hidden'); // Tampilkan tombol Lanjut
    };
    
    const handleContinueAfterPenalty = async () => {
        closeEliminationBtn.disabled = true; // Nonaktifkan tombol Lanjut untuk mencegah double click
        await invokeGameFunction('continueAfterElimination'); // Panggil Edge Function
    };
    
    const handlePlayAgain = async () => {
        if (!localPlayer.is_host) return; // Hanya host yang bisa memulai game lagi
        playAgainBtn.disabled = true; // Nonaktifkan tombol
        await invokeGameFunction('resetGame'); // Panggil Edge Function
    };
    
    const handleLeaveRoom = async () => {
        if (roomChannel) {
            await supabaseClient.removeChannel(roomChannel);
            roomChannel = null;
        }
        // Hapus pemain dari DB saat meninggalkan room
        // Ini akan memicu update realtime untuk pemain lain
        if (localPlayer.id) {
            await supabaseClient.from('players').delete().eq('id', localPlayer.id);
        }
        sessionStorage.clear(); // Hapus sesi yang disimpan
        window.location.reload(); // Reload halaman untuk kembali ke menu utama
    };
    
    // Fungsi untuk mencoba re-join session yang ada
    const tryRejoinSession = async () => {
        const playerId = sessionStorage.getItem('undercoverPlayerId');
        const roomId = sessionStorage.getItem('undercoverRoomId');
        
        // Pastikan user sudah login sebelum mencoba re-join
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session || !session.user) {
            sessionStorage.clear(); // Hapus jika tidak ada sesi login yang valid
            return;
        }

        if (playerId && roomId && playerId === session.user.id) { // Verifikasi playerId cocok dengan user login
            console.log(`Mencoba join kembali ke room ${roomId} sebagai player ${playerId}`);
            try {
                const { data: roomData, error: roomError } = await supabaseClient.from('rooms').select('*').eq('id', roomId).single();
                if (roomError || !roomData) {
                    sessionStorage.clear(); // Hapus jika room tidak ditemukan
                    console.error("Room for rejoin not found:", roomError);
                    return;
                }
                
                const { data: playerData, error: playerError } = await supabaseClient.from('players').select('*').eq('id', playerId).eq('room_id', roomId).single();
                if (playerError || !playerData) {
                    sessionStorage.clear(); // Hapus jika pemain tidak ditemukan di room tsb
                    console.error("Player for rejoin not found:", playerError);
                    return;
                }

                // Jika berhasil menemukan data, set state dan masuk ke room
                currentRoom = roomData;
                localPlayer = playerData; // Update localPlayer dengan data dari DB
                
                switchView('room');
                roomCodeDisplay.textContent = currentRoom.code;
                await listenToRoomChanges(); // Mulai Realtime subscription
                
            } catch (error) {
                console.error("Error during rejoin attempt:", error);
                sessionStorage.clear(); // Bersihkan jika ada error
                showError("Gagal bergabung kembali ke sesi. Silakan coba lagi.");
            }
        }
    };


    // === EVENT LISTENERS ===
    createRoomBtn.addEventListener('click', handleCreateRoom);
    joinRoomBtn.addEventListener('click', () => handleJoinRoom());
    leaveRoomBtn.addEventListener('click', handleLeaveRoom);
    startGameBtn.addEventListener('click', handleStartGameClick);

    playerListUI.addEventListener('click', (e) => {
        const voteButton = e.target.closest('.vote-button');
        if (voteButton && !voteButton.disabled) {
            handleVote(voteButton.dataset.targetId);
        }
    });

    roleCard.addEventListener('click', () => {
        // Hanya membalik kartu jika belum terbalik
        if (!roleCard.classList.contains('is-flipped')) {
            roleCard.classList.add('is-flipped');
            // Tombol 'Saya Mengerti' akan muncul setelah kartu terbalik
            hideCardBtn.classList.remove('hidden');
        }
    });

    hideCardBtn.addEventListener('click', handleHideCardAndProceed); // Panggil fungsi baru

    submitMrWhiteGuessBtn.addEventListener('click', handleMrWhiteGuessSubmit);
    truthBtn.addEventListener('click', () => handlePenaltyChosen('truth'));
    dareBtn.addEventListener('click', () => handlePenaltyChosen('dare'));
    closeEliminationBtn.addEventListener('click', handleContinueAfterPenalty);
    playAgainBtn.addEventListener('click', handlePlayAgain);
    
    copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(currentRoom.code).then(() => {
            const originalIcon = copyCodeBtn.innerHTML;
            copyCodeBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => { copyCodeBtn.innerHTML = originalIcon; }, 1500);
        }).catch(err => {
            console.error('Failed to copy text:', err);
            showError('Gagal menyalin kode. Browser tidak mendukung.');
        });
    });
    
    // --- Inisialisasi ---
    switchView('lobby');
    tryRejoinSession(); // Coba re-join saat halaman dimuat
});