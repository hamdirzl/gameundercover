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
        event.stopPropagation(); // Mencegah event "klik" menyebar ke window
        playClickSound();
        dropdownMenu.classList.toggle('show');
    });

    // Menutup menu jika mengklik di luar area menu
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
    let currentUser = null; // Menyimpan info user yg login
    let currentRoom = null; // Akan menyimpan semua data ruangan dari Supabase
    let gameRoomChannel = null; // Akan menyimpan koneksi realtime ke Supabase


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

    supabaseClient.auth.onAuthStateChange(async (event, session) => {
        const user = session?.user;
        if (event === 'SIGNED_IN') {
             currentUser = user;
             authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
             authBtn.title = `Logout (${user.email})`;
             wordPackOwnerSpan.classList.remove('hidden');
             authModal.classList.add('hidden');
             authBtn.onclick = handleLogout;
        } else if (event === 'SIGNED_OUT') {
            currentUser = null;
            customWordPacks = {}; 
            authBtn.innerHTML = '<i class="fas fa-user-circle"></i>';
            authBtn.title = "Login/Daftar";
            wordPackOwnerSpan.classList.add('hidden');
            authBtn.onclick = openAuthModal;
        }
        // Always load word packs on auth state change
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
        dropdownMenu.classList.remove('show'); // TUTUP MENU
    });
    closeGuideBtn.addEventListener('click', () => {
        playClickSound();
        howToPlayModal.classList.add('hidden');
    });
    openMusicSettingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        playClickSound();
        musicSettingsModal.classList.remove('hidden');
        dropdownMenu.classList.remove('show'); // TUTUP MENU
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
        createOnlineRoom(); // Panggil fungsi utama kita
    });

    joinOnlineRoomBtn.addEventListener('click', () => {
        playClickSound();
        joinRoomModal.classList.remove('hidden'); // Tampilkan popup untuk gabung
    });

    closeJoinModalBtn.addEventListener('click', () => {
        playClickSound();
        joinRoomModal.classList.add('hidden'); // Sembunyikan popup
    });

    confirmJoinRoomBtn.addEventListener('click', () => {
        playClickSound();
        joinOnlineRoom(); // Panggil fungsi gabung ruangan kita
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
        if (currentUser) {
            const { data, error } = await supabaseClient
                .from('wordPacks')
                .select('packs')
                .eq('user_id', currentUser.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error("Error getting word packs:", error);
            }
            
            if (data) {
                customWordPacks = data.packs || {};
            } else {
                customWordPacks = {};
            }
            updateWordPackDropdowns();
        } else {
            const packs = localStorage.getItem('ucHamdiWordPacks');
            customWordPacks = packs ? JSON.parse(packs) : {};
            updateWordPackDropdowns();
        }
    }

    async function saveWordPacks() {
        if (currentUser) {
            const { error } = await supabaseClient
                .from('wordPacks')
                .upsert({ user_id: currentUser.id, packs: customWordPacks }, { onConflict: 'user_id' });
            
            if (error) {
                console.error("Error saving word packs to Supabase: ", error);
            }
        } else {
            localStorage.setItem('ucHamdiWordPacks', JSON.stringify(customWordPacks));
        }
    }
    
    function updateWordPackDropdowns() {
        const selectedGamePack = wordPackSelection.value;
        const selectedEditPack = editPackSelection.value;
        wordPackSelection.innerHTML = '';
        editPackSelection.innerHTML = '';
        wordPackSelection.appendChild(new Option('Paket Bawaan (Default)', 'default'));
        const placeholderOption = new Option('Pilih paket...', '');
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        editPackSelection.appendChild(placeholderOption);
        const packNames = Object.keys(customWordPacks).sort();
        packNames.forEach(packName => {
            wordPackSelection.appendChild(new Option(packName, packName));
            editPackSelection.appendChild(new Option(packName, packName));
        });
        if (customWordPacks[selectedGamePack]) {
            wordPackSelection.value = selectedGamePack;
        }
        if (customWordPacks[selectedEditPack]) {
            editPackSelection.value = selectedEditPack;
        }
    }
    
    function handleCreateNewPack() {
        const packName = newPackNameInput.value.trim();
        if (!packName) { alert('Nama paket tidak boleh kosong!'); return; }
        if (customWordPacks[packName] || packName.toLowerCase() === 'default') {
            alert('Nama paket sudah ada atau tidak diizinkan!'); return;
        }
        customWordPacks[packName] = [];
        saveWordPacks();
        updateWordPackDropdowns();
        newPackNameInput.value = '';
        editPackSelection.value = packName;
        displayWordsForSelectedPack();
    }
    
    function displayWordsForSelectedPack() {
        const selectedPack = editPackSelection.value;
        if (selectedPack && customWordPacks[selectedPack]) {
            currentPackDisplayName.textContent = selectedPack;
            wordListDisplay.innerHTML = '';
            const words = customWordPacks[selectedPack];
            if (words.length === 0) {
                wordListDisplay.innerHTML = '<li>Belum ada kata di paket ini.</li>';
            } else {
                words.forEach((pair, index) => {
                    const li = document.createElement('li');
                    li.textContent = `C: ${pair.civilian} | U: ${pair.undercover}`;
                    const deleteBtn = document.createElement('button');
                    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
                    deleteBtn.classList.add('delete-word-btn');
                    deleteBtn.onclick = () => {
                         customWordPacks[selectedPack].splice(index, 1);
                         saveWordPacks();
                         displayWordsForSelectedPack();
                    };
                    li.appendChild(deleteBtn);
                    wordListDisplay.appendChild(li);
                });
            }
            addWordPairBtn.disabled = false;
            deletePackBtn.disabled = false;
        } else {
            currentPackDisplayName.textContent = '...';
            wordListDisplay.innerHTML = '<li>Pilih sebuah paket untuk melihat isinya.</li>';
            addWordPairBtn.disabled = true;
            deletePackBtn.disabled = true;
        }
    }
    
    function handleAddWordPair() {
        const selectedPack = editPackSelection.value;
        const civilianWordText = newCivilianWordInput.value.trim();
        const undercoverWordText = newUndercoverWordInput.value.trim();

        if (!selectedPack) { alert('Pilih paket terlebih dahulu!'); return; }
        if (!civilianWordText || !undercoverWordText) { alert('Kedua kata (Civilian dan Undercover) harus diisi!'); return; }
        
        customWordPacks[selectedPack].push({ civilian: civilianWordText, undercover: undercoverWordText });
        saveWordPacks();
        
        newCivilianWordInput.value = '';
        newUndercoverWordInput.value = '';
        newCivilianWordInput.focus();
        displayWordsForSelectedPack(); 
    }
    
    function handleDeletePack() {
        const selectedPack = editPackSelection.value;
        if (!selectedPack) { alert('Pilih paket yang akan dihapus!'); return; }
        if (confirm(`Apakah Anda yakin ingin menghapus paket "${selectedPack}"? Aksi ini tidak dapat dibatalkan.`)) {
            delete customWordPacks[selectedPack];
            saveWordPacks();
            updateWordPackDropdowns();
            displayWordsForSelectedPack();
        }
    }

    // --- SHARE RESULTS FUNCTIONALITY ---
    function handleShareResults(buttonElement) {
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        let winnerText = '';
        const winnerMessage = popupWinnerMessageH2.textContent;
        if (winnerMessage.includes('Tim Civilian')) { winnerText = 'Tim Civilian Menang!'; } 
        else if (winnerMessage.includes('Tim Undercover')) { winnerText = 'Tim Undercover & Mr. White Menang!'; } 
        else if (winnerMessage.includes('Mr. White')) {
             if(winnerMessage.includes('Luar Biasa')){ winnerText = `${currentWinnerPlayerObjects[0].name} (Mr. White) Menang dengan Menebak Kata!`; } 
             else { winnerText = 'Tim Mr. White Menang!'; }
        } else { winnerText = winnerMessage; }
        let resultText = `🏆 Hasil Pertandingan Undercover! 🏆\n\n${winnerText}\n\nPeringkat Akhir:\n`;
        sortedPlayers.forEach((p, index) => {
            resultText += `#${index + 1} - ${p.name} (${p.originalRole}): ${p.score} Poin\n`;
        });
        resultText += "\nMainkan di UC Hamdi's";
        navigator.clipboard.writeText(resultText).then(() => {
            const originalText = buttonElement.innerHTML;
            buttonElement.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
            buttonElement.disabled = true;
            setTimeout(() => {
                buttonElement.innerHTML = originalText;
                buttonElement.disabled = false;
            }, 2000);
        }).catch(err => {
            console.error('Gagal menyalin hasil: ', err);
            alert('Gagal menyalin hasil. Coba lagi.');
        });
    }

    // --- CORE GAME LOGIC (LAMA, AKAN DISESUAIKAN) ---
    function openPeekSelectionModal() {
        peekPlayerSelect.innerHTML = '';
        const activePlayers = players.filter(p => !p.isEliminated);
        activePlayers.forEach(player => { const option = document.createElement('option'); option.value = player.name; option.textContent = player.name; peekPlayerSelect.appendChild(option); });
        peekPlayerSelectModal.classList.remove('hidden');
    }

    function handleConfirmPeek() {
        const selectedPlayerName = peekPlayerSelect.value;
        if (!selectedPlayerName) { alert('Pilih nama pemain terlebih dahulu!'); return; }
        const playerData = players.find(p => p.name === selectedPlayerName);
        if (!playerData) return;
        peekPlayerSelectModal.classList.add('hidden');
        cardRevealPopupTitleH3.innerHTML = `<i class="fas fa-id-card"></i> Kartu untuk ${playerData.name}`;
        cardPlayerRoleP.textContent = playerData.role;
        cardPlayerWordP.textContent = playerData.word;
        let missionText = '';
        switch (playerData.role) {
            case "Civilian": missionText = "Beri petunjuk satu kata yang mengarah ke katamu untuk menemukan teman, tapi jangan terlalu jelas agar musuh tidak menebaknya. Bongkar kedok para penyamar!"; break;
            case "Undercover": missionText = "Katamu sedikit berbeda. Berpura-puralah menjadi Civilian dengan memberi petunjuk yang meyakinkan, lalu singkirkan mereka satu per satu saat lengah."; break;
            case "Mr. White": missionText = "Kamu adalah agen rahasia tanpa informasi. Dengarkan petunjuk lain, beraktinglah seolah kamu tahu segalanya, dan tebak kata rahasia jika identitasmu terbongkar!"; break;
        }
        cardPlayerMissionP.textContent = missionText;
        roleCardElement.classList.add('is-flipped');
        hideCardAndProceedBtn.classList.add('hidden');
        closePeekViewBtn.classList.remove('hidden');
        cardRevealModal.classList.remove('hidden');
    }

    function resetGameFull() {
        isInitialSetupPhase = true; players = []; configuredTotalPlayers = 0; rolesToDistribute = []; currentPlayerIndex = 0;
        initialCiviliansCount = 0; initialUndercoversCount = 0; initialMrWhitesCount = 0;
        civilianWord = ""; undercoverWord = ""; gameInProgress = true; eliminatedThisRoundPlayer = null;
        currentWinningTeamType = null; currentWinnerPlayerObjects = []; playerSelectedForElimination = null; playersAwaitingPenalty = [];
        const musicIcon = toggleMusicBtn.querySelector('i');
        if (isMusicPlaying) { backgroundMusic.pause(); isMusicPlaying = false; musicManuallyPaused = true; if(musicIcon) musicIcon.className = 'fas fa-music'; }
        musicSelection.value = "0"; totalPlayersConfigInput.value = "5"; civiliansConfigInput.value = "3";
        undercoversConfigInput.value = "1"; mrWhitesConfigInput.value = "1";
        configErrorP.classList.add('hidden'); configErrorP.textContent = '';
        const allScreens = [playerNameInputSection, gameSection, mrWhiteGuessSection, eliminationResultPopup, winnerPopupModal, roundOverSection, finalScoreDisplayModal, cardRevealModal, musicSettingsModal, peekPlayerSelectModal, massPenaltyModal, howToPlayModal, wordPackManagerModal, authModal, lobbySection, joinRoomModal];
        allScreens.forEach(s => { if(s) s.classList.add('hidden'); });
        initialConfigSection.classList.remove('hidden');
        resetTruthOrDareButtons(); if(debugCivilianWordP) debugCivilianWordP.style.display = 'none';
        if(activePlayerListUl) activePlayerListUl.innerHTML = ''; if(playerToEliminateDisplay) playerToEliminateDisplay.textContent = "Belum ada";
        if(confirmEliminationBtn) confirmEliminationBtn.disabled = true; if(roundRolesListUl) roundRolesListUl.innerHTML = '';
        if(finalCumulativeScoresTbody) finalCumulativeScoresTbody.innerHTML = ''; if(confettiAnimation) confettiAnimation.classList.add('hidden');
        loadWordPacks();
    }

    function validateConfigAndProceed() {
        const total = parseInt(totalPlayersConfigInput.value || "0"); const civ = parseInt(civiliansConfigInput.value || "0");
        const uc = parseInt(undercoversConfigInput.value || "0"); const mw = parseInt(mrWhitesConfigInput.value || "0");
        configErrorP.classList.add('hidden'); configErrorP.textContent = '';
        if (isNaN(total) || isNaN(civ) || isNaN(uc) || isNaN(mw)) { showConfigError("Field hanya boleh diisi dengan angka."); return; }
        if (total < 3) { showConfigError("Jumlah total pemain minimal 3."); return; }
        if (civ < 0 || uc < 0 || mw < 0) { showConfigError("Jumlah peran tidak boleh negatif."); return; }
        if (uc === 0 && mw === 0) { showConfigError("Permainan harus memiliki setidaknya 1 Undercover atau 1 Mr. White."); return; }
        if (civ + uc + mw !== total) { showConfigError(`Jumlah peran (${civ + uc + mw}) tidak sama dengan Total Pemain (${total}).`); return; }

        const selectedPackName = wordPackSelection.value;
        if (selectedPackName === 'default') { currentWordList = defaultWordPairs; } 
        else { currentWordList = customWordPacks[selectedPackName] || []; }

        if (!currentWordList || currentWordList.length === 0) {
            showConfigError(`Paket kata "${selectedPackName}" kosong atau tidak valid. Tambahkan beberapa kata di pengelola paket.`);
            return;
        }
        
        resumeAudioContext();
        const musicIcon = toggleMusicBtn.querySelector('i');
        if (!isMusicPlaying && musicManuallyPaused) {
            musicManuallyPaused = false;
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) { playPromise.then(() => { isMusicPlaying = true; if(musicIcon) musicIcon.className = 'fas fa-volume-mute'; }).catch(error => { console.error("Pemutaran otomatis gagal:", error); musicManuallyPaused = true; isMusicPlaying = false; if(musicIcon) musicIcon.className = 'fas fa-music'; }); }
        }
        configuredTotalPlayers = total; initialCiviliansCount = civ; initialUndercoversCount = uc; initialMrWhitesCount = mw;
        generateRolesToDistribute(); selectNewWordPair();
        players = []; currentPlayerIndex = 0; isInitialSetupPhase = true;
        gameInProgress = true; currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        switchScreen(initialConfigSection, playerNameInputSection);
        prepareForNextPlayerNameInput();
    }

    function generateRolesToDistribute() { rolesToDistribute = []; for (let i = 0; i < initialCiviliansCount; i++) rolesToDistribute.push("Civilian"); for (let i = 0; i < initialUndercoversCount; i++) rolesToDistribute.push("Undercover"); for (let i = 0; i < initialMrWhitesCount; i++) rolesToDistribute.push("Mr. White"); for (let i = rolesToDistribute.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[rolesToDistribute[i], rolesToDistribute[j]] = [rolesToDistribute[j], rolesToDistribute[i]]; } }
    
    function selectNewWordPair() { 
        if (!currentWordList || currentWordList.length === 0) {
            currentWordList = [{ civilian: "Error", undercover: "Bug" }];
        }
        const selectedPair = currentWordList[Math.floor(Math.random() * currentWordList.length)]; 
        civilianWord = selectedPair.civilian; 
        undercoverWord = selectedPair.undercover; 
    }

    function showConfigError(message) { configErrorP.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`; configErrorP.classList.remove('hidden'); }
    function prepareForNextPlayerNameInput() { playerNameInputTitleH2.innerHTML = `<i class="fas fa-user-plus"></i> Masukkan Nama Pemain ${currentPlayerIndex + 1}`; currentPlayerNameInput.value = ''; currentPlayerNameInput.focus(); submitNameAndDrawCardBtn.disabled = false; }

    function handleSubmitNameAndDrawCard() {
        const playerName = currentPlayerNameInput.value.trim();
        if (!playerName) { alert("Nama pemain tidak boleh kosong!"); return; }
        if (players.some(p => p.name.toLowerCase() === playerName.toLowerCase())) { alert("Nama pemain sudah digunakan!"); return; }
        submitNameAndDrawCardBtn.disabled = true;
        const assignedRole = rolesToDistribute[currentPlayerIndex];
        let assignedWord = (assignedRole === "Civilian") ? civilianWord : (assignedRole === "Undercover") ? undercoverWord : "Anda tidak punya kata. Amati!";
        const avatarIndex = (players.length % 6) + 1;
        players.push({ name: playerName, role: assignedRole, word: assignedWord, isEliminated: false, originalRole: assignedRole, score: 0, avatar: `assets/images/avatar${avatarIndex}.png` });
        switchScreen(playerNameInputSection, null);
        showRoleOnCard(playerName, assignedRole, assignedWord);
    }

    function prepareNewRoundRoleReveal() {
        const currentPlayer = players[currentPlayerIndex];
        const assignedRole = rolesToDistribute[currentPlayerIndex];
        currentPlayer.role = assignedRole;
        currentPlayer.word = (assignedRole === "Civilian") ? civilianWord : (assignedRole === "Undercover") ? undercoverWord : "Anda tidak punya kata. Amati!";
        showRoleOnCard(currentPlayer.name, currentPlayer.role, currentPlayer.word);
    }

    function showRoleOnCard(playerName, role, word) {
        cardRevealPopupTitleH3.innerHTML = `<i class="fas fa-id-card"></i> Kartu untuk ${playerName}`;
        cardPlayerRoleP.textContent = role;
        cardPlayerWordP.textContent = word;
        let missionText = '';
        switch (role) {
            case "Civilian": missionText = "Beri petunjuk satu kata yang mengarah ke katamu untuk menemukan teman, tapi jangan terlalu jelas agar musuh tidak menebaknya. Bongkar kedok para penyamar!"; break;
            case "Undercover": missionText = "Katamu sedikit berbeda. Berpura-puralah menjadi Civilian dengan memberi petunjuk yang meyakinkan, lalu singkirkan mereka satu per satu saat lengah."; break;
            case "Mr. White": missionText = "Kamu adalah agen rahasia tanpa informasi. Dengarkan petunjuk lain, beraktinglah seolah kamu tahu segalanya, dan tebak kata rahasia jika identitasmu terbongkar!"; break;
        }
        cardPlayerMissionP.textContent = missionText;
        roleCardElement.classList.remove('is-flipped');
        hideCardAndProceedBtn.classList.add('hidden');
        closePeekViewBtn.classList.add('hidden'); 
        cardRevealModal.classList.remove('hidden');
    }

    function handleCardFlip() { if (!roleCardElement.classList.contains('is-flipped')) { roleCardElement.classList.add('is-flipped'); hideCardAndProceedBtn.classList.remove('hidden'); } }
    
    function handleProceedAfterCardView() {
        roleCardElement.classList.remove('is-flipped');
        setTimeout(() => {
            cardRevealModal.classList.add('hidden');
            currentPlayerIndex++;
            if (currentPlayerIndex < configuredTotalPlayers) {
                if (isInitialSetupPhase) {
                    switchScreen(null, playerNameInputSection);
                    prepareForNextPlayerNameInput();
                } else { 
                    prepareNewRoundRoleReveal();
                }
            } else {
                isInitialSetupPhase = false;
                switchScreen(null, gameSection);
                startGamePlay();
            }
        }, 250);
    }

    function startGamePlay() {
        gameInProgress = true; currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        players.forEach(p => { p.isEliminated = false; });
        playerSelectedForElimination = null; 
        if(playerToEliminateDisplay) playerToEliminateDisplay.textContent = "Belum ada";
        if(confirmEliminationBtn) confirmEliminationBtn.disabled = true;
        updateActivePlayerListWithAvatars();
        document.getElementById('voting-phase').classList.remove('hidden');
        resetTruthOrDareButtons();
        if(confettiAnimation) confettiAnimation.classList.add('hidden');
    }

    function startNewRoundWithSameTeam() {
        isInitialSetupPhase = false; generateRolesToDistribute(); selectNewWordPair();
        currentPlayerIndex = 0;
        switchScreen(roundOverSection, null);
        winnerPopupModal.classList.add('hidden'); finalScoreDisplayModal.classList.add('hidden');
        gameInProgress = true; currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        if(confettiAnimation) confettiAnimation.classList.add('hidden');
        prepareNewRoundRoleReveal();
    }

    function updateActivePlayerListWithAvatars() {
        activePlayerListUl.innerHTML = '';
        const activePlayers = players.filter(p => !p.isEliminated);
        if (activePlayers.length === 0 && gameInProgress) { checkWinConditionsAndProceed(); return; }
        activePlayers.forEach(player => {
            const li = document.createElement('li'); li.dataset.playerName = player.name;
            li.classList.add('player-avatar-card');
            if (player.name === playerSelectedForElimination) li.classList.add('selected-for-vote');
            const img = document.createElement('img'); img.src = player.avatar; img.alt = `Avatar ${player.name}`;
            img.classList.add('player-avatar-img');
            const nameSpan = document.createElement('span'); nameSpan.textContent = player.name;
            nameSpan.classList.add('player-avatar-name');
            li.appendChild(img); li.appendChild(nameSpan); activePlayerListUl.appendChild(li);
        });
        confirmEliminationBtn.disabled = !playerSelectedForElimination;
    }

    function handleAvatarVoteSelection(event) {
        if (!gameInProgress) return;
        const clickedLi = event.target.closest('.player-avatar-card');
        if (!clickedLi || clickedLi.classList.contains('eliminated')) return;
        const previouslySelectedCard = activePlayerListUl.querySelector('.selected-for-vote');
        if (clickedLi === previouslySelectedCard) {
            clickedLi.classList.remove('selected-for-vote'); playerSelectedForElimination = null;
            playerToEliminateDisplay.textContent = "Belum ada"; confirmEliminationBtn.disabled = true;
        } else {
            if (previouslySelectedCard) previouslySelectedCard.classList.remove('selected-for-vote');
            clickedLi.classList.add('selected-for-vote'); playerSelectedForElimination = clickedLi.dataset.playerName;
            playerToEliminateDisplay.textContent = playerSelectedForElimination; confirmEliminationBtn.disabled = false;
        }
    }

    function handleConfirmElimination() {
        if (!playerSelectedForElimination) { alert("Pilih pemain yang akan dieliminasi."); return; }
        eliminatedThisRoundPlayer = players.find(p => p.name === playerSelectedForElimination);
        if (!eliminatedThisRoundPlayer) return;
        eliminatedThisRoundPlayer.isEliminated = true;
        if (eliminatedThisRoundPlayer.role === "Civilian") { playLoseSound(); } else if (eliminatedThisRoundPlayer.role === "Undercover") { playWinSound(); }
        document.getElementById('voting-phase').classList.add('hidden');
        if (eliminatedThisRoundPlayer.role === "Mr. White") {
            mrWhiteGuessSection.classList.remove('hidden');
            mrWhiteNameGuessStrong.textContent = eliminatedThisRoundPlayer.name;
        } else {
            eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-skull-crossbones"></i> ${eliminatedThisRoundPlayer.name} (Peran: ${eliminatedThisRoundPlayer.role}) telah tereliminasi.`;
            resetTruthOrDareButtons();
            eliminationResultPopup.classList.remove('hidden');
        }
        playerSelectedForElimination = null; playerToEliminateDisplay.textContent = "Belum ada";
        confirmEliminationBtn.disabled = true; updateActivePlayerListWithAvatars();
    }

    function handleCloseEliminationPopup() {
        eliminationResultPopup.classList.add('hidden');
        resetTruthOrDareButtons();
        checkWinConditionsAndProceed();
    }

    function handleMrWhiteGuess() {
        const guess = mrWhiteWordGuessInput.value.trim();
        mrWhiteGuessSection.classList.add('hidden');
        mrWhiteWordGuessInput.value = '';
        if (guess.toLowerCase() === civilianWord.toLowerCase()) {
            playWinSound();
            currentWinningTeamType = "MR_WHITE_GUESS";
            currentWinnerPlayerObjects = [eliminatedThisRoundPlayer];
            gameInProgress = false;
            playersAwaitingPenalty = players.filter(p => p.isEliminated === false && p.name !== eliminatedThisRoundPlayer.name);
            if (playersAwaitingPenalty.length > 0) {
                massPenaltyModal.classList.remove('hidden');
                processNextPenalty();
            } else {
                announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
            }
        } else {
            playLoseSound();
            eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-times-circle"></i> ${eliminatedThisRoundPlayer.name} (Mr. White) gagal menebak dan tereliminasi.`;
            resetTruthOrDareButtons();
            eliminationResultPopup.classList.remove('hidden');
        }
    }

    function processNextPenalty() {
        const nextPlayer = playersAwaitingPenalty.shift();
        if (nextPlayer) {
            massPenaltyPlayerName.textContent = nextPlayer.name;
            massPenaltyDisplay.classList.add('hidden');
            massTruthBtn.disabled = false; massDareBtn.disabled = false;
            massPenaltyNextBtn.classList.add('hidden');
        } else {
            massPenaltyModal.classList.add('hidden');
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
        }
    }

    function applyMassPenalty(type) {
        let item = (type === 'truth') ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        massPenaltyText.innerHTML = (type === 'truth') ? `<i class="fas fa-check-circle"></i> <strong>TRUTH:</strong> ${item}` : `<i class="fas fa-fire"></i> <strong>DARE:</strong> ${item}`;
        massPenaltyDisplay.classList.remove('hidden');
        massTruthBtn.disabled = true; massDareBtn.disabled = true;
        massPenaltyNextBtn.classList.remove('hidden');
        massPenaltyNextBtn.innerHTML = (playersAwaitingPenalty.length === 0) ? '<i class="fas fa-flag-checkered"></i> Selesaikan Babak' : '<i class="fas fa-arrow-right"></i> Lanjut ke Pemain Berikutnya';
    }

    // =========================================================
    // =========== CORE WIN CONDITION LOGIC (FIXED) ============
    // =========================================================
    function checkWinConditionsAndProceed() {
        if (!gameInProgress) {
             if (currentWinningTeamType) {
                announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
             }
             return;
        }

        const activePlayers = players.filter(p => !p.isEliminated);
        const activeCivilians = activePlayers.filter(p => p.role === 'Civilian');
        const activeUndercovers = activePlayers.filter(p => p.role === 'Undercover');
        const activeMrWhites = activePlayers.filter(p => p.role === 'Mr. White');

        let winDetected = false;
        let determinedWinType = "";
        let determinedWinners = [];

        // KONDISI BARU: Kemenangan Duel 1 vs 1 Undercover
        if (activePlayers.length === 2 && activeCivilians.length === 1 && activeUndercovers.length === 1) {
            winDetected = true;
            determinedWinType = "UC_DUEL_WIN";
            determinedWinners = activeUndercovers;
            // Civilian yang kalah akan mendapat hukuman
            eliminatedThisRoundPlayer = activeCivilians[0];
            eliminatedThisRoundPlayer.isEliminated = true;

            gameInProgress = false;
            currentWinningTeamType = determinedWinType;
            currentWinnerPlayerObjects = determinedWinners;
            playWinSound();

            document.getElementById('voting-phase').classList.add('hidden');
            eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-skull-crossbones"></i> ${eliminatedThisRoundPlayer.name} (Civilian) kalah dalam duel terakhir!`;
            resetTruthOrDareButtons();
            eliminationResultPopup.classList.remove('hidden');
            // Alur akan berlanjut ke pengumuman pemenang setelah popup hukuman ditutup
            return; 
        }

        // KONDISI 1: Kemenangan Tim Civilian
        // Jika tidak ada lagi Undercover DAN Mr. White yang aktif.
        if (activeUndercovers.length === 0 && activeMrWhites.length === 0) {
            winDetected = true;
            determinedWinType = "CIVILIAN_TEAM";
            // Pemenangnya adalah SEMUA pemain yang peran aslinya Civilian.
            determinedWinners = players.filter(p => p.originalRole === 'Civilian');
        }
        // KONDISI 2: Kemenangan Tim Undercover / Mr. White
        // Hanya jika sudah TIDAK ADA LAGI Civilian yang tersisa.
        else if (activeCivilians.length === 0) {
            winDetected = true;
            // Pemenangnya adalah semua yang masih bertahan.
            determinedWinners = activePlayers;
            
            const survivingUndercovers = activePlayers.filter(p => p.role === 'Undercover');
            const survivingMrWhites = activePlayers.filter(p => p.role === 'Mr. White');

            if (survivingUndercovers.length > 0 && survivingMrWhites.length > 0) {
                determinedWinType = "UC_MW_SURVIVAL";
            } else if (survivingUndercovers.length > 0) {
                determinedWinType = "UC_SURVIVAL";
            } else if (survivingMrWhites.length > 0) {
                determinedWinType = "MW_SURVIVAL";
            }
        }

        // PROSES HASIL
        if (winDetected) {
            gameInProgress = false;
            currentWinningTeamType = determinedWinType;
            currentWinnerPlayerObjects = determinedWinners;

            // Jika yang dieliminasi terakhir adalah Civilian, berikan dia hukuman dulu
            if (eliminatedThisRoundPlayer?.originalRole === 'Civilian' && activeCivilians.length === 0) {
                 document.getElementById('voting-phase').classList.add('hidden');
                 eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-skull-crossbones"></i> ${eliminatedThisRoundPlayer.name} (Civilian Terakhir) telah tereliminasi!`;
                 resetTruthOrDareButtons();
                 eliminationResultPopup.classList.remove('hidden');
                 // Pemenang akan diumumkan setelah popup hukuman ditutup.
                 return;
            }
            
            // Langsung umumkan pemenang jika kondisinya berbeda
            playWinSound();
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);

        } else {
            // Jika tidak ada yang menang, permainan berlanjut.
            document.getElementById('voting-phase').classList.remove('hidden');
            playerSelectedForElimination = null;
            if(playerToEliminateDisplay) playerToEliminateDisplay.textContent = "Belum ada";
            if(confirmEliminationBtn) confirmEliminationBtn.disabled = true;
            updateActivePlayerListWithAvatars();
        }
    }
    // =========== END OF FIXED LOGIC ============


    function announceWinner(winningTeamType, winnerPlayerObjects = []) {
        let popupMsg = "🎉 Selamat! 🎉"; let popupDetail = "";
        switch (winningTeamType) {
            case "MR_WHITE_GUESS": popupMsg = `🎉 <i class="fas fa-crown"></i> Luar Biasa, ${winnerPlayerObjects[0].name}! 🎉`; popupDetail = "Anda (Mr. White) berhasil menebak kata rahasia Civilian!"; break;
            case "UC_DUEL_WIN": popupMsg = `🎉 Selamat, ${winnerPlayerObjects[0].name} (Undercover)! 🎉`; popupDetail = `Undercover memenangkan duel terakhir melawan Civilian!`; break;
            case "UC_SURVIVAL": popupMsg = `🎉 Selamat, Tim Undercover! 🎉`; popupDetail = "Tim Undercover berhasil bertahan hingga akhir!"; break;
            case "MW_SURVIVAL": popupMsg = `🎉 Selamat, Tim Mr. White! 🎉`; popupDetail = "Mr. White berhasil bertahan hingga semua Civilian tersingkir!"; break;
            case "UC_MW_SURVIVAL": popupMsg = `🎉 Selamat, Tim Undercover & Mr. White! 🎉`; popupDetail = "Tim Undercover dan Mr. White berhasil mengeliminasi semua Civilian!"; break;
            case "CIVILIAN_TEAM": popupMsg = `🎉 Selamat, Tim Civilian! 🎉`; popupDetail = "Tim Civilian berhasil mengungkap semua penjahat!"; break;
            default: popupDetail = "Permainan telah berakhir.";
        }
        popupWinnerMessageH2.innerHTML = popupMsg; popupWinnerDetailP.textContent = popupDetail;
        if (winningTeamType !== "NO_WINNER_DRAW" && confettiAnimation) { confettiAnimation.classList.remove('hidden'); confettiAnimation.src = confettiAnimation.src.split("?")[0] + "?" + new Date().getTime(); } else if (confettiAnimation) { confettiAnimation.classList.add('hidden'); }
        winnerPopupModal.classList.remove('hidden');
        switchScreen(gameSection, null);
    }

    function closeWinnerPopupAndShowRoundScores() { winnerPopupModal.classList.add('hidden'); if (confettiAnimation) confettiAnimation.classList.add('hidden'); switchScreen(null, roundOverSection); displayRoundOverDetails(); }

    function displayRoundOverDetails() {
        calculateAndDisplayRoundScores();
        roundOverSection.querySelector('h2').textContent = "🏁 Babak Selesai! 🏁";
        roundRolesListUl.innerHTML = '';
        const winningRoles = [];
        if (["CIVILIAN_TEAM"].includes(currentWinningTeamType)) winningRoles.push("Civilian");
        if (["UC_DUEL_WIN", "UC_SURVIVAL", "UC_MW_SURVIVAL"].includes(currentWinningTeamType)) winningRoles.push("Undercover");
        if (["MR_WHITE_GUESS", "MW_SURVIVAL", "UC_MW_SURVIVAL"].includes(currentWinningTeamType)) winningRoles.push("Mr. White");
        
        players.forEach(p => {
            const li = document.createElement('li'); let roleIcon = '';
            if (p.originalRole === 'Civilian') roleIcon = '<i class="fas fa-shield-alt" style="color:var(--theme-success)"></i> ';
            else if (p.originalRole === 'Undercover') roleIcon = '<i class="fas fa-user-secret" style="color:var(--theme-error)"></i> ';
            else if (p.originalRole === 'Mr. White') roleIcon = '<i class="fas fa-user-tie" style="color:var(--theme-mrwhite)"></i> ';
            const isWinner = winningRoles.includes(p.originalRole) || currentWinnerPlayerObjects.some(wp => wp.name === p.name);
            let status = p.isEliminated ? 'Tereliminasi' : 'Selamat';
            if (isWinner) status = '🎉 MENANG 🎉';
            const roundScoreForPlayer = p.roundScoreThisTurn || 0;
            li.innerHTML = `<strong>${p.name}</strong>: ${roleIcon}${p.originalRole} <span style="font-style:italic; color: var(--text-secondary);">(Kata: ${p.word})</span> - ${status} <strong style="color: var(--theme-primary);">[+${roundScoreForPlayer} Poin]</strong> (Total: ${p.score})`;
            roundRolesListUl.appendChild(li);
        });
        debugCivilianWordP.style.display = 'block'; civilianWordDisplay.textContent = civilianWord;
        if(truthOrDareSection.parentElement === eliminationResultPopup) { eliminationResultPopup.classList.add('hidden'); }
    }

    function calculateAndDisplayRoundScores() {
        players.forEach(player => {
            player.roundScoreThisTurn = POINTS_LOSER;
            const isDesignatedWinner = currentWinnerPlayerObjects.some(wp => wp.name === player.name);
            switch (currentWinningTeamType) {
                case "MR_WHITE_GUESS": if (player.originalRole === "Mr. White" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_MW_GUESS_WIN; break;
                case "UC_DUEL_WIN": case "UC_SURVIVAL": if (player.originalRole === "Undercover" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_UC_WIN; break;
                case "MW_SURVIVAL": if (player.originalRole === "Mr. White" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_MW_SURVIVAL_WIN; break;
                case "UC_MW_SURVIVAL": if (player.originalRole === "Undercover" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_UC_WIN; else if (player.originalRole === "Mr. White" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_MW_SURVIVAL_WIN; break;
                case "CIVILIAN_TEAM": if (player.originalRole === "Civilian") player.roundScoreThisTurn = player.isEliminated ? POINTS_CIVILIAN_TEAM_WIN_ELIMINATED : POINTS_CIVILIAN_TEAM_WIN_SURVIVED; break;
            }
            player.score += player.roundScoreThisTurn;
        });
    }

    function showFinalScoreboard() {
        finalScoreDisplayModal.classList.remove('hidden');
        switchScreen(roundOverSection, null);
        winnerPopupModal.classList.add('hidden');
        if (confettiAnimation) confettiAnimation.classList.add('hidden');
        finalCumulativeScoresTbody.innerHTML = ''; 
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        sortedPlayers.forEach((player, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td data-label="Peringkat">#${index + 1}</td> <td data-label="Nama Pemain">${player.name}</td> <td data-label="Peran Asli">${player.originalRole}</td> <td data-label="Total Skor" class="score-value">${player.score} Poin</td>`;
            finalCumulativeScoresTbody.appendChild(tr);
        });
    }

    function applyPenalty(type) {
        let item = (type === 'truth') ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        penaltyTextP.innerHTML = (type === 'truth') ? `<i class="fas fa-check-circle"></i> <strong>TRUTH:</strong> ${item}` : `<i class="fas fa-fire"></i> <strong>DARE:</strong> ${item}`;
        penaltyDisplayDiv.classList.remove('hidden'); truthBtn.disabled = true; dareBtn.disabled = true;
        if (type === 'truth') { truthBtn.classList.add('selected'); } else { dareBtn.classList.add('selected'); }
        closeEliminationPopupBtn.classList.remove('hidden', 'btn-secondary'); closeEliminationPopupBtn.classList.add('btn-primary');
    }

    function resetTruthOrDareButtons() {
        if(truthBtn) { truthBtn.disabled = false; truthBtn.classList.remove('selected'); }
        if(dareBtn) { dareBtn.disabled = false; dareBtn.classList.remove('selected'); }
        if(penaltyDisplayDiv) penaltyDisplayDiv.classList.add('hidden'); 
        if(penaltyTextP) penaltyTextP.textContent = '';
        if(closeEliminationPopupBtn) { closeEliminationPopupBtn.classList.add('hidden', 'btn-secondary'); closeEliminationPopupBtn.classList.remove('btn-primary'); }
    }
    
    // =========================================================
    // =========== FUNGSI-FUNGSI BARU UNTUK MODE ONLINE ========
    // =========================================================

    /**
     * Menghasilkan kode ruangan 4 digit acak.
     */
    function generateRoomCode() {
        return Math.random().toString(36).substring(2, 6).toUpperCase();
    }

    /**
     * Memperbarui UI Lobi dengan data dari server.
     * @param {object} roomData - Data ruangan dari Supabase.
     */
    function updateLobbyUI(roomData) {
        lobbyRoomCode.textContent = roomData.room_code;
        playerCountSpan.textContent = roomData.players.length;
        maxPlayerCountSpan.textContent = roomData.config.total;

        lobbyPlayerList.innerHTML = ''; // Kosongkan daftar pemain lama
        roomData.players.forEach(player => {
            const li = document.createElement('li');
            li.classList.add('player-avatar-card');
            
            const img = document.createElement('img');
            // Kita belum punya avatar di object player, jadi pakai default dulu
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
    
    /**
     * Berlangganan (subscribe) ke perubahan realtime pada sebuah ruangan.
     * @param {string} roomId - ID dari ruangan yang akan didengarkan.
     */
    function subscribeToRoomChanges(roomId) {
        // Jika sudah ada koneksi, putuskan dulu
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
                    console.log('Perubahan terdeteksi di ruangan!', payload.new);
                    const updatedRoom = payload.new;
                    currentRoom = updatedRoom; // Selalu update data ruangan lokal kita

                    // Perbarui UI Lobi berdasarkan data terbaru
                    updateLobbyUI(updatedRoom);

                    // Logika untuk menampilkan tombol "Mulai" hanya untuk host
                    // dan jika jumlah pemain sudah mencukupi
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
                }
            )
            .subscribe();
        
        console.log(`Berhasil berlangganan ke channel: room_${roomId}`);
    }


    /**
     * Fungsi untuk pemain bergabung ke ruangan yang sudah ada.
     */
    async function joinOnlineRoom() {
        // 1. Cek login & validasi input
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) {
            alert("Anda harus login untuk bergabung!");
            openAuthModal();
            return;
        }
        currentUser = user;

        const roomCode = joinRoomCodeInput.value.trim().toUpperCase();
        if (roomCode.length !== 4) {
            alert("Kode ruangan harus 4 digit.");
            return;
        }
        
        const playerName = prompt("Masukkan nama Anda untuk permainan ini:", currentUser.email.split('@')[0]);
        if (!playerName || playerName.trim() === '') {
            alert("Nama pemain tidak boleh kosong.");
            return;
        }

        // 2. Cari ruangan di database
        console.log(`Mencari ruangan dengan kode: ${roomCode}`);
        const { data: roomData, error: fetchError } = await supabaseClient
            .from('game_rooms')
            .select('*')
            .eq('room_code', roomCode)
            .single();

        if (fetchError || !roomData) {
            console.error("Error mencari ruangan:", fetchError);
            alert("Ruangan tidak ditemukan atau kode salah.");
            return;
        }

        // 3. Validasi ruangan
        if (roomData.game_state !== 'LOBBY') {
            alert("Gagal bergabung, permainan di ruangan ini sudah dimulai.");
            return;
        }
        if (roomData.players.length >= roomData.config.total) {
            alert("Gagal bergabung, ruangan sudah penuh.");
            return;
        }
        if (roomData.players.some(p => p.userId === currentUser.id)) {
            alert("Anda sudah berada di dalam ruangan ini!");
            currentRoom = roomData; // Tetapkan ruangan saat ini
        } else {
            // 4. Jika valid, tambahkan pemain baru
            const newPlayer = {
                userId: currentUser.id,
                name: playerName.trim(),
                isHost: false,
                avatar: `assets/images/avatar${roomData.players.length + 1}.png`
            };
            const updatedPlayers = [...roomData.players, newPlayer];

            // 5. Update data di Supabase
            const { data: updatedRoom, error: updateError } = await supabaseClient
                .from('game_rooms')
                .update({ players: updatedPlayers })
                .eq('id', roomData.id)
                .select()
                .single();

            if (updateError) {
                console.error("Gagal bergabung ke ruangan:", updateError);
                alert(`Terjadi kesalahan saat bergabung: ${updateError.message}`);
                return;
            }
            currentRoom = updatedRoom;
        }
        
        // 6. Pindahkan layar ke lobi
        console.log("Berhasil bergabung dengan ruangan:", currentRoom);
        switchScreen(initialConfigSection, lobbySection);
        joinRoomModal.classList.add('hidden'); // Tutup modal
        updateLobbyUI(currentRoom);

        // Mulai dengarkan perubahan realtime
        subscribeToRoomChanges(currentRoom.id);
    }


    /**
     * Fungsi utama untuk membuat ruangan baru dan menyimpannya di Supabase.
     */
    async function createOnlineRoom() {
        // 1. Cek apakah pengguna sudah login
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) {
            alert("Anda harus login untuk membuat sebuah ruangan!");
            openAuthModal(); // Buka modal login jika belum
            return;
        }
        currentUser = user; // pastikan currentUser terupdate

        // 2. Minta nama pemain untuk host
        const playerName = prompt("Masukkan nama Anda untuk permainan ini:", currentUser.email.split('@')[0]);
        if (!playerName || playerName.trim() === '') {
            alert("Nama pemain tidak boleh kosong.");
            return;
        }

        // 3. Validasi konfigurasi (mirip dengan fungsi lama)
        const total = parseInt(totalPlayersConfigInput.value);
        const civ = parseInt(civiliansConfigInput.value);
        const uc = parseInt(undercoversConfigInput.value);
        const mw = parseInt(mrWhitesConfigInput.value);
        
        configErrorP.classList.add('hidden');
        if (total < 3) { showConfigError("Jumlah total pemain minimal 3."); return; }
        if (civ + uc + mw !== total) { showConfigError(`Jumlah peran (${civ + uc + mw}) tidak sama dengan Total Pemain (${total}).`); return; }

        // 4. Siapkan data untuk dimasukkan ke database
        const roomCode = generateRoomCode();
        const gameConfig = { total, civilians: civ, undercovers: uc, mrWhites: mw };
        const hostPlayer = {
            userId: currentUser.id,
            name: playerName.trim(),
            isHost: true,
            avatar: `assets/images/avatar1.png` // Host selalu avatar 1 untuk sementara
        };

        // 5. Masukkan data ke tabel 'game_rooms' di Supabase
        console.log("Mencoba membuat ruangan di Supabase...");
        const { data: newRoom, error } = await supabaseClient
            .from('game_rooms')
            .insert({
                room_code: roomCode,
                game_state: 'LOBBY',
                config: gameConfig,
                players: [hostPlayer],
                host_id: currentUser.id
            })
            .select() // Minta Supabase mengembalikan baris yang baru dibuat
            .single(); // Karena kita tahu hanya ada 1 baris

        // 6. Tangani hasilnya
        if (error) {
            console.error("Gagal membuat ruangan:", error);
            alert(`Terjadi kesalahan saat membuat ruangan: ${error.message}`);
        } else {
            console.log("Ruangan berhasil dibuat:", newRoom);
            currentRoom = newRoom; // Simpan data ruangan saat ini ke variabel global
            
            // Pindahkan tampilan ke lobi
            switchScreen(initialConfigSection, lobbySection);
            
            // Perbarui UI lobi dengan data yang benar
            updateLobbyUI(newRoom);
            
            // Mulai dengarkan perubahan realtime untuk ruangan ini
            subscribeToRoomChanges(newRoom.id); 
        }
    }


    // Initialize Game
    resetGameFull();
});