// ===================================================================
// ======================= APP.JS (FINAL) ============================
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    // === AUTH & SUPABASE (diambil dari offline.js untuk sentralisasi) ===
    const authBtn = document.getElementById('auth-btn');
    const authModal = document.getElementById('auth-modal');
    const closeAuthModalBtn = document.getElementById('close-auth-modal-btn');
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const showRegisterLink = document.getElementById('show-register-view-link');
    const showLoginLink = document.getElementById('show-login-view-link');

    // Cek status login saat halaman dimuat
    if (supabaseClient.auth.user()) {
        authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        authBtn.title = `Logout (${supabaseClient.auth.user().email})`;
    } else {
        authBtn.innerHTML = '<i class="fas fa-user-circle"></i>';
        authBtn.title = "Login/Daftar";
    }

    // Listener untuk perubahan status otentikasi
    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            authModal.classList.add('hidden');
            authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
            authBtn.title = `Logout (${session.user.email})`;
        } else if (event === 'SIGNED_OUT') {
            authBtn.innerHTML = '<i class="fas fa-user-circle"></i>';
            authBtn.title = "Login/Daftar";
            // Jika sedang dalam sesi online, paksa keluar
            if (currentLobbyId) {
                handleLeaveLobby();
                alert("Anda telah logout dan dikeluarkan dari lobi.");
            }
        }
    });

    // === ELEMENT SELECTORS ===
    const modeSelectionSection = document.getElementById('mode-selection-section');
    const onlineOptionsSection = document.getElementById('online-options-section');
    const offlineConfigSection = document.getElementById('initial-config-section');
    const lobbySection = document.getElementById('lobby-section');
    const howToPlayModal = document.getElementById('how-to-play-modal');

    // === BUTTON SELECTORS ===
    // Mode Selection
    const startOnlineBtn = document.getElementById('start-online-btn');
    const startOfflineBtn = document.getElementById('start-offline-btn');
    const backToModeSelectBtn = document.getElementById('back-to-mode-select-btn');

    // Online
    const createLobbyBtn = document.getElementById('create-lobby-btn');
    const joinLobbyBtn = document.getElementById('join-lobby-btn');
    const lobbyCodeInput = document.getElementById('lobby-code-input');
    
    // Lobby
    const copyCodeBtn = document.getElementById('copy-code-btn');
    const leaveLobbyBtn = document.getElementById('leave-lobby-btn');
    const startGameOnlineBtn = document.getElementById('start-game-online-btn');
    const sendLobbyChatBtn = document.getElementById('send-lobby-chat-btn');
    const lobbyChatInput = document.getElementById('lobby-chat-input');

    // Header & Menu
    const showGuideBtn = document.getElementById('show-guide-btn-menu');
    const closeGuideBtn = howToPlayModal.querySelector('.close-popup-btn');

    // === EVENT LISTENERS ===

    // --- Pemilihan Mode Utama ---
    startOnlineBtn.addEventListener('click', () => {
        switchToView('online-options');
    });

    startOfflineBtn.addEventListener('click', () => {
        switchToView('initial-config');
        // Panggil fungsi untuk memulai logika game offline dari offline.js
        startOfflineGame();
    });

    backToModeSelectBtn.addEventListener('click', () => {
        switchToView('mode-selection');
    });

    // --- Aksi Online ---
    createLobbyBtn.addEventListener('click', () => {
        // Panggil fungsi dari online.js
        handleCreateLobby();
    });

    joinLobbyBtn.addEventListener('click', () => {
        // Panggil fungsi dari online.js
        handleJoinLobby();
    });
    
    lobbyCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleJoinLobby();
        }
    });

    // --- Aksi di Dalam Lobi ---
    leaveLobbyBtn.addEventListener('click', () => {
        if (confirm("Apakah Anda yakin ingin keluar dari lobi?")) {
            handleLeaveLobby();
        }
    });

    startGameOnlineBtn.addEventListener('click', () => {
        handleStartGame();
    });

    sendLobbyChatBtn.addEventListener('click', sendChatMessage);
    lobbyChatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    copyCodeBtn.addEventListener('click', () => {
        const lobbyCode = document.getElementById('lobby-code-display').textContent;
        navigator.clipboard.writeText(lobbyCode).then(() => {
            copyCodeBtn.innerHTML = '<i class="fas fa-check"></i> Tersalin';
            setTimeout(() => {
                copyCodeBtn.innerHTML = '<i class="fas fa-copy"></i> Salin';
            }, 2000);
        });
    });

    // --- Tombol Header dan Menu (Sentralisasi) ---
    showGuideBtn.addEventListener('click', (e) => {
        e.preventDefault();
        howToPlayModal.classList.remove('hidden');
        document.getElementById('dropdown-menu').classList.remove('show');
    });

    closeGuideBtn.addEventListener('click', () => {
        howToPlayModal.classList.add('hidden');
    });
    
    authBtn.addEventListener('click', () => {
        if (supabaseClient.auth.user()) {
            // Jika sudah login, tombol ini berfungsi sebagai logout
            if (confirm("Apakah Anda yakin ingin logout?")) {
                supabaseClient.auth.signOut();
            }
        } else {
            // Jika belum login, buka modal
            authModal.classList.remove('hidden');
            loginView.classList.remove('hidden');
            registerView.classList.add('hidden');
        }
    });
    
    closeAuthModalBtn.addEventListener('click', () => {
        authModal.classList.add('hidden');
    });
    
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginView.classList.add('hidden');
        registerView.classList.remove('hidden');
    });
    
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerView.classList.add('hidden');
        loginView.classList.remove('hidden');
    });

});