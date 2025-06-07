document.addEventListener('DOMContentLoaded', async () => { // Made it async for supabase auth
    // --- SECTIONS ---
    const initialConfigSection = document.getElementById('initial-config-section');
    const playerNameInputSection = document.getElementById('player-name-input-section');
    const gameSection = document.getElementById('game-section');
    const roundOverSection = document.getElementById('round-over-section');
    const finalScoreDisplayModal = document.getElementById('final-score-display-section'); // Treat as main screen

    // --- MODALS (true overlays) ---
    const cardRevealModal = document.getElementById('card-reveal-modal');
    const eliminationResultPopup = document.getElementById('elimination-result-popup');
    const mrWhiteGuessSection = document.getElementById('mr-white-guess-section');
    const massPenaltyModal = document.getElementById('mass-penalty-modal');
    const winnerPopupModal = document.getElementById('winner-popup-modal');

    // --- NON-GAME-STATE OVERLAY MODALS ---
    const musicSettingsModal = document.getElementById('music-settings-modal');
    const peekPlayerSelectModal = document.getElementById('peek-player-select-modal');
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
    const closePopupBtn = document.querySelector('#winner-popup-modal .close-popup-btn'); // For winner popup
    const proceedToRoundScoresBtn = document.getElementById('proceed-to-round-scores-btn');
    const playNewRoundBtn = document.getElementById('play-new-round-btn');
    const finishGameShowFinalScoresBtn = document.getElementById('finish-game-show-final-scores-btn');
    const restartGameFullBtn = document.getElementById('restart-game-full-btn');
    const closeFinalScoreBtn = document.querySelector('#final-score-display-section .close-final-score-btn'); // For final score popup
    const restartFromFinalBtn = document.getElementById('restart-from-final-btn');
    const toggleMusicBtn = document.getElementById('toggle-music-btn');
    const openMusicSettingsBtn = document.getElementById('open-music-settings-btn');
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
    const showGuideBtn = document.getElementById('show-guide-btn');
    const closeGuideBtn = howToPlayModal.querySelector('.close-popup-btn');
    const shareResultsBtn = document.getElementById('share-results-btn');

    // --- NEW NAVIGATION BUTTONS ---
    const homeBtn = document.getElementById('home-btn');
    const backToConfigBtn = document.getElementById('back-to-config-btn');

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
    let eliminatedThisRoundPlayer = null; // Stored as object reference
    let currentWinningTeamType = null;
    let currentWinnerPlayerObjects = []; // Stored as object references
    let isInitialSetupPhase = true;
    let playerSelectedForElimination = null; // Stored as player name
    let playersAwaitingPenalty = []; // Stored as object references
    let customWordPacks = {};
    let currentWordList = [];
    let currentUser = null; // Menyimpan info user yg login

    // --- PERSISTENCE STATE VARIABLES ---
    let currentMainScreenId = 'initial-config-section'; // Tracks primary visible section
    let activeOverlayModalId = null; // Tracks which important modal (that should persist) is open

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
        saveGameState(); // Save state after auth attempt (might be needed for UI if auth changed)
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
        saveGameState(); // Save state after auth attempt (might be needed for UI if auth changed)
    };
    
    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error("Logout error:", error);
        }
        saveGameState(); // Save state after logout
    };

    const openAuthModal = () => {
        authModal.classList.remove('hidden');
        clearAuthErrors();
    };

    supabaseClient.auth.onAuthStateChange((event, session) => {
        const user = session?.user;
        if (user) {
            currentUser = user;
            authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
            authBtn.title = `Logout (${user.email})`;
            wordPackOwnerSpan.classList.remove('hidden');
            authModal.classList.add('hidden'); // Ensure auth modal is hidden after successful login
            authBtn.onclick = handleLogout;
        } else {
            currentUser = null;
            customWordPacks = {}; 
            authBtn.innerHTML = '<i class="fas fa-user-circle"></i>';
            authBtn.title = "Login/Daftar";
            wordPackOwnerSpan.classList.add('hidden');
            authBtn.onclick = openAuthModal;
        }
        loadWordPacks(); // Reload word packs based on auth status
        saveGameState(); // Save state after auth change
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
    function playMusic(src) { backgroundMusic.src = src; const playWhenReady = () => { if (audioContext && audioContext.state !== 'running') return; const playPromise = backgroundMusic.play(); if (playPromise !== undefined) { playPromise.then(() => { isMusicPlaying = true; musicManuallyPaused = false; toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; }).catch(error => { isMusicPlaying = false; musicManuallyPaused = true; toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>'; console.error("Gagal memutar musik:", error); }); } backgroundMusic.removeEventListener('canplaythrough', playWhenReady); }; backgroundMusic.addEventListener('canplaythrough', playWhenReady, { once: true }); saveGameState(); } // Save music state
    function playNextMusicTrack() { if (musicManuallyPaused || parseInt(musicSelection.value) !== -1) return; musicTrackIndex = (musicTrackIndex + 1) % backgroundMusicTracks.length; playMusic(backgroundMusicTracks[musicTrackIndex]); }
    function handleConfirmMusicClick() { const selectedValue = parseInt(musicSelection.value); musicTrackIndex = selectedValue; if (selectedValue === -1) { backgroundMusic.loop = false; playNextMusicTrack(); } else { backgroundMusic.loop = true; playMusic(backgroundMusicTracks[musicTrackIndex]); } saveGameState(); } // Save music state
    if (toggleMusicBtn && backgroundMusic) { toggleMusicBtn.addEventListener('click', () => { playClickSound(); resumeAudioContext(); if (!isMusicPlaying) { musicManuallyPaused = false; backgroundMusic.play().then(() => { isMusicPlaying = true; toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; }).catch(() => { isMusicPlaying = false; musicManuallyPaused = true; toggleMusicBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>'; }); } else { backgroundMusic.pause(); isMusicPlaying = false; musicManuallyPaused = true; toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>'; } saveGameState(); }); } // Save music state

    // --- EVENT LISTENERS ---
    homeBtn.addEventListener('click', () => {
        playClickSound();
        resetGameFull(); // This will clear sessionStorage and reset the game
    });

    backToConfigBtn.addEventListener('click', () => {
        playClickSound();
        resetGameFull(); // This effectively goes "back to config" and clears current game progress
    });

    showGuideBtn.addEventListener('click', () => { playClickSound(); howToPlayModal.classList.remove('hidden'); });
    closeGuideBtn.addEventListener('click', () => { playClickSound(); howToPlayModal.classList.add('hidden'); });
    openMusicSettingsBtn.addEventListener('click', () => { playClickSound(); musicSettingsModal.classList.remove('hidden'); });
    closeMusicSettingsBtn.addEventListener('click', () => { playClickSound(); musicSettingsModal.classList.add('hidden'); });
    confirmMusicBtn.addEventListener('click', () => { playClickSound(); handleConfirmMusicClick(); musicSettingsModal.classList.add('hidden'); });
    proceedToCardDistributionBtn.addEventListener('click', () => { playClickSound(); validateConfigAndProceed(); });
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
    if(closeFinalScoreBtn) closeFinalScoreBtn.addEventListener('click', () => { playClickSound(); hideGameStateModal(finalScoreDisplayModal); if(confettiAnimation) confettiAnimation.classList.add('hidden'); });
    restartFromFinalBtn.addEventListener('click', () => { playClickSound(); resetGameFull(); });
    peekCardBtn.addEventListener('click', () => { playClickSound(); openPeekSelectionModal(); });
    if(closePeekSelectModalBtn) closePeekSelectModalBtn.addEventListener('click', () => { playClickSound(); peekPlayerSelectModal.classList.add('hidden'); });
    confirmPeekBtn.addEventListener('click', () => { playClickSound(); handleConfirmPeek(); });
    closePeekViewBtn.addEventListener('click', () => { playClickSound(); hideGameStateModal(cardRevealModal); }); // For peeking mode
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
        saveGameState(); // Save state after config change
    });

    // Helper functions for screen management and persistence
    function hideAllMainSections() {
        const allMainSections = [initialConfigSection, playerNameInputSection, gameSection, roundOverSection, finalScoreDisplayModal];
        allMainSections.forEach(s => s.classList.add('hidden'));
    }

    function switchMainScreen(screenToShowElement) {
        hideAllMainSections();
        screenToShowElement.classList.remove('hidden');
        currentMainScreenId = screenToShowElement.id;
        activeOverlayModalId = null; // Assume no active overlay modal when switching main screen
        saveGameState();
    }

    // Function to show a game-state-relevant modal (e.g., card reveal, elimination results)
    function showGameStateModal(modalElement) {
        modalElement.classList.remove('hidden');
        activeOverlayModalId = modalElement.id;
        saveGameState();
    }

    // Function to hide a game-state-relevant modal
    function hideGameStateModal(modalElement) {
        modalElement.classList.add('hidden');
        if (activeOverlayModalId === modalElement.id) {
            activeOverlayModalId = null;
        }
        saveGameState();
    }

    // Function to save game state to sessionStorage
    function saveGameState() {
        const state = {
            players: players,
            configuredTotalPlayers: configuredTotalPlayers,
            currentPlayerIndex: currentPlayerIndex,
            civilianWord: civilianWord,
            undercoverWord: undercoverWord,
            gameInProgress: gameInProgress,
            isInitialSetupPhase: isInitialSetupPhase,
            musicTrackIndex: musicTrackIndex,
            isMusicPlaying: isMusicPlaying,
            musicManuallyPaused: musicManuallyPaused,
            rolesToDistribute: rolesToDistribute,
            selectedWordPackName: wordPackSelection.value,
            currentMainScreenId: currentMainScreenId,
            activeOverlayModalId: activeOverlayModalId,
            eliminatedPlayerNameThisRound: eliminatedThisRoundPlayer ? eliminatedThisRoundPlayer.name : null,
            playerSelectedForEliminationName: playerSelectedForElimination,
            currentWinningTeamType: currentWinningTeamType,
            currentWinnerPlayerNames: currentWinnerPlayerObjects.map(p => p.name),
            playersAwaitingPenaltyNames: playersAwaitingPenalty.map(p => p.name)
        };
        sessionStorage.setItem('ucHamdiGameState', JSON.stringify(state));
    }

    // Function to load game state from sessionStorage
    function loadGameState() {
        const savedState = sessionStorage.getItem('ucHamdiGameState');
        if (savedState) {
            const state = JSON.parse(savedState);

            players = state.players || [];
            configuredTotalPlayers = state.configuredTotalPlayers || 0;
            currentPlayerIndex = state.currentPlayerIndex || 0;
            civilianWord = state.civilianWord || "";
            undercoverWord = state.undercoverWord || "";
            gameInProgress = state.gameInProgress !== undefined ? state.gameInProgress : true;
            isInitialSetupPhase = state.isInitialSetupPhase !== undefined ? state.isInitialSetupPhase : true;
            musicTrackIndex = state.musicTrackIndex !== undefined ? state.musicTrackIndex : 0;
            isMusicPlaying = state.isMusicPlaying !== undefined ? state.isMusicPlaying : false;
            musicManuallyPaused = state.musicManuallyPaused !== undefined ? state.musicManuallyPaused : true;
            rolesToDistribute = state.rolesToDistribute || [];
            
            // Set word pack selection first
            const savedWordPackSelection = state.selectedWordPackName || 'default';
            // Ensure the option exists before setting value
            if (wordPackSelection.querySelector(`option[value="${savedWordPackSelection}"]`)) {
                wordPackSelection.value = savedWordPackSelection;
            } else {
                wordPackSelection.value = 'default'; // Fallback if saved pack doesn't exist
            }
            // Load current word list based on selected pack
            if (wordPackSelection.value === 'default') { currentWordList = defaultWordPairs; }
            else { currentWordList = customWordPacks[wordPackSelection.value] || []; }

            currentMainScreenId = state.currentMainScreenId || 'initial-config-section';
            activeOverlayModalId = state.activeOverlayModalId || null;

            // Re-find player objects based on names/IDs
            playerSelectedForElimination = state.playerSelectedForEliminationName || null;
            eliminatedThisRoundPlayer = state.eliminatedPlayerNameThisRound ? players.find(p => p.name === state.eliminatedPlayerNameThisRound) : null;
            currentWinningTeamType = state.currentWinningTeamType || null;
            currentWinnerPlayerObjects = state.currentWinnerPlayerNames ? players.filter(p => state.currentWinnerPlayerNames.includes(p.name)) : [];
            playersAwaitingPenalty = state.playersAwaitingPenaltyNames ? players.filter(p => state.playersAwaitingPenaltyNames.includes(p.name)) : [];
            
            // Restore UI based on loaded state
            const allElements = [
                initialConfigSection, playerNameInputSection, gameSection, roundOverSection, finalScoreDisplayModal,
                cardRevealModal, eliminationResultPopup, mrWhiteGuessSection, massPenaltyModal, winnerPopupModal,
                musicSettingsModal, peekPlayerSelectModal, howToPlayModal, wordPackManagerModal, authModal
            ];
            allElements.forEach(el => el.classList.add('hidden')); // Hide everything initially

            const mainScreenElement = document.getElementById(currentMainScreenId);
            if (mainScreenElement) {
                mainScreenElement.classList.remove('hidden');
            }

            if (activeOverlayModalId) {
                const activeModalElement = document.getElementById(activeOverlayModalId);
                if (activeModalElement) {
                    activeModalElement.classList.remove('hidden');
                }
            }

            // Specific re-rendering for each section
            if (currentMainScreenId === 'initial-config-section') {
                totalPlayersConfigInput.value = configuredTotalPlayers;
                // If players array is populated, use that for counts, otherwise use initial setup values
                civiliansConfigInput.value = players.filter(p => p.originalRole === 'Civilian').length || initialCiviliansCount;
                undercoversConfigInput.value = players.filter(p => p.originalRole === 'Undercover').length || initialUndercoversCount;
                mrWhitesConfigInput.value = players.filter(p => p.originalRole === 'Mr. White').length || initialMrWhitesCount;
            } else if (currentMainScreenId === 'player-name-input-section') {
                prepareForNextPlayerNameInput(); // Will update title based on currentPlayerIndex
            } else if (currentMainScreenId === 'game-section') {
                startGamePlay(); // Will update player list and other game UI
            } else if (currentMainScreenId === 'round-over-section') {
                displayRoundOverDetails();
            } else if (currentMainScreenId === 'final-score-display-section') {
                showFinalScoreboard(); // This populates the table
            }

            // Restore content of modals if they were active
            if (activeOverlayModalId === 'card-reveal-modal') {
                // If it was during initial setup phase, restore current player's card
                if (isInitialSetupPhase && currentPlayerIndex < configuredTotalPlayers) {
                     const p = players[currentPlayerIndex];
                     if (p) showRoleOnCard(p.name, p.role, p.word);
                 } else if (!isInitialSetupPhase) { // If not initial setup, means it was a peek. Cannot restore which player was peeked.
                     hideGameStateModal(cardRevealModal); // Best to hide and let user re-peek
                 }
            } else if (activeOverlayModalId === 'elimination-result-popup') {
                if (eliminatedThisRoundPlayer) {
                    eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-skull-crossbones"></i> ${eliminatedThisRoundPlayer.name} (Peran: ${eliminatedThisRoundPlayer.role}) telah tereliminasi.`;
                    // Reset truth/dare buttons state if penalty was mid-process
                }
            } else if (activeOverlayModalId === 'mr-white-guess-section') {
                if (eliminatedThisRoundPlayer) {
                    mrWhiteNameGuessStrong.textContent = eliminatedThisRoundPlayer.name;
                }
            } else if (activeOverlayModalId === 'mass-penalty-modal') {
                processNextPenalty(); // Re-trigger penalty display
            } else if (activeOverlayModalId === 'winner-popup-modal') {
                announceWinner(currentWinningTeamType, currentWinnerPlayerObjects); // Re-announce winner
            }

            // Restore music state
            if (isMusicPlaying && !musicManuallyPaused) {
                backgroundMusic.src = backgroundMusicTracks[musicTrackIndex];
                backgroundMusic.play().then(() => {
                    toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }).catch(error => {
                    console.warn("Failed to auto-play music on load:", error);
                    isMusicPlaying = false;
                    musicManuallyPaused = true;
                    toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>';
                });
            } else {
                toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>';
            }

            console.log("Game state loaded.");
            return true; // Indicate state was loaded
        }
        return false; // Indicate no state was loaded
    }

    function resetGameFull() {
        sessionStorage.removeItem('ucHamdiGameState'); // Clear saved state on full reset
        isInitialSetupPhase = true; players = []; configuredTotalPlayers = 0; rolesToDistribute = []; currentPlayerIndex = 0;
        initialCiviliansCount = 0; initialUndercoversCount = 0; initialMrWhitesCount = 0;
        civilianWord = ""; undercoverWord = ""; gameInProgress = true; eliminatedThisRoundPlayer = null;
        currentWinningTeamType = null; currentWinnerPlayerObjects = []; playerSelectedForElimination = null; playersAwaitingPenalty = [];
        currentMainScreenId = 'initial-config-section'; // Reset current screen
        activeOverlayModalId = null; // Reset active modal

        if (isMusicPlaying) { backgroundMusic.pause(); isMusicPlaying = false; musicManuallyPaused = true; toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>'; }
        musicSelection.value = "0"; totalPlayersConfigInput.value = "5"; civiliansConfigInput.value = "3";
        undercoversConfigInput.value = "1"; mrWhitesConfigInput.value = "1";
        configErrorP.classList.add('hidden'); configErrorP.textContent = '';

        // Hide all sections and show initial config
        const allElementsToHide = [
            playerNameInputSection, gameSection, mrWhiteGuessSection, eliminationResultPopup, winnerPopupModal, roundOverSection, 
            finalScoreDisplayModal, cardRevealModal, musicSettingsModal, peekPlayerSelectModal, massPenaltyModal, 
            howToPlayModal, wordPackManagerModal, authModal
        ];
        allElementsToHide.forEach(s => { if(s) s.classList.add('hidden'); });
        initialConfigSection.classList.remove('hidden');

        resetTruthOrDareButtons(); if(debugCivilianWordP) debugCivilianWordP.style.display = 'none';
        if(activePlayerListUl) activePlayerListUl.innerHTML = ''; if(playerToEliminateDisplay) playerToEliminateDisplay.textContent = "Belum ada";
        if(confirmEliminationBtn) confirmEliminationBtn.disabled = true; if(roundRolesListUl) roundRolesListUl.innerHTML = '';
        if(finalCumulativeScoresTbody) finalCumulativeScoresTbody.innerHTML = ''; if(confettiAnimation) confettiAnimation.classList.add('hidden');
        loadWordPacks(); // Reload word packs after full reset (important for user's custom packs)
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
        if (!isMusicPlaying && musicManuallyPaused) {
            musicManuallyPaused = false;
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) { playPromise.then(() => { isMusicPlaying = true; toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; }).catch(error => { console.error("Pemutaran otomatis gagal:", error); musicManuallyPaused = true; isMusicPlaying = false; toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>'; }); }
        }
        configuredTotalPlayers = total; initialCiviliansCount = civ; initialUndercoversCount = uc; initialMrWhitesCount = mw;
        generateRolesToDistribute(); selectNewWordPair();
        players = []; currentPlayerIndex = 0; isInitialSetupPhase = true;
        gameInProgress = true; currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        
        switchMainScreen(playerNameInputSection); // Changed to switchMainScreen
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
        
        // No switchMainScreen here, we just show the card modal on top
        showGameStateModal(cardRevealModal); // Changed to showGameStateModal
        showRoleOnCard(playerName, assignedRole, assignedWord);
    }

    function prepareNewRoundRoleReveal() {
        const currentPlayer = players[currentPlayerIndex];
        const assignedRole = rolesToDistribute[currentPlayerIndex];
        currentPlayer.role = assignedRole;
        currentPlayer.word = (assignedRole === "Civilian") ? civilianWord : (assignedRole === "Undercover") ? undercoverWord : "Anda tidak punya kata. Amati!";
        showGameStateModal(cardRevealModal); // Changed to showGameStateModal
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
        cardRevealModal.classList.remove('hidden'); // Ensure it's visible after content update
        // No saveGameState here, as it's called by showGameStateModal
    }

    function handleCardFlip() { if (!roleCardElement.classList.contains('is-flipped')) { roleCardElement.classList.add('is-flipped'); hideCardAndProceedBtn.classList.remove('hidden'); } }
    
    function handleProceedAfterCardView() { // This function is ONLY for initial card distribution flow
        roleCardElement.classList.remove('is-flipped');
        setTimeout(() => {
            hideGameStateModal(cardRevealModal); // Hide the card reveal modal
            currentPlayerIndex++;
            if (currentPlayerIndex < configuredTotalPlayers) {
                switchMainScreen(playerNameInputSection); // Go to next player name input
                prepareForNextPlayerNameInput();
            } else {
                isInitialSetupPhase = false;
                switchMainScreen(gameSection); // Go to game section
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
        saveGameState(); // Save state after game starts
    }

    function startNewRoundWithSameTeam() {
        isInitialSetupPhase = false; generateRolesToDistribute(); selectNewWordPair();
        currentPlayerIndex = 0;
        switchMainScreen(initialConfigSection); // Go back to config to allow player re-entry or role adjustment
        hideGameStateModal(winnerPopupModal); // Ensure winner modal is hidden
        hideAllMainSections(); // Hide everything first
        prepareNewRoundRoleReveal(); // This will show the card reveal modal for the first player of the new round
        saveGameState(); // Save state after starting new round
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
        saveGameState(); // Save state after player list update (e.g., selection)
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
        saveGameState(); // Save state after selection
    }

    function handleConfirmElimination() {
        if (!playerSelectedForElimination) { alert("Pilih pemain yang akan dieliminasi."); return; }
        eliminatedThisRoundPlayer = players.find(p => p.name === playerSelectedForElimination);
        if (!eliminatedThisRoundPlayer) return;
        eliminatedThisRoundPlayer.isEliminated = true;
        if (eliminatedThisRoundPlayer.role === "Civilian") { playLoseSound(); } else if (eliminatedThisRoundPlayer.role === "Undercover") { playWinSound(); }
        document.getElementById('voting-phase').classList.add('hidden'); // Hide voting phase on main game screen

        if (eliminatedThisRoundPlayer.role === "Mr. White") {
            showGameStateModal(mrWhiteGuessSection); // Changed to showGameStateModal
            mrWhiteNameGuessStrong.textContent = eliminatedThisRoundPlayer.name;
        } else {
            eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-skull-crossbones"></i> ${eliminatedThisRoundPlayer.name} (Peran: ${eliminatedThisRoundPlayer.role}) telah tereliminasi.`;
            resetTruthOrDareButtons();
            showGameStateModal(eliminationResultPopup); // Changed to showGameStateModal
        }
        playerSelectedForElimination = null; playerToEliminateDisplay.textContent = "Belum ada";
        confirmEliminationBtn.disabled = true; updateActivePlayerListWithAvatars();
        saveGameState(); // Save state after elimination
    }

    function handleCloseEliminationPopup() {
        hideGameStateModal(eliminationResultPopup); // Changed to hideGameStateModal
        resetTruthOrDareButtons();
        checkWinConditionsAndProceed();
        saveGameState(); // Save state after closing popup
    }

    function handleMrWhiteGuess() {
        const guess = mrWhiteWordGuessInput.value.trim();
        hideGameStateModal(mrWhiteGuessSection); // Changed to hideGameStateModal
        mrWhiteWordGuessInput.value = '';
        if (guess.toLowerCase() === civilianWord.toLowerCase()) {
            playWinSound();
            currentWinningTeamType = "MR_WHITE_GUESS";
            currentWinnerPlayerObjects = [eliminatedThisRoundPlayer];
            gameInProgress = false;
            playersAwaitingPenalty = players.filter(p => p.isEliminated === false && p.name !== eliminatedThisRoundPlayer.name);
            if (playersAwaitingPenalty.length > 0) {
                showGameStateModal(massPenaltyModal); // Changed to showGameStateModal
                processNextPenalty();
            } else {
                announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
            }
        } else {
            playLoseSound();
            eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-times-circle"></i> ${eliminatedThisRoundPlayer.name} (Mr. White) gagal menebak dan tereliminasi.`;
            resetTruthOrDareButtons();
            showGameStateModal(eliminationResultPopup); // Changed to showGameStateModal
        }
        saveGameState(); // Save state after guess
    }

    function processNextPenalty() {
        const nextPlayer = playersAwaitingPenalty.shift();
        if (nextPlayer) {
            massPenaltyPlayerName.textContent = nextPlayer.name;
            massPenaltyDisplay.classList.add('hidden');
            massTruthBtn.disabled = false; massDareBtn.disabled = false;
            massPenaltyNextBtn.classList.add('hidden');
        } else {
            hideGameStateModal(massPenaltyModal); // Changed to hideGameStateModal
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
        }
        saveGameState(); // Save state after processing penalty
    }

    function applyMassPenalty(type) {
        let item = (type === 'truth') ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        massPenaltyText.innerHTML = (type === 'truth') ? `<i class="fas fa-check-circle"></i> <strong>TRUTH:</strong> ${item}` : `<i class="fas fa-fire"></i> <strong>DARE:</strong> ${item}`;
        massPenaltyDisplay.classList.remove('hidden');
        massTruthBtn.disabled = true; massDareBtn.disabled = true;
        massPenaltyNextBtn.classList.remove('hidden');
        massPenaltyNextBtn.innerHTML = (playersAwaitingPenalty.length === 0) ? '<i class="fas fa-flag-checkered"></i> Selesaikan Babak' : '<i class="fas fa-arrow-right"></i> Lanjut ke Pemain Berikutnya';
        saveGameState(); // Save state after applying mass penalty
    }

    // =========================================================
    // =========== CORE WIN CONDITION LOGIC (FIXED) ============
    // =========================================================
    function checkWinConditionsAndProceed() {
        // If pemenang sudah ditentukan (misal Mr. White menebak benar), langsung umumkan.
        if (!gameInProgress && currentWinningTeamType) {
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
            return;
        }

        // Jika permainan tidak sedang berlangsung, hentikan.
        if (!gameInProgress) return;

        // Ambil data pemain yang masih aktif (belum tereliminasi)
        const activePlayers = players.filter(p => !p.isEliminated);
        const activeCivilians = activePlayers.filter(p => p.role === 'Civilian');
        const activeUndercovers = activePlayers.filter(p => p.role === 'Undercover');
        const activeMrWhite = activePlayers.filter(p => p.role === 'Mr. White');

        let winDetected = false;
        let determinedWinType = "";
        let determinedWinners = [];

        // PENJELASAN: Logika baru untuk menghukum Civilian terakhir
        // Jika tidak ada lagi Civilian yang aktif DAN pemain yang baru saja dieliminasi adalah seorang Civilian.
        if (activeCivilians.length === 0 && eliminatedThisRoundPlayer?.originalRole === 'Civilian') {
            gameInProgress = false; // Tandai game sudah berakhir
            // Tim Undercover & Mr. White yang tersisa adalah pemenangnya
            determinedWinType = "UC_MW_SURVIVAL"; 
            determinedWinners = activePlayers;
            currentWinningTeamType = determinedWinType;
            currentWinnerPlayerObjects = determinedWinners;
            
            // Tampilkan popup hukuman untuk Civilian terakhir terlebih dahulu
            document.getElementById('voting-phase').classList.add('hidden');
            eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-skull-crossbones"></i> ${eliminatedThisRoundPlayer.name} (Civilian Terakhir) telah tereliminasi!`;
            resetTruthOrDareButtons();
            showGameStateModal(eliminationResultPopup); // Changed to showGameStateModal
            
            // Hentikan fungsi di sini. Pemenang akan diumumkan setelah popup hukuman ditutup.
            return; 
        }

        // Kondisi Kemenangan Tim Civilian:
        // Jika sudah tidak ada Undercover DAN Mr. White yang aktif.
        if (activeUndercovers.length === 0 && activeMrWhite.length === 0) {
            winDetected = true;
            determinedWinType = "CIVILIAN_TEAM";
            // Pemenangnya adalah SEMUA pemain yang peran aslinya Civilian (baik yang selamat maupun tidak)
            determinedWinners = players.filter(p => p.originalRole === 'Civilian'); 
        } 
        // PERBAIKAN UTAMA: Kondisi Kemenangan Tim Undercover & Mr. White:
        // Hanya jika sudah TIDAK ADA LAGI Civilian yang tersisa.
        else if (activeCivilians.length === 0) {
            winDetected = true;
            determinedWinners = activePlayers; // Pemenangnya adalah semua yang masih bertahan
            
            const survivingUndercovers = activePlayers.filter(p => p.role === 'Undercover');
            const survivingMrWhite = activePlayers.filter(p => p.role === 'Mr. White');

            if (survivingUndercovers.length > 0 && survivingMrWhite.length > 0) {
                determinedWinType = "UC_MW_SURVIVAL";
            } else if (survivingUndercovers.length > 0) {
                determinedWinType = "UC_SURVIVAL";
            } else if (survivingMrWhite.length > 0) {
                determinedWinType = "MW_SURVIVAL";
            }
        }

        // Jika ada kondisi kemenangan yang terdeteksi
        if (winDetected) {
            gameInProgress = false;
            currentWinningTeamType = determinedWinType;
            currentWinnerPlayerObjects = determinedWinners;
            if (determinedWinType !== "NO_WINNER_DRAW") playWinSound();
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
        } else {
            // Jika tidak ada yang menang, lanjutkan permainan ke ronde berikutnya
            updateActivePlayerListWithAvatars();
            document.getElementById('voting-phase').classList.remove('hidden');
            playerSelectedForElimination = null;
            playerToEliminateDisplay.textContent = "Belum ada";
            confirmEliminationBtn.disabled = true;
            resetTruthOrDareButtons();
            // No hideGameStateModal here, as eliminationResultPopup might not be active, and we are just proceeding.
        }
        saveGameState(); // Save state after checking win conditions
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
        showGameStateModal(winnerPopupModal); // Changed to showGameStateModal
        // No switchMainScreen here, as winner popup is an overlay
        saveGameState(); // Save state after announcing winner
    }

    function closeWinnerPopupAndShowRoundScores() { 
        hideGameStateModal(winnerPopupModal); // Changed to hideGameStateModal
        if (confettiAnimation) confettiAnimation.classList.add('hidden'); 
        switchMainScreen(roundOverSection); // Changed to switchMainScreen
        displayRoundOverDetails(); 
        saveGameState(); // Save state after showing round scores
    }

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
        saveGameState(); // Save state after displaying round details
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
        saveGameState(); // Save state after calculating scores
    }

    function showFinalScoreboard() {
        switchMainScreen(finalScoreDisplayModal); // Changed to switchMainScreen
        hideGameStateModal(winnerPopupModal); // Ensure winner popup is hidden if navigated from there
        if (confettiAnimation) confettiAnimation.classList.add('hidden');
        finalCumulativeScoresTbody.innerHTML = ''; 
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        sortedPlayers.forEach((player, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td data-label="Peringkat">#${index + 1}</td> <td data-label="Nama Pemain">${player.name}</td> <td data-label="Peran Asli">${player.originalRole}</td> <td data-label="Total Skor" class="score-value">${player.score} Poin</td>`;
            finalCumulativeScoresTbody.appendChild(tr);
        });
        saveGameState(); // Save state after showing scoreboard
    }

    function applyPenalty(type) {
        let item = (type === 'truth') ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        penaltyTextP.innerHTML = (type === 'truth') ? `<i class="fas fa-check-circle"></i> <strong>TRUTH:</strong> ${item}` : `<i class="fas fa-fire"></i> <strong>DARE:</strong> ${item}`;
        penaltyDisplayDiv.classList.remove('hidden'); truthBtn.disabled = true; dareBtn.disabled = true;
        if (type === 'truth') { truthBtn.classList.add('selected'); } else { dareBtn.classList.add('selected'); }
        closeEliminationPopupBtn.classList.remove('hidden', 'btn-secondary'); closeEliminationPopupBtn.classList.add('btn-primary');
        saveGameState(); // Save state after applying penalty
    }

    function resetTruthOrDareButtons() {
        if(truthBtn) { truthBtn.disabled = false; truthBtn.classList.remove('selected'); }
        if(dareBtn) { dareBtn.disabled = false; dareBtn.classList.remove('selected'); }
        if(penaltyDisplayDiv) penaltyDisplayDiv.classList.add('hidden'); 
        if(penaltyTextP) penaltyTextP.textContent = '';
        if(closeEliminationPopupBtn) { closeEliminationPopupBtn.classList.add('hidden', 'btn-secondary'); closeEliminationPopupBtn.classList.remove('btn-primary'); }
        // No saveGameState here, as this is usually followed by another action that saves
    }

    // --- WORD PACK MANAGEMENT (MODIFIED FOR SUPABASE) ---
    async function loadWordPacks() {
        if (currentUser) {
            const { data, error } = await supabaseClient
                .from('wordPacks')
                .select('packs')
                .eq('user_id', currentUser.id)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 means "no rows found"
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
        saveGameState(); // Save state after word packs are loaded
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
        // No saveGameState here, as this is typically called by a UI action that already triggers saveGameState
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
        if (customWordPacks[selectedGamePack] || selectedGamePack === 'default') {
            wordPackSelection.value = selectedGamePack;
        } else {
            wordPackSelection.value = 'default'; // Fallback
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

    // --- CORE GAME LOGIC ---
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
        showGameStateModal(cardRevealModal); // Show modal and save its state
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
    }


    // --- INITIALIZE GAME ---
    // Initial Supabase auth check (moved up to ensure currentUser is set)
    const { data: { session } } = await supabaseClient.auth.getSession();
    const user = session?.user;
    if (user) {
        currentUser = user;
        authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        authBtn.title = `Logout (${user.email})`;
        wordPackOwnerSpan.classList.remove('hidden');
        authBtn.onclick = handleLogout;
    } else {
        currentUser = null;
        wordPackOwnerSpan.classList.add('hidden');
        authBtn.onclick = openAuthModal;
    }
    await loadWordPacks(); // Load word packs after user status is known

    // Now try to load game state
    const savedStateExists = loadGameState();
    if (!savedStateExists) {
        resetGameFull(); // Only call if no saved state was found and loaded
    }
});