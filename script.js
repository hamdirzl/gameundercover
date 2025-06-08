document.addEventListener('DOMContentLoaded', () => {
    // --- SECTIONS ---
    const initialConfigSection = document.getElementById('initial-config-section');
    const playerNameInputSection = document.getElementById('player-name-input-section');
    const gameSection = document.getElementById('game-section');
    const mrWhiteGuessSection = document.getElementById('mr-white-guess-section');
    const eliminationResultPopup = document.getElementById('elimination-result-popup');
    const truthOrDareSection = document.getElementById('truth-or-dare-section');
    const penaltyDisplayDiv = document.getElementById('penalty-display');
    const winnerPopupModal = document.getElementById('winner-popup-modal');
    const roundOverSection = document.getElementById('round-over-section');
    const finalScoreDisplayModal = document.getElementById('final-score-display-section');
    const cardRevealModal = document.getElementById('card-reveal-modal');
    const confettiAnimation = document.getElementById('confetti-animation');
    const musicSettingsModal = document.getElementById('music-settings-modal');
    const peekPlayerSelectModal = document.getElementById('peek-player-select-modal');
    const massPenaltyModal = document.getElementById('mass-penalty-modal');
    const howToPlayModal = document.getElementById('how-to-play-modal');
    const wordPackManagerModal = document.getElementById('word-pack-manager-modal');
    const authModal = document.getElementById('auth-modal');

    // --- BUTTONS ---
    const proceedToCardDistributionBtn = document.getElementById('proceed-to-card-distribution-btn');
    const submitNameAndDrawCardBtn = document.getElementById('submit-name-and-draw-card-btn');
    const hideCardAndProceedBtn = document.getElementById('hide-card-and-proceed-btn');
    const roleCardElement = document.getElementById('role-card');
    const confirmEliminationBtn = document.getElementById('confirm-elimination-btn');
    const submitMrWhiteGuessBtn = document.getElementById('submit-mr-white-guess-btn');
    const truthBtn = document.getElementById('truth-btn');
    const dareBtn = document.getElementById('dare-btn');
    const closeEliminationPopupBtn = document.getElementById('close-elimination-popup-btn');
    const closePopupBtn = document.querySelector('#winner-popup-modal .close-popup-btn');
    const proceedToRoundScoresBtn = document.getElementById('proceed-to-round-scores-btn');
    const playNewRoundBtn = document.getElementById('play-new-round-btn');
    const finishGameShowFinalScoresBtn = document.getElementById('finish-game-show-final-scores-btn');
    const restartGameFullBtn = document.getElementById('restart-game-full-btn');
    const closeFinalScoreBtn = document.querySelector('#final-score-display-section .close-final-score-btn');
    const restartFromFinalBtn = document.getElementById('restart-from-final-btn');
    const confirmMusicBtn = document.getElementById('confirm-music-btn');
    const closeMusicSettingsBtn = musicSettingsModal.querySelector('.close-popup-btn');
    const peekCardBtn = document.getElementById('peek-card-btn');
    const peekPlayerSelect = document.getElementById('peek-player-select');
    const confirmPeekBtn = document.getElementById('confirm-peek-btn');
    const closePeekViewBtn = document.getElementById('close-peek-view-btn');
    const closePeekSelectModalBtn = peekPlayerSelectModal.querySelector('.close-popup-btn');
    const massTruthBtn = document.getElementById('mass-truth-btn');
    const massDareBtn = document.getElementById('mass-dare-btn');
    const massPenaltyNextBtn = document.getElementById('mass-penalty-next-btn');
    const shareResultsBtn = document.getElementById('share-results-btn');
    
    // --- TOMBOL MENU BARU ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const showGuideBtn = document.getElementById('show-guide-btn-menu');
    const toggleMusicBtn = document.getElementById('toggle-music-btn-menu');
    const openMusicSettingsBtn = document.getElementById('open-music-settings-btn-menu');
    // --- ----------------- ---
    const closeGuideBtn = howToPlayModal.querySelector('.close-popup-btn');

    // --- WORD PACK MANAGER BUTTONS & INPUTS ---
    const manageWordPacksBtn = document.getElementById('manage-word-packs-btn');
    const closeWordPackManagerBtn = wordPackManagerModal.querySelector('.close-popup-btn');
    const closeWordPackManagerDoneBtn = document.getElementById('close-word-pack-manager-done-btn');
    const createNewPackBtn = document.getElementById('create-new-pack-btn');
    const newPackNameInput = document.getElementById('new-pack-name-input');
    const editPackSelection = document.getElementById('edit-pack-selection');
    const newCivilianWordInput = document.getElementById('new-civilian-word-input');
    const newUndercoverWordInput = document.getElementById('new-undercover-word-input');
    const addWordPairBtn = document.getElementById('add-word-pair-btn');
    const deletePackBtn = document.getElementById('delete-pack-btn');
    const wordListDisplay = document.getElementById('word-list-display');
    const currentPackDisplayName = document.getElementById('current-pack-display-name');
    
    // --- AUTH ELEMENTS ---
    const authBtn = document.getElementById('auth-btn');
    const closeAuthModalBtn = document.getElementById('close-auth-modal-btn');
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const showRegisterLink = document.getElementById('show-register-view-link');
    const showLoginLink = document.getElementById('show-login-view-link');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const registerEmailInput = document.getElementById('register-email');
    const registerPasswordInput = document.getElementById('register-password');
    const loginErrorP = document.getElementById('login-error');
    const registerErrorP = document.getElementById('register-error');
    const wordPackOwnerSpan = document.getElementById('word-pack-owner');

    // --- ELEMEN BARU UNTUK MODE ONLINE ---
    const createOnlineRoomBtn = document.getElementById('create-online-room-btn');
    const joinOnlineRoomBtn = document.getElementById('join-online-room-btn');
    const lobbySection = document.getElementById('lobby-section');
    const lobbyRoomCode = document.getElementById('lobby-room-code');
    const lobbyPlayerList = document.getElementById('lobby-player-list');
    const playerCountSpan = document.getElementById('player-count');
    const maxPlayerCountSpan = document.getElementById('max-player-count');
    const startOnlineGameBtn = document.getElementById('start-online-game-btn');
    const waitingForHostMsg = document.getElementById('waiting-for-host-msg');
    const joinRoomModal = document.getElementById('join-room-modal');
    const closeJoinModalBtn = document.getElementById('close-join-modal-btn');
    const joinRoomCodeInput = document.getElementById('join-room-code-input');
    const confirmJoinRoomBtn = document.getElementById('confirm-join-room-btn');
    const chatBox = document.getElementById('chat-box');
    const chatMessagesContainer = document.getElementById('chat-messages-container');
    const chatMessageInput = document.getElementById('chat-message-input');
    const sendChatMessageBtn = document.getElementById('send-chat-message-btn');
    const chatBoxPlaceholder = document.getElementById('chat-box-placeholder');


    // --- LOGIKA MENU HAMBURGER (BARU) ---
    hamburgerBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        playClickSound();
        dropdownMenu.classList.toggle('show');
    });

    window.addEventListener('click', (event) => {
        if (!hamburgerBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        }
    });
    // --- AKHIR LOGIKA MENU HAMBURGER ---

    // --- DISPLAYS & INPUTS ---
    const totalPlayersConfigInput = document.getElementById('total-players-config');
    const civiliansConfigInput = document.getElementById('civilians-config');
    const undercoversConfigInput = document.getElementById('undercovers-config');
    const mrWhitesConfigInput = document.getElementById('mrwhites-config');
    const musicSelection = document.getElementById('music-selection');
    const wordPackSelection = document.getElementById('word-pack-selection');
    const configErrorP = document.getElementById('config-error');
    const playerNameInputTitleH2 = document.getElementById('player-name-input-title');
    const currentPlayerNameInput = document.getElementById('current-player-name-input');
    const cardRevealPopupTitleH3 = document.getElementById('card-reveal-popup-title');
    const cardPlayerRoleP = document.getElementById('card-player-role');
    const cardPlayerWordP = document.getElementById('card-player-word');
    const cardPlayerMissionP = document.getElementById('card-player-mission');
    const activePlayerListUl = document.getElementById('active-player-list');
    const civilianWordDisplay = document.getElementById('civilian-word-display');
    const debugCivilianWordP = document.getElementById('debug-civilian-word');
    const playerToEliminateDisplay = document.getElementById('player-to-eliminate-display');
    const mrWhiteNameGuessStrong = document.getElementById('mr-white-name-guess');
    const mrWhiteWordGuessInput = document.getElementById('mr-white-word-guess-input');
    const eliminatedPlayerInfoH3 = document.getElementById('eliminated-player-info');
    const penaltyTextP = document.getElementById('penalty-text');
    const roundRolesListUl = document.getElementById('round-roles-list');
    const popupWinnerMessageH2 = document.getElementById('popup-winner-message');
    const popupWinnerDetailP = document.getElementById('popup-winner-detail');
    const finalCumulativeScoresTbody = document.getElementById('final-cumulative-scores-list');
    const massPenaltyPlayerName = document.getElementById('mass-penalty-player-name');
    const massPenaltyDisplay = document.getElementById('mass-penalty-display');
    const massPenaltyText = document.getElementById('mass-penalty-text');


    // --- WEB AUDIO API SETUP ---
    let audioContext;
    let soundBuffers = {};
    let audioSetupPromise = null;

    const backgroundMusic = document.getElementById('background-music');
    const backgroundMusicTracks = [ 'assets/music/bg_music.mp3', 'assets/music/bg_music2.mp3', 'assets/music/bg_music3.mp3' ];
    let musicTrackIndex = 0;
    let isMusicPlaying = false;
    let musicManuallyPaused = true;
    
    // --- GAME STATE ---
    let players = [];
    let configuredTotalPlayers = 0;
    let initialCiviliansCount = 0; let initialUndercoversCount = 0; let initialMrWhitesCount = 0;
    let rolesToDistribute = [];
    let currentPlayerIndex = 0;
    let civilianWord = ""; let undercoverWord = "";
    let gameInProgress = true;
    let eliminatedThisRoundPlayer = null;
    let currentWinningTeamType = null;
    let currentWinnerPlayerObjects = [];
    let isInitialSetupPhase = true;
    let playerSelectedForElimination = null;
    let playersAwaitingPenalty = [];
    let customWordPacks = {};
    let currentWordList = [];
    let currentUser = null; 
    let currentRoom = null; 
    let gameRoomChannel = null;


    const POINTS_MW_GUESS_WIN = 7; const POINTS_UC_WIN = 5; const POINTS_MW_SURVIVAL_WIN = 5;
    const POINTS_CIVILIAN_TEAM_WIN_SURVIVED = 3; const POINTS_CIVILIAN_TEAM_WIN_ELIMINATED = 1;
    const POINTS_LOSER = 0;

    const defaultWordPairs = [
        { civilian: "Apel", undercover: "Pir" }, { civilian: "Pantai", undercover: "Gurun" }, { civilian: "Kucing", undercover: "Anjing" },
        { civilian: "Buku", undercover: "Majalah" }, { civilian: "Mobil", undercover: "Motor" }, { civilian: "Rumah", undercover: "Apartemen" },
        { civilian: "Sepak Bola", undercover: "Basket" }, { civilian: "Dokter", undercover: "Perawat" }, { civilian: "Nasi", undercover: "Roti" },
        { civilian: "Hujan", undercover: "Salju" }, { civilian: "Sungai", undercover: "Danau" }, { civilian: "Gitar", undercover: "Piano" },
        { civilian: "Kopi", undercover: "Teh" }, { civilian: "Sendok", undercover: "Garpu" }, { civilian: "Gunung", undercover: "Bukit" },
        { civilian: "Laptop", undercover: "Komputer" }, { civilian: "Sepatu", undercover: "Sandal" }, { civilian: "Matahari", undercover: "Bulan" },
        { civilian: "Pintu", undercover: "Jendela" }, { civilian: "Meja", undercover: "Kursi" }, { civilian: "Guru", undercover: "Dosen" }
    ];
    const truths = [ "Apa hal paling memalukan minggu ini?", "Hewan apa kamu & kenapa?", "Siapa paling bikin ketawa disini?", "Kebiasaan burukmu?", "Film/serial favorit sepanjang masa?", "Nemu dompet isi uang, kamu apain?", "Hal konyol dipercaya waktu kecil?", "Tokoh fiksi inspiratif?", "Makanan aneh pernah dicoba?", "Satu permintaan, minta apa?", "Lagu guilty pleasure?", "Bakat terpendammu?", "Liburan paling berkesan?", "Guru/dosen paling berpengaruh?", "Mimpi teraneh?" ];
    const dares = [ "Tiru suara kartun 15d.", "Tarian robot 30d.", "Sebut 5 benda merah 10d.", "Jadi reporter kejadian aneh.", "Nyanyi reff 'Balonku' gaya opera.", "Cerita lelucon.", "Jalan mundur keliling meja.", "Mata tertutup tebak 3 benda.", "Puji 3 orang disini.", "10 push-up/squat/jumping jack.", "Bicara aksen daerah lain 1m.", "Buat wajah paling lucu.", "Peluk (izin) pemain kananmu.", "Telepon teman nyanyi HBD.", "Pakai kaus kaki jadi sarung tangan." ];

    // ===========================================
    // =========== SUPABASE AUTH LOGIC ===========
    // ===========================================
    const showAuthError = (type, message) => {
        const errorElement = type === 'login' ? loginErrorP : registerErrorP;
        let friendlyMessage = message;
        if (message.includes("Invalid login credentials")) {
            friendlyMessage = "Email atau password yang Anda masukkan salah.";
        } else if (message.includes("User already registered")) {
            friendlyMessage = "Email ini sudah terdaftar. Silakan login.";
        } else if (message.includes("Password should be at least 6 characters")) {
            friendlyMessage = "Password terlalu lemah. Gunakan minimal 6 karakter.";
        } else if (message.includes("Unable to validate email address")) {
            friendlyMessage = "Format email tidak valid.";
        }
        errorElement.textContent = friendlyMessage;
        errorElement.classList.remove('hidden');
    };

    const clearAuthErrors = () => {
        loginErrorP.classList.add('hidden');
        registerErrorP.classList.add('hidden');
    };

    const handleRegister = async () => {
        const email = registerEmailInput.value;
        const password = registerPasswordInput.value;
        clearAuthErrors();
        
        const { error } = await supabaseClient.auth.signUp({ email, password });
        
        if (error) {
            showAuthError('register', error.message);
        } else {
            registerView.innerHTML = `<p style="text-align:center; color: var(--theme-text-primary);">Pendaftaran berhasil! Anda bisa langsung login sekarang.</p>`;
        }
    };

    const handleLogin = async () => {
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;
        clearAuthErrors();
        
        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

        if (error) {
            showAuthError('login', error.message);
        } else {
            authModal.classList.add('hidden');
        }
    };
    
    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error("Logout error:", error);
        }
    };

    const openAuthModal = () => {
        authModal.classList.remove('hidden');
        clearAuthErrors();
    };

    // BLOK AUTENTIKASI DENGAN ADD/REMOVE EVENT LISTENER
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
        const user = session?.user;

        // Hapus semua listener klik lama dari tombol auth untuk mencegah duplikasi
        authBtn.removeEventListener('click', handleLogout);
        authBtn.removeEventListener('click', openAuthModal);
    
        if (user) {
            currentUser = user; // variabel global tetap di-set untuk kemudahan akses di tempat lain jika perlu
            authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
            authBtn.title = `Logout (${user.email})`;
            wordPackOwnerSpan.classList.remove('hidden');
            authModal.classList.add('hidden');
            // Pasang listener baru untuk logout
            authBtn.addEventListener('click', handleLogout);
        } else {
            currentUser = null;
            customWordPacks = {}; 
            authBtn.innerHTML = '<i class="fas fa-user-circle"></i>';
            authBtn.title = "Login/Daftar";
            wordPackOwnerSpan.classList.add('hidden');
            // Pasang listener baru untuk membuka modal
            authBtn.addEventListener('click', openAuthModal);
        }
        await loadWordPacks();
    });


    // Setup event listeners for Auth Modal
    closeAuthModalBtn.addEventListener('click', () => authModal.classList.add('hidden'));
    loginBtn.addEventListener('click', handleLogin);
    registerBtn.addEventListener('click', handleRegister);
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginView.classList.add('hidden');
        registerView.classList.remove('hidden');
        clearAuthErrors();
    });
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerView.classList.add('hidden');
        loginView.classList.remove('hidden');
        clearAuthErrors();
    });
    // --- END OF AUTH LOGIC ---

    // --- AUDIO FUNCTIONS ---
    async function loadSound(name, url) { try { const response = await fetch(url); const arrayBuffer = await response.arrayBuffer(); const audioBuffer = await audioContext.decodeAudioData(arrayBuffer); soundBuffers[name] = audioBuffer; } catch (e) { console.error(`Gagal memuat suara: ${name}`, e); } }
    function setupAudioEngine() { if (audioSetupPromise) return audioSetupPromise; audioContext = new (window.AudioContext || window.webkitAudioContext)(); const soundPromises = [ loadSound('click', 'assets/sounds/click.mp3'), loadSound('win', 'assets/sounds/win.mp3'), loadSound('lose', 'assets/sounds/lose.mp3') ]; if (backgroundMusic) { const initialTrackIndex = parseInt(musicSelection.value); if (initialTrackIndex >= 0) backgroundMusic.src = backgroundMusicTracks[initialTrackIndex]; else backgroundMusic.src = backgroundMusicTracks[0]; backgroundMusic.volume = 0.15; backgroundMusic.addEventListener('ended', playNextMusicTrack); backgroundMusic.load(); } audioSetupPromise = Promise.all(soundPromises); return audioSetupPromise; }
    function playSound(name) { if (!audioContext || audioContext.state !== 'running' || !soundBuffers[name]) { return; } const source = audioContext.createBufferSource(); source.buffer = soundBuffers[name]; source.connect(audioContext.destination); source.start(0); }
    function playClickSound() { playSound('click'); }
    function playWinSound() { playSound('win'); }
    function playLoseSound() { playSound('lose'); }
    function resumeAudioContext() { if (!audioContext) { setupAudioEngine().then(() => { if (audioContext.state === 'suspended') { audioContext.resume(); } }); } else if (audioContext.state === 'suspended') { audioContext.resume(); } }
    document.body.addEventListener('click', resumeAudioContext, { once: true }); document.body.addEventListener('touchstart', resumeAudioContext, { once: true });
    function playMusic(src) { const icon = toggleMusicBtn.querySelector('i'); backgroundMusic.src = src; const playWhenReady = () => { if (audioContext && audioContext.state !== 'running') return; const playPromise = backgroundMusic.play(); if (playPromise !== undefined) { playPromise.then(() => { isMusicPlaying = true; musicManuallyPaused = false; if(icon) icon.className = 'fas fa-volume-mute'; }).catch(error => { isMusicPlaying = false; musicManuallyPaused = true; if(icon) icon.className = 'fas fa-music'; console.error("Gagal memutar musik:", error); }); } backgroundMusic.removeEventListener('canplaythrough', playWhenReady); }; backgroundMusic.addEventListener('canplaythrough', playWhenReady, { once: true }); }
    function playNextMusicTrack() { if (musicManuallyPaused || parseInt(musicSelection.value) !== -1) return; musicTrackIndex = (musicTrackIndex + 1) % backgroundMusicTracks.length; playMusic(backgroundMusicTracks[musicTrackIndex]); }
    function handleConfirmMusicClick() { const selectedValue = parseInt(musicSelection.value); if (selectedValue === -1) { backgroundMusic.loop = false; playNextMusicTrack(); } else { backgroundMusic.loop = true; musicTrackIndex = selectedValue; playMusic(backgroundMusicTracks[musicTrackIndex]); } }
    if (toggleMusicBtn && backgroundMusic) { toggleMusicBtn.addEventListener('click', (e) => { e.preventDefault(); dropdownMenu.classList.remove('show'); playClickSound(); resumeAudioContext(); const icon = toggleMusicBtn.querySelector('i'); if (!isMusicPlaying) { musicManuallyPaused = false; backgroundMusic.play().then(() => { isMusicPlaying = true; if(icon) icon.className = 'fas fa-volume-mute'; }).catch(() => { isMusicPlaying = false; musicManuallyPaused = true; if(icon) icon.className = 'fas fa-exclamation-triangle'; }); } else { backgroundMusic.pause(); isMusicPlaying = false; musicManuallyPaused = true; if(icon) icon.className = 'fas fa-music'; } }); }

    // --- EVENT LISTENERS ---
    showGuideBtn.addEventListener('click', (e) => {
        e.preventDefault();
        playClickSound();
        howToPlayModal.classList.remove('hidden');
        dropdownMenu.classList.remove('show');
    });
    closeGuideBtn.addEventListener('click', () => {
        playClickSound();
        howToPlayModal.classList.add('hidden');
    });
    openMusicSettingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        playClickSound();
        musicSettingsModal.classList.remove('hidden');
        dropdownMenu.classList.remove('show');
    });
    closeMusicSettingsBtn.addEventListener('click', () => {
        playClickSound();
        musicSettingsModal.classList.add('hidden');
    });
    confirmMusicBtn.addEventListener('click', () => {
        playClickSound();
        handleConfirmMusicClick();
        musicSettingsModal.classList.add('hidden');
    });

    // LISTENER LAMA - DINONAKTIFKAN
    // proceedToCardDistributionBtn.addEventListener('click', () => { playClickSound(); validateConfigAndProceed(); });

    // EVENT LISTENER BARU
    createOnlineRoomBtn.addEventListener('click', () => {
        playClickSound();
        createOnlineRoom();
    });

    joinOnlineRoomBtn.addEventListener('click', () => {
        playClickSound();
        joinRoomModal.classList.remove('hidden');
    });

    closeJoinModalBtn.addEventListener('click', () => {
        playClickSound();
        joinRoomModal.classList.add('hidden');
    });

    confirmJoinRoomBtn.addEventListener('click', () => {
        playClickSound();
        joinOnlineRoom();
    });
    
    startOnlineGameBtn.addEventListener('click', () => {
        playClickSound();
        handleStartGame();
    });


    submitNameAndDrawCardBtn.addEventListener('click', () => { playClickSound(); handleSubmitNameAndDrawCard(); });
    roleCardElement.addEventListener('click', () => { playClickSound(); handleCardFlip(); });
    hideCardAndProceedBtn.addEventListener('click', () => { playClickSound(); handleProceedAfterCardView(); });
    activePlayerListUl.addEventListener('click', (event) => { playClickSound(); handleAvatarVoteSelection(event); });
    confirmEliminationBtn.addEventListener('click', () => { playClickSound(); handleConfirmElimination(); });
    submitMrWhiteGuessBtn.addEventListener('click', () => { playClickSound(); handleMrWhiteGuess(); });
    truthBtn.addEventListener('click', () => { playClickSound(); applyPenalty('truth'); });
    dareBtn.addEventListener('click', () => { playClickSound(); applyPenalty('dare'); });
    closeEliminationPopupBtn.addEventListener('click', () => { playClickSound(); handleCloseEliminationPopup(); });
    if(closePopupBtn) closePopupBtn.addEventListener('click', () => { playClickSound(); closeWinnerPopupAndShowRoundScores(); });
    proceedToRoundScoresBtn.addEventListener('click', () => { playClickSound(); closeWinnerPopupAndShowRoundScores(); });
    playNewRoundBtn.addEventListener('click', () => { playClickSound(); startNewRoundWithSameTeam(); });
    finishGameShowFinalScoresBtn.addEventListener('click', () => { playClickSound(); showFinalScoreboard(); });
    restartGameFullBtn.addEventListener('click', () => { playClickSound(); resetGameFull(); });
    if(closeFinalScoreBtn) closeFinalScoreBtn.addEventListener('click', () => { playClickSound(); finalScoreDisplayModal.classList.add('hidden'); if(confettiAnimation) confettiAnimation.classList.add('hidden'); });
    restartFromFinalBtn.addEventListener('click', () => { playClickSound(); resetGameFull(); });
    peekCardBtn.addEventListener('click', () => { playClickSound(); openPeekSelectionModal(); });
    if(closePeekSelectModalBtn) closePeekSelectModalBtn.addEventListener('click', () => { playClickSound(); peekPlayerSelectModal.classList.add('hidden'); });
    confirmPeekBtn.addEventListener('click', () => { playClickSound(); handleConfirmPeek(); });
    closePeekViewBtn.addEventListener('click', () => { playClickSound(); cardRevealModal.classList.add('hidden'); });
    massTruthBtn.addEventListener('click', () => { playClickSound(); applyMassPenalty('truth'); });
    massDareBtn.addEventListener('click', () => { playClickSound(); applyMassPenalty('dare'); });
    massPenaltyNextBtn.addEventListener('click', () => { playClickSound(); processNextPenalty(); });
    shareResultsBtn.addEventListener('click', (e) => { playClickSound(); handleShareResults(e.target); });
    
    // --- Word Pack Manager Event Listeners ---
    manageWordPacksBtn.addEventListener('click', () => { playClickSound(); wordPackManagerModal.classList.remove('hidden'); });
    const closeManager = () => { playClickSound(); wordPackManagerModal.classList.add('hidden'); };
    closeWordPackManagerBtn.addEventListener('click', closeManager);
    closeWordPackManagerDoneBtn.addEventListener('click', closeManager);
    createNewPackBtn.addEventListener('click', () => { playClickSound(); handleCreateNewPack(); });
    addWordPairBtn.addEventListener('click', () => { playClickSound(); handleAddWordPair(); });
    deletePackBtn.addEventListener('click', () => { playClickSound(); handleDeletePack(); });
    editPackSelection.addEventListener('change', () => { displayWordsForSelectedPack(); });


    // --- Stepper Buttons ---
    const configSectionForSteppers = document.getElementById('initial-config-section');
    configSectionForSteppers.addEventListener('click', (event) => {
        const target = event.target.closest('.stepper-btn');
        if (!target) return;
        playClickSound();
        const targetInputId = target.dataset.target;
        const operation = target.dataset.op;
        const inputElement = document.getElementById(targetInputId);
        if (!inputElement) return;
        let currentValue = parseInt(inputElement.value, 10);
        const min = parseInt(inputElement.min, 10);
        const max = parseInt(inputElement.max, 10);
        if (operation === 'plus') { if (isNaN(max) || currentValue < max) { inputElement.value = currentValue + 1; } } 
        else if (operation === 'minus') { if (isNaN(min) || currentValue > min) { inputElement.value = currentValue - 1; } }
    });

    function switchScreen(screenToHide, screenToShow) {
        if (screenToHide) { screenToHide.classList.add('hidden'); }
        if (screenToShow) { screenToShow.classList.remove('hidden'); }
    }

    // --- WORD PACK MANAGEMENT (MODIFIED FOR SUPABASE) ---
    async function loadWordPacks() {
        // ... (fungsi ini tetap sama)
    }

    async function saveWordPacks() {
        // ... (fungsi ini tetap sama)
    }
    
    function updateWordPackDropdowns() {
        // ... (fungsi ini tetap sama)
    }
    
    // ... (Semua fungsi word pack management lainnya tetap sama) ...


    // --- CORE GAME LOGIC (LAMA, SEBAGIAN BESAR TIDAK DIGUNAKAN DI ONLINE) ---
    // ... (Sebagian besar fungsi lama seperti validateConfigAndProceed, handleSubmitNameAndDrawCard, dll.
    // akan kita biarkan dulu, tapi tidak akan terpanggil di alur online)


    // =========================================================
    // =========== FUNGSI-FUNGSI BARU UNTUK MODE ONLINE ========
    // =========================================================

    function generateRoomCode() {
        return Math.random().toString(36).substring(2, 6).toUpperCase();
    }

    function updateLobbyUI(roomData) {
        lobbyRoomCode.textContent = roomData.room_code;
        playerCountSpan.textContent = roomData.players.length;
        maxPlayerCountSpan.textContent = roomData.config.total;

        lobbyPlayerList.innerHTML = '';
        roomData.players.forEach(player => {
            const li = document.createElement('li');
            li.classList.add('player-avatar-card');
            
            const img = document.createElement('img');
            img.src = player.avatar || 'assets/images/avatar1.png'; 
            img.alt = `Avatar ${player.name}`;
            img.classList.add('player-avatar-img');

            const nameSpan = document.createElement('span');
            nameSpan.textContent = player.name;
            if (player.isHost) {
                nameSpan.textContent += ' (Host)';
                nameSpan.style.color = 'var(--theme-primary)';
            }
            nameSpan.classList.add('player-avatar-name');

            li.appendChild(img);
            li.appendChild(nameSpan);
            lobbyPlayerList.appendChild(li);
        });
    }
    
    function subscribeToRoomChanges(roomId) {
        if (gameRoomChannel) {
            gameRoomChannel.unsubscribe();
        }

        gameRoomChannel = supabaseClient
            .channel(`room_${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'game_rooms',
                    filter: `id=eq.${roomId}`
                },
                (payload) => {
                    console.log('Perubahan terdeteksi!', payload.new.game_state);
                    const updatedRoom = payload.new;
                    currentRoom = updatedRoom;

                    if (updatedRoom.game_state === 'LOBBY') {
                        updateLobbyUI(updatedRoom);
                        
                        const isHost = updatedRoom.host_id === currentUser?.id;
                        const isFull = updatedRoom.players.length === updatedRoom.config.total;

                        if (isHost) {
                            waitingForHostMsg.classList.add('hidden');
                            startOnlineGameBtn.classList.remove('hidden');
                            if (!isFull) {
                                startOnlineGameBtn.disabled = true;
                                startOnlineGameBtn.textContent = `Tunggu ${updatedRoom.config.total - updatedRoom.players.length} pemain lagi...`;
                            } else {
                                startOnlineGameBtn.disabled = false;
                                startOnlineGameBtn.textContent = 'Mulai Permainan';
                            }
                        } else {
                            waitingForHostMsg.classList.remove('hidden');
                            startOnlineGameBtn.classList.add('hidden');
                        }

                    } else if (updatedRoom.game_state === 'PLAYING') {
                        console.log("State 'PLAYING' terdeteksi, memulai setup kartu...");
                        const myPlayerData = updatedRoom.players.find(p => p.userId === currentUser.id);
                        if (!myPlayerData) {
                            console.error("Data saya tidak ditemukan di dalam room!");
                            return;
                        }

                        showRoleOnCard(myPlayerData.name, myPlayerData.role, myPlayerData.word);
                        lobbySection.classList.add('hidden');
                    }
                }
            )
            .subscribe();
        
        console.log(`Berhasil berlangganan ke channel: room_${roomId}`);
    }

    async function joinOnlineRoom() {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) {
            alert("Anda harus login untuk bergabung!");
            openAuthModal();
            return;
        }

        const roomCode = joinRoomCodeInput.value.trim().toUpperCase();
        if (roomCode.length !== 4) {
            alert("Kode ruangan harus 4 digit.");
            return;
        }
        
        const playerName = prompt("Masukkan nama Anda untuk permainan ini:", user.email.split('@')[0]);
        if (!playerName || playerName.trim() === '') {
            alert("Nama pemain tidak boleh kosong.");
            return;
        }

        const { data: roomData, error: fetchError } = await supabaseClient
            .from('game_rooms')
            .select('*')
            .eq('room_code', roomCode)
            .single();

        if (fetchError || !roomData) {
            alert("Ruangan tidak ditemukan atau kode salah.");
            return;
        }

        if (roomData.game_state !== 'LOBBY') {
            alert("Gagal bergabung, permainan di ruangan ini sudah dimulai.");
            return;
        }
        if (roomData.players.length >= roomData.config.total) {
            alert("Gagal bergabung, ruangan sudah penuh.");
            return;
        }
        if (roomData.players.some(p => p.userId === user.id)) {
            alert("Anda sudah berada di dalam ruangan ini!");
            currentRoom = roomData;
        } else {
            const newPlayer = {
                userId: user.id,
                name: playerName.trim(),
                isHost: false,
                avatar: `assets/images/avatar${roomData.players.length + 1}.png`
            };
            const updatedPlayers = [...roomData.players, newPlayer];

            const { data: updatedRoom, error: updateError } = await supabaseClient
                .from('game_rooms')
                .update({ players: updatedPlayers })
                .eq('id', roomData.id)
                .select()
                .single();

            if (updateError) {
                alert(`Terjadi kesalahan saat bergabung: ${updateError.message}`);
                return;
            }
            currentRoom = updatedRoom;
        }
        
        switchScreen(initialConfigSection, lobbySection);
        joinRoomModal.classList.add('hidden');
        updateLobbyUI(currentRoom);
        subscribeToRoomChanges(currentRoom.id);
    }

    async function createOnlineRoom() {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) {
            alert("Anda harus login untuk membuat sebuah ruangan!");
            openAuthModal();
            return;
        }

        const playerName = prompt("Masukkan nama Anda untuk permainan ini:", user.email.split('@')[0]);
        if (!playerName || playerName.trim() === '') {
            alert("Nama pemain tidak boleh kosong.");
            return;
        }

        const total = parseInt(totalPlayersConfigInput.value);
        const civ = parseInt(civiliansConfigInput.value);
        const uc = parseInt(undercoversConfigInput.value);
        const mw = parseInt(mrWhitesConfigInput.value);
        
        configErrorP.classList.add('hidden');
        if (total < 3) { showConfigError("Jumlah total pemain minimal 3."); return; }
        if (civ + uc + mw !== total) { showConfigError(`Jumlah peran (${civ + uc + mw}) tidak sama dengan Total Pemain (${total}).`); return; }

        const roomCode = generateRoomCode();
        const gameConfig = { total, civilians: civ, undercovers: uc, mrWhites: mw };
        const hostPlayer = {
            userId: user.id,
            name: playerName.trim(),
            isHost: true,
            avatar: `assets/images/avatar1.png`
        };

        const { data: newRoom, error } = await supabaseClient
            .from('game_rooms')
            .insert({
                room_code: roomCode,
                game_state: 'LOBBY',
                config: gameConfig,
                players: [hostPlayer],
                host_id: user.id
            })
            .select()
            .single();

        if (error) {
            console.error("Gagal membuat ruangan:", error);
            alert(`Terjadi kesalahan saat membuat ruangan: ${error.message}`);
        } else {
            currentRoom = newRoom;
            switchScreen(initialConfigSection, lobbySection);
            updateLobbyUI(newRoom);
            subscribeToRoomChanges(newRoom.id); 
        }
    }

    async function handleStartGame() {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user || !currentRoom || currentRoom.host_id !== user.id) {
            alert("Hanya host yang bisa memulai permainan.");
            return;
        }
        if (currentRoom.players.length !== currentRoom.config.total) {
            alert("Jumlah pemain belum sesuai dengan konfigurasi ruangan.");
            return;
        }

        console.log("Host memulai permainan...");
        startOnlineGameBtn.disabled = true;
        startOnlineGameBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memulai...';

        const selectedPackName = wordPackSelection.value;
        let wordList = [];
        if (selectedPackName === 'default') {
            wordList = defaultWordPairs;
        } else {
            wordList = customWordPacks[selectedPackName] || [];
        }
        if (!wordList || wordList.length === 0) {
            alert(`Paket kata "${selectedPackName}" kosong. Tidak bisa memulai.`);
            startOnlineGameBtn.disabled = false;
            return;
        }
        const selectedPair = wordList[Math.floor(Math.random() * wordList.length)];
        const finalCivilianWord = selectedPair.civilian;
        const finalUndercoverWord = selectedPair.undercover;

        const roles = [];
        for (let i = 0; i < currentRoom.config.civilians; i++) roles.push("Civilian");
        for (let i = 0; i < currentRoom.config.undercovers; i++) roles.push("Undercover");
        for (let i = 0; i < currentRoom.config.mrWhites; i++) roles.push("Mr. White");

        for (let i = roles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [roles[i], roles[j]] = [roles[j], roles[i]];
        }
        const shuffledPlayers = [...currentRoom.players].sort(() => Math.random() - 0.5);

        const playersWithRoles = shuffledPlayers.map((player, index) => {
            const assignedRole = roles[index];
            let assignedWord = "Anda tidak punya kata. Amati!";
            if (assignedRole === 'Civilian') assignedWord = finalCivilianWord;
            if (assignedRole === 'Undercover') assignedWord = finalUndercoverWord;

            return {
                ...player,
                role: assignedRole,
                originalRole: assignedRole,
                word: assignedWord,
                isEliminated: false,
                score: 0
            };
        });

        const { error } = await supabaseClient
            .from('game_rooms')
            .update({
                game_state: 'PLAYING',
                players: playersWithRoles,
                civilian_word: finalCivilianWord,
                undercover_word: finalUndercoverWord
            })
            .eq('id', currentRoom.id);

        if (error) {
            console.error("Gagal memulai permainan:", error);
            alert("Terjadi kesalahan saat memulai permainan.");
            startOnlineGameBtn.disabled = false;
        }
        console.log("Game dimulai! State telah diupdate di Supabase.");
    }
    
    // Saya sengaja meninggalkan fungsi-fungsi lama di bawah ini untuk referensi,
    // tapi sebagian besar tidak akan digunakan di alur online baru.
    // ...
    function resetGameFull() {
        // ... (isi fungsi tetap sama)
    }
    function showRoleOnCard(playerName, role, word) {
        // ... (isi fungsi tetap sama)
    }
    // dan seterusnya...


    // Initialize Game
    // Kita panggil resetGameFull untuk membersihkan tampilan awal
    resetGameFull();
});