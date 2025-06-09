// ===================================================================
// ===================== ONLINE.JS (FINAL) ===========================
// ===================================================================

// --- STATE VARIABLES ---
// Variabel untuk menyimpan status sesi online saat ini.
let currentLobbyId = null;
let currentLobbyData = null;
let currentUser = null;
let currentPlayerId = null; // Ini adalah ID dari tabel 'lobby_players', BUKAN user_id
let isHost = false;
let playersInLobby = [];

// Variabel untuk channel Supabase Realtime
let lobbyChannel = null;

// --- UTILITY FUNCTIONS ---
/**
 * Menghasilkan kode acak untuk lobi.
 * @param {number} length Panjang kode yang diinginkan.
 * @returns {string} Kode acak.
 */
function generateRandomCode(length) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Mengganti tampilan antara section yang berbeda.
 * @param {string} viewName Nama section yang akan ditampilkan (cth: 'lobby', 'game', 'mode-selection').
 */
function switchToView(viewName) {
    // Sembunyikan semua section utama terlebih dahulu
    document.getElementById('mode-selection-section').classList.add('hidden');
    document.getElementById('online-options-section').classList.add('hidden');
    document.getElementById('lobby-section').classList.add('hidden');
    document.getElementById('initial-config-section').classList.add('hidden');
    document.getElementById('game-section').classList.add('hidden');
    
    // Tampilkan section yang dipilih
    const targetSection = document.getElementById(`${viewName}-section`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
}

// --- LOBBY MANAGEMENT ---

/**
 * Membuat lobi baru, menambahkan host sebagai pemain, dan mulai mendengarkan perubahan.
 */
async function handleCreateLobby() {
    currentUser = supabaseClient.auth.user();
    if (!currentUser) {
        alert("Anda harus login untuk membuat lobi!");
        document.getElementById('auth-btn').click(); // Buka modal login
        return;
    }

    const lobbyCode = generateRandomCode(6);
    const hostName = currentUser.email.split('@')[0]; // Ambil nama dari email (bisa diganti dengan profil)

    // 1. Masukkan lobi baru ke DB
    const { data: lobbyData, error: lobbyError } = await supabaseClient
        .from('lobbies')
        .insert({
            host_id: currentUser.id,
            lobby_code: lobbyCode,
            status: 'waiting',
            game_config: { civilians: 3, undercovers: 1, mrWhites: 1, total: 5 } // Default config
        })
        .select()
        .single();

    if (lobbyError) {
        console.error("Gagal membuat lobi:", lobbyError);
        alert("Gagal membuat lobi. Coba lagi.");
        return;
    }

    // 2. Tambahkan host sebagai pemain pertama
    const { data: playerData, error: playerError } = await supabaseClient
        .from('lobby_players')
        .insert({ lobby_id: lobbyData.id, user_id: currentUser.id, player_name: hostName })
        .select()
        .single();

    if (playerError) {
        console.error("Gagal menambahkan host:", playerError);
        alert("Terjadi kesalahan saat menambahkan Anda ke lobi.");
        return;
    }

    // Set state global
    currentLobbyId = lobbyData.id;
    currentPlayerId = playerData.id;
    currentLobbyData = lobbyData;
    isHost = true;

    // 3. Pindah ke layar lobi
    switchToView('lobby');
    updateLobbyUI(lobbyData); // Tampilkan info awal
    subscribeToLobbyChanges(lobbyData.id); // Mulai mendengarkan
}

/**
 * Bergabung dengan lobi yang ada menggunakan kode.
 */
async function handleJoinLobby() {
    currentUser = supabaseClient.auth.user();
    if (!currentUser) {
        alert("Anda harus login untuk bergabung dengan lobi!");
        document.getElementById('auth-btn').click();
        return;
    }

    const lobbyCode = document.getElementById('lobby-code-input').value.trim().toUpperCase();
    if (!lobbyCode) {
        alert("Silakan masukkan kode lobi.");
        return;
    }

    // 1. Cari lobi berdasarkan kode
    const { data: lobbyData, error: lobbyError } = await supabaseClient
        .from('lobbies')
        .select('*')
        .eq('lobby_code', lobbyCode)
        .single();

    if (lobbyError || !lobbyData) {
        alert("Lobi tidak ditemukan atau kode salah.");
        return;
    }
    
    if (lobbyData.status !== 'waiting') {
        alert("Game sudah dimulai atau sudah selesai. Tidak bisa bergabung.");
        return;
    }
    
    // 2. Tambahkan pemain baru
    const playerName = currentUser.email.split('@')[0];
    const { data: playerData, error: playerError } = await supabaseClient
        .from('lobby_players')
        .insert({ lobby_id: lobbyData.id, user_id: currentUser.id, player_name: playerName })
        .select()
        .single();

    if (playerError) {
        // Handle error jika user sudah ada di lobi
        if (playerError.code === '23505') { // Kode error untuk unique violation
             alert("Anda sudah berada di dalam lobi ini.");
        } else {
             console.error("Gagal bergabung dengan lobi:", playerError);
             alert("Gagal bergabung dengan lobi. Mungkin lobi sudah penuh.");
             return;
        }
    }

    // Set state global
    currentLobbyId = lobbyData.id;
    currentPlayerId = playerData.id;
    currentLobbyData = lobbyData;
    isHost = false;

    // 3. Pindah ke layar lobi
    switchToView('lobby');
    updateLobbyUI(lobbyData);
    subscribeToLobbyChanges(lobbyData.id);
}

/**
 * Keluar dari lobi, menghapus pemain dari DB dan menghentikan subscription.
 */
async function handleLeaveLobby() {
    if (currentPlayerId) {
        await supabaseClient.from('lobby_players').delete().eq('id', currentPlayerId);
    }
    unsubscribeAll();
    
    // Reset state
    currentLobbyId = null;
    currentPlayerId = null;
    currentLobbyData = null;
    isHost = false;
    playersInLobby = [];

    switchToView('online-options');
}


// --- REALTIME SUBSCRIPTIONS ---

/**
 * Berlangganan semua perubahan penting di dalam lobi.
 * @param {string} lobbyId UUID dari lobi.
 */
function subscribeToLobbyChanges(lobbyId) {
    unsubscribeAll(); // Pastikan tidak ada subscription ganda

    lobbyChannel = supabaseClient
        .channel(`lobby-room:${lobbyId}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'lobby_players', filter: `lobby_id=eq.${lobbyId}` }, 
            (payload) => {
                console.log('Perubahan pemain terdeteksi:', payload);
                fetchAndRenderPlayers(lobbyId); // Ambil semua pemain dan render ulang
            }
        )
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `lobby_id=eq.${lobbyId}` },
            (payload) => {
                appendNewMessageToChatUI(payload.new);
            }
        )
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'lobbies', filter: `id=eq.${lobbyId}` },
            (payload) => {
                console.log('Update Lobi:', payload.new);
                currentLobbyData = payload.new;
                // Cek jika game dimulai
                if (currentLobbyData.status === 'playing') {
                    switchToView('game');
                    // TODO: Tambahkan fungsi untuk memulai UI game online
                    // initializeOnlineGameUI();
                }
            }
        )
        .subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                console.log('Berhasil berlangganan ke lobi!');
                await fetchAndRenderPlayers(lobbyId); // Ambil daftar pemain awal
                await fetchAndRenderChatHistory(lobbyId); // Ambil riwayat chat
                // Kirim pesan sistem bahwa pemain telah bergabung
                sendSystemMessage(`${supabaseClient.auth.user().email.split('@')[0]} telah bergabung.`);
            }
        });
}

/**
 * Menghentikan semua subscription aktif.
 */
function unsubscribeAll() {
    if (lobbyChannel) {
        supabaseClient.removeChannel(lobbyChannel);
        lobbyChannel = null;
        console.log("Subscription dihentikan.");
    }
}


// --- UI UPDATE FUNCTIONS ---

/**
 * Mengupdate tampilan UI lobi berdasarkan data lobi.
 * @param {object} lobbyData Data dari tabel 'lobbies'.
 */
function updateLobbyUI(lobbyData) {
    document.getElementById('lobby-code-display').textContent = lobbyData.lobby_code;
    const startGameBtn = document.getElementById('start-game-online-btn');
    startGameBtn.style.display = isHost ? 'block' : 'none';
}

/**
 * Mengambil daftar pemain terbaru dari DB dan merendernya.
 * @param {string} lobbyId UUID dari lobi.
 */
async function fetchAndRenderPlayers(lobbyId) {
    const { data, error } = await supabaseClient.from('lobby_players').select('*').eq('lobby_id', lobbyId).order('created_at');
    if (error) {
        console.error("Gagal mengambil pemain:", error);
        return;
    }
    playersInLobby = data;

    const playerListEl = document.getElementById('lobby-player-list');
    playerListEl.innerHTML = ''; // Kosongkan daftar
    playersInLobby.forEach((player, index) => {
        const li = document.createElement('li');
        li.classList.add('player-avatar-card');
        // Tambahkan highlight jika pemain adalah host
        if (player.user_id === currentLobbyData.host_id) {
            li.style.borderColor = 'var(--theme-accent)';
        }
        li.innerHTML = `
            <img src="assets/images/avatar${(index % 6) + 1}.png" alt="Avatar" class="player-avatar-img">
            <span class="player-avatar-name">${player.player_name} ${player.user_id === currentLobbyData.host_id ? '(Host)' : ''}</span>
        `;
        playerListEl.appendChild(li);
    });
    
    document.getElementById('player-count').textContent = playersInLobby.length;
}

/**
 * Menambahkan pesan baru ke kotak chat.
 * @param {object} message Data dari tabel 'chat_messages'.
 */
function appendNewMessageToChatUI(message) {
    const chatBox = document.getElementById('lobby-chat-messages');
    const messageEl = document.createElement('div');
    messageEl.classList.add('chat-message');
    const isMyMessage = message.user_id === (currentUser ? currentUser.id : '');

    if (message.is_system_message) {
        messageEl.classList.add('system-message');
        messageEl.innerHTML = `<span>${message.content}</span>`;
    } else {
        messageEl.classList.add(isMyMessage ? 'my-message' : 'other-message');
        messageEl.innerHTML = `<span class="sender">${isMyMessage ? 'Anda' : message.player_name}</span><span>${message.content}</span>`;
    }
    
    chatBox.appendChild(messageEl);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * Mengambil riwayat chat saat pertama kali bergabung.
 * @param {string} lobbyId UUID dari lobi.
 */
async function fetchAndRenderChatHistory(lobbyId) {
     const chatBox = document.getElementById('lobby-chat-messages');
     chatBox.innerHTML = '';
     const { data, error } = await supabaseClient
        .from('chat_messages')
        .select('*')
        .eq('lobby_id', lobbyId)
        .order('created_at', { ascending: true })
        .limit(50); // Batasi 50 pesan terakhir
    
    if (error) { console.error("Gagal mengambil riwayat chat:", error); return; }
    
    data.forEach(message => appendNewMessageToChatUI(message));
}


// --- USER ACTIONS ---

/**
 * Mengirim pesan chat dari input.
 */
async function sendChatMessage() {
    const input = document.getElementById('lobby-chat-input');
    const content = input.value.trim();
    if (!content) return;

    const { data: player } = await supabaseClient.from('lobby_players').select('player_name').eq('id', currentPlayerId).single();

    const { error } = await supabaseClient.from('chat_messages').insert({
        lobby_id: currentLobbyId,
        user_id: currentUser.id,
        player_name: player.player_name,
        content: content,
        is_system_message: false
    });

    if (error) { alert("Gagal mengirim pesan."); } 
    else { input.value = ''; }
}

/**
 * Mengirim pesan sistem (misal: pemain bergabung/keluar).
 * @param {string} content Isi pesan sistem.
 */
async function sendSystemMessage(content) {
     await supabaseClient.from('chat_messages').insert({
        lobby_id: currentLobbyId,
        content: content,
        is_system_message: true
    });
}


// --- ONLINE GAME LOGIC (KERANGKA) ---

/**
 * Aksi yang dilakukan oleh Host untuk memulai permainan.
 * CATATAN PENTING: Untuk keamanan, logika pembagian peran idealnya dilakukan di Edge Function Supabase.
 * Namun untuk simplisitas, kita lakukan di sisi client (host).
 */
async function handleStartGame() {
    if (!isHost) return;

    // TODO: Validasi jumlah pemain sebelum memulai (misal: minimal 3)
    if (playersInLobby.length < 3) {
        alert("Butuh minimal 3 pemain untuk memulai permainan.");
        return;
    }

    // 1. Ambil kata dari paket kata yang dipilih
    // Untuk saat ini, kita gunakan default words dari offline.js
    const wordPair = defaultWordPairs[Math.floor(Math.random() * defaultWordPairs.length)];
    const civilianWord = wordPair.civilian;
    const undercoverWord = wordPair.undercover;

    // 2. Generate dan acak peran (gunakan logika dari offline.js)
    const config = currentLobbyData.game_config;
    let rolesToDistribute = [];
    for (let i = 0; i < config.civilians; i++) rolesToDistribute.push("Civilian");
    for (let i = 0; i < config.undercovers; i++) rolesToDistribute.push("Undercover");
    for (let i = 0; i < config.mrWhites; i++) rolesToDistribute.push("Mr. White");
    // Acak peran
    for (let i = rolesToDistribute.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rolesToDistribute[i], rolesToDistribute[j]] = [rolesToDistribute[j], rolesToDistribute[i]];
    }

    // 3. Update setiap pemain di DB dengan peran mereka
    // PENTING: Ini membutuhkan RLS (Row Level Security) agar pemain hanya bisa melihat perannya sendiri!
    const playerUpdates = playersInLobby.map((player, index) => {
        const assignedRole = rolesToDistribute[index];
        let assignedWord = "";
        if (assignedRole === "Civilian") assignedWord = civilianWord;
        else if (assignedRole === "Undercover") assignedWord = undercoverWord;
        
        return supabaseClient
            .from('lobby_players')
            .update({ role: assignedRole, word: assignedWord, is_eliminated: false })
            .eq('id', player.id);
    });

    await Promise.all(playerUpdates);

    // 4. Update status lobi menjadi 'playing'
    await supabaseClient
        .from('lobbies')
        .update({ status: 'playing', civilian_word: civilianWord, undercover_word: undercoverWord })
        .eq('id', currentLobbyId);
    
    // Subscription akan menangani perpindahan layar untuk semua pemain
}

// TODO: Buat fungsi untuk mengambil peran pribadi saat game dimulai
// TODO: Buat fungsi untuk handle voting online
// TODO: Buat fungsi untuk handle eliminasi dan penentuan pemenang online