document.addEventListener('DOMContentLoaded', async () => {
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
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    const updatePasswordModal = document.getElementById('update-password-modal');

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
    const showForgotPasswordLink = document.getElementById('show-forgot-password-link');
    const forgotPasswordEmailInput = document.getElementById('forgot-password-email');
    const sendResetLinkBtn = document.getElementById('send-reset-link-btn');
    const forgotPasswordErrorP = document.getElementById('forgot-password-error');
    const closeForgotPasswordModalBtn = forgotPasswordModal ? forgotPasswordModal.querySelector('.close-popup-btn') : null; 
    const updatePasswordInput = document.getElementById('update-password-input');
    const updatePasswordBtn = document.getElementById('update-password-btn');
    const updatePasswordErrorP = document.getElementById('update-password-error');


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
    let isMrWhiteFinalDuel = false; 

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

    // Flag to indicate if we are in the password reset flow
    let isPasswordResetFlow = false;

    // --- CRITICAL: Handle password reset from URL immediately upon DOMContentLoaded ---
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    const accessToken = urlParams.get('access_token');

    if (typeParam === 'recovery' && accessToken) {
        isPasswordResetFlow = true;
        
        // Attempt to clear any existing session to prevent automatic login
        // This is crucial. Wait for signOut to complete.
        await supabaseClient.auth.signOut(); 
        
        // Hide all game/main UI elements and show only the update password modal
        // Ensure all modals are hidden except updatePasswordModal
        const allMainSections = [
            initialConfigSection, playerNameInputSection, gameSection, mrWhiteGuessSection, 
            eliminationResultPopup, winnerPopupModal, roundOverSection, finalScoreDisplayModal, 
            cardRevealModal, musicSettingsModal, peekPlayerSelectModal, massPenaltyModal, 
            howToPlayModal, wordPackManagerModal, authModal, forgotPasswordModal
        ];
        allMainSections.forEach(section => {
            if (section) section.classList.add('hidden');
        });
        
        if (updatePasswordModal) { // Ensure modal exists before trying to show it
            updatePasswordModal.classList.remove('hidden'); // Show the update password modal
        } else {
            console.error("updatePasswordModal element not found!");
            // Fallback: alert user or redirect to main login page if modal is missing
            alert("Terjadi kesalahan. Silakan coba reset password lagi dari halaman utama.");
            window.location.href = window.location.origin; // Redirect to clean URL
            return;
        }

        // Clean the URL parameters to prevent re-triggering this logic on refresh
        // Important to do this AFTER reading the token, but BEFORE Supabase processes it automatically.
        history.replaceState(null, '', window.location.origin + window.location.pathname);
        
        // Explicitly set the session with the token from the URL.
        // This makes sure Supabase knows the user is authenticated for this purpose
        // without necessarily triggering the full 'SIGNED_IN' flow that hides modals immediately.
        try {
            const { data, error } = await supabaseClient.auth.setSession({ access_token: accessToken });
            if (error) throw error;
        } catch (e) {
            console.error("Error setting session for recovery:", e);
            if (updatePasswordErrorP) {
                updatePasswordErrorP.textContent = "Gagal memuat sesi reset. Tautan mungkin tidak valid atau sudah kedaluwarsa.";
                updatePasswordErrorP.classList.remove('hidden');
            }
            // If session fails, display error message within the modal and option to go to login
            if (updatePasswordModal) {
                updatePasswordModal.innerHTML = `<div class="modal-content">
                    <span class="close-popup-btn">&times;</span>
                    <h2><i class="fas fa-exclamation-circle" style="color:var(--theme-error);"></i> Gagal Reset Password</h2>
                    <p style="text-align:center; color: var(--theme-error);">
                        Tautan reset password tidak valid atau sudah kedaluwarsa.<br>
                        Silakan coba lagi dari awal.
                    </p>
                    <button id="goToLoginFromUpdateBtn" class="btn-primary">Kembali ke Login</button>
                </div>`;
                const goToLoginFromUpdateBtn = document.getElementById('goToLoginFromUpdateBtn');
                if (goToLoginFromUpdateBtn) goToLoginFromUpdateBtn.addEventListener('click', () => {
                    playClickSound();
                    updatePasswordModal.classList.add('hidden');
                    openAuthModal();
                });
                const closeModalBtn = updatePasswordModal.querySelector('.close-popup-btn');
                if (closeModalBtn) closeModalBtn.addEventListener('click', () => {
                    playClickSound();
                    updatePasswordModal.classList.add('hidden');
                    openAuthModal();
                });
            }
            return; // Stop further execution if session setup fails
        }

        if (updatePasswordInput) updatePasswordInput.focus();
        return; // Important: Exit here to prevent other DOMContentLoaded logic from running on recovery
    }

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
        if (errorElement) { // Check if element exists before modifying
            errorElement.textContent = friendlyMessage;
            errorElement.classList.remove('hidden');
        }
    };

    const clearAuthErrors = () => {
        if (loginErrorP) loginErrorP.classList.add('hidden');
        if (registerErrorP) registerErrorP.classList.add('hidden');
        if (forgotPasswordErrorP) forgotPasswordErrorP.classList.add('hidden');
        if (updatePasswordErrorP) updatePasswordErrorP.classList.add('hidden');
    };

    const handleRegister = async () => {
        const email = registerEmailInput.value;
        const password = registerPasswordInput.value;
        clearAuthErrors();
        
        const { data, error } = await supabaseClient.auth.signUp({ 
            email, 
            password,
            options: {
                emailRedirectTo: window.location.origin 
            }
        });
        
        if (error) {
            showAuthError('register', error.message);
        } else {
            if (registerView) { // Check if element exists
                registerView.innerHTML = `<p style="text-align:center; color: var(--theme-text-primary);">
                    <i class="fas fa-paper-plane" style="font-size: 1.5em; color: var(--theme-primary);"></i><br><br>
                    Pendaftaran hampir selesai!<br>
                    <strong>Silakan cek kotak masuk email Anda untuk link verifikasi sebelum bisa login.</strong>
                </p>`;
            }
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
            if (authModal) authModal.classList.add('hidden');
        }
    };
    
    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error("Logout error:", error);
        }
    };

    const openAuthModal = () => {
        if (authModal) authModal.classList.remove('hidden');
        clearAuthErrors();
        if (loginView) loginView.classList.remove('hidden'); 
        if (registerView) registerView.classList.add('hidden'); 
        if (forgotPasswordModal) forgotPasswordModal.classList.add('hidden'); 
        if (updatePasswordModal) updatePasswordModal.classList.add('hidden'); 
    };

    // Handle password reset request
    if(sendResetLinkBtn) {
        sendResetLinkBtn.addEventListener('click', async () => {
            playClickSound();
            const email = forgotPasswordEmailInput.value.trim();
            if (forgotPasswordErrorP) forgotPasswordErrorP.classList.add('hidden');

            if (!email) {
                if (forgotPasswordErrorP) {
                    forgotPasswordErrorP.textContent = "Email tidak boleh kosong.";
                    forgotPasswordErrorP.classList.remove('hidden');
                }
                return;
            }

            const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/reset-password.html' 
            });

            if (error) {
                if (forgotPasswordErrorP) {
                    forgotPasswordErrorP.textContent = error.message;
                    forgotPasswordErrorP.classList.remove('hidden');
                }
            } else {
                if (forgotPasswordModal) { // Check if element exists
                    forgotPasswordModal.innerHTML = `<p style="text-align:center; color: var(--theme-text-primary);">
                        <i class="fas fa-check-circle" style="font-size: 1.5em; color: var(--theme-primary);"></i><br><br>
                        Link reset password telah dikirim ke<br><strong>${email}</strong>.<br>
                        Silakan cek kotak masuk email Anda.
                    </p>`;
                }
            }
        });
    }

    // Handle update password
    if(updatePasswordBtn) {
        updatePasswordBtn.addEventListener('click', async () => {
            playClickSound();
            const newPassword = updatePasswordInput.value.trim();
            if (updatePasswordErrorP) updatePasswordErrorP.classList.add('hidden');

            if (!newPassword || newPassword.length < 6) {
                if (updatePasswordErrorP) {
                    updatePasswordErrorP.textContent = "Password minimal 6 karakter.";
                    updatePasswordErrorP.classList.remove('hidden');
                }
                return;
            }
            
            const { error } = await supabaseClient.auth.updateUser({
                password: newPassword
            });

            if (error) {
                if (updatePasswordErrorP) {
                    updatePasswordErrorP.textContent = error.message;
                    updatePasswordErrorP.classList.remove('hidden');
                }
            } else {
                if (updatePasswordModal) { // Check if element exists
                    updatePasswordModal.innerHTML = `<p style="text-align:center; color: var(--theme-text-primary);">
                        <i class="fas fa-check-circle" style="font-size: 1.5em; color: var(--theme-primary);"></i><br><br>
                        Password Anda berhasil direset.<br>
                        Anda sekarang dapat login dengan password baru.
                    </p>
                    <button id="goToLoginFromUpdateBtn" class="btn-primary">Kembali ke Login</button>`;

                    const goToLoginFromUpdateBtn = document.getElementById('goToLoginFromUpdateBtn');
                    if (goToLoginFromUpdateBtn) goToLoginFromUpdateBtn.addEventListener('click', () => {
                        playClickSound();
                        updatePasswordModal.classList.add('hidden');
                        openAuthModal(); 
                    });
                }
                isPasswordResetFlow = false; // Reset the flag after successful update
            }
        });
    }

    // MODIFIED: Simplified onAuthStateChange for better clarity and less conflict
    supabaseClient.auth.onAuthStateChange((event, session) => {
        // Only proceed with standard UI updates if NOT in the password reset flow
        // and the updatePasswordModal is NOT currently visible.
        if (isPasswordResetFlow && updatePasswordModal && !updatePasswordModal.classList.contains('hidden')) {
            currentUser = session?.user; // Keep currentUser updated
            if (authBtn) {
                authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
                authBtn.title = `Logout (${currentUser ? currentUser.email : 'Loading...'})`;
                authBtn.onclick = handleLogout;
            }
            if (wordPackOwnerSpan) wordPackOwnerSpan.classList.remove('hidden');
            loadWordPacks(); // Load packs if a user is now authenticated
            return; // Crucially, exit to prevent standard auth logic from interfering
        }

        const user = session?.user;
        if (user) {
            currentUser = user;
            if (authBtn) {
                authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
                authBtn.title = `Logout (${user.email})`;
                authBtn.onclick = handleLogout;
            }
            if (wordPackOwnerSpan) wordPackOwnerSpan.classList.remove('hidden');
            if (authModal) authModal.classList.add('hidden'); // Hide auth modal for regular login
        } else {
            currentUser = null;
            customWordPacks = {}; 
            if (authBtn) {
                authBtn.innerHTML = '<i class="fas fa-user-circle"></i>';
                authBtn.title = "Login/Daftar";
                authBtn.onclick = openAuthModal;
            }
            if (wordPackOwnerSpan) wordPackOwnerSpan.classList.add('hidden');
        }
        loadWordPacks();
    });

    // Setup event listeners for Auth Modal
    if (closeAuthModalBtn) closeAuthModalBtn.addEventListener('click', () => authModal.classList.add('hidden'));
    if (loginBtn) loginBtn.addEventListener('click', handleLogin);
    if (registerBtn) registerBtn.addEventListener('click', handleRegister);
    if (showRegisterLink) showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginView) loginView.classList.add('hidden');
        if (registerView) registerView.classList.remove('hidden');
        clearAuthErrors();
    });
    if (showLoginLink) showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (registerView) registerView.classList.add('hidden');
        if (loginView) loginView.classList.remove('hidden');
        clearAuthErrors();
    });
    // Event listener for "Lupa Password?" link
    if(showForgotPasswordLink) {
        showForgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            playClickSound();
            if (authModal) authModal.classList.add('hidden');
            if (forgotPasswordModal) forgotPasswordModal.classList.remove('hidden');
            if (forgotPasswordEmailInput) forgotPasswordEmailInput.value = '';
            if (forgotPasswordErrorP) forgotPasswordErrorP.classList.add('hidden');
        });
    }
    // Close button for forgot password modal
    if(closeForgotPasswordModalBtn) {
        closeForgotPasswordModalBtn.addEventListener('click', () => {
            playClickSound();
            if (forgotPasswordModal) forgotPasswordModal.classList.add('hidden');
        });
    }
    // Close button for update password modal
    if(updatePasswordModal && updatePasswordModal.querySelector('.close-popup-btn')) {
        updatePasswordModal.querySelector('.close-popup-btn').addEventListener('click', () => {
            playClickSound();
            if (updatePasswordModal) updatePasswordModal.classList.add('hidden');
            isPasswordResetFlow = false; // Reset the flag
            openAuthModal(); // After closing reset password, go back to login form
        });
    }
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
    function playMusic(src) { if (!backgroundMusic) return; backgroundMusic.src = src; const playWhenReady = () => { if (audioContext && audioContext.state !== 'running') return; const playPromise = backgroundMusic.play(); if (playPromise !== undefined) { playPromise.then(() => { isMusicPlaying = true; musicManuallyPaused = false; if (toggleMusicBtn) toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; }).catch(error => { isMusicPlaying = false; musicManuallyPaused = true; if (toggleMusicBtn) toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>'; console.error("Gagal memutar musik:", error); }); } backgroundMusic.removeEventListener('canplaythrough', playWhenReady); }; backgroundMusic.addEventListener('canplaythrough', playWhenReady, { once: true }); }
    function playNextMusicTrack() { if (musicManuallyPaused || parseInt(musicSelection.value) !== -1) return; musicTrackIndex = (musicTrackIndex + 1) % backgroundMusicTracks.length; playMusic(backgroundMusicTracks[musicTrackIndex]); }
    function handleConfirmMusicClick() { const selectedValue = parseInt(musicSelection.value); if (selectedValue === -1) { if (backgroundMusic) backgroundMusic.loop = false; playNextMusicTrack(); } else { if (backgroundMusic) backgroundMusic.loop = true; musicTrackIndex = selectedValue; playMusic(backgroundMusicTracks[musicTrackIndex]); } }
    if (toggleMusicBtn && backgroundMusic) { toggleMusicBtn.addEventListener('click', () => { playClickSound(); resumeAudioContext(); if (!isMusicPlaying) { musicManuallyPaused = false; backgroundMusic.play().then(() => { isMusicPlaying = true; toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; }).catch(() => { isMusicPlaying = false; musicManuallyPaused = true; toggleMusicBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>'; }); } else { backgroundMusic.pause(); isMusicPlaying = false; musicManuallyPaused = true; toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>'; } }); }

    // --- EVENT LISTENERS ---
    if (showGuideBtn) showGuideBtn.addEventListener('click', () => { playClickSound(); howToPlayModal.classList.remove('hidden'); });
    if (closeGuideBtn) closeGuideBtn.addEventListener('click', () => { playClickSound(); howToPlayModal.classList.add('hidden'); });
    if (openMusicSettingsBtn) openMusicSettingsBtn.addEventListener('click', () => { playClickSound(); musicSettingsModal.classList.remove('hidden'); });
    if (closeMusicSettingsBtn) closeMusicSettingsBtn.addEventListener('click', () => { playClickSound(); musicSettingsModal.classList.add('hidden'); });
    if (confirmMusicBtn) confirmMusicBtn.addEventListener('click', () => { playClickSound(); handleConfirmMusicClick(); musicSettingsModal.classList.add('hidden'); });
    if (proceedToCardDistributionBtn) proceedToCardDistributionBtn.addEventListener('click', () => { playClickSound(); validateConfigAndProceed(); });
    if (submitNameAndDrawCardBtn) submitNameAndDrawCardBtn.addEventListener('click', () => { playClickSound(); handleSubmitNameAndDrawCard(); });
    if (roleCardElement) roleCardElement.addEventListener('click', () => { playClickSound(); handleCardFlip(); });
    if (hideCardAndProceedBtn) hideCardAndProceedBtn.addEventListener('click', () => { playClickSound(); handleProceedAfterCardView(); });
    if (activePlayerListUl) activePlayerListUl.addEventListener('click', (event) => { playClickSound(); handleAvatarVoteSelection(event); });
    if (confirmEliminationBtn) confirmEliminationBtn.addEventListener('click', () => { playClickSound(); handleConfirmElimination(); });
    if (submitMrWhiteGuessBtn) submitMrWhiteGuessBtn.addEventListener('click', () => { playClickSound(); handleMrWhiteGuess(); });
    if (truthBtn) truthBtn.addEventListener('click', () => { playClickSound(); applyPenalty('truth'); });
    if (dareBtn) dareBtn.addEventListener('click', () => { playClickSound(); applyPenalty('dare'); });
    if (closeEliminationPopupBtn) closeEliminationPopupBtn.addEventListener('click', () => { playClickSound(); handleCloseEliminationPopup(); });
    if(closePopupBtn) closePopupBtn.addEventListener('click', () => { playClickSound(); closeWinnerPopupAndShowRoundScores(); });
    if (proceedToRoundScoresBtn) proceedToRoundScoresBtn.addEventListener('click', () => { playClickSound(); closeWinnerPopupAndShowRoundScores(); });
    if (playNewRoundBtn) playNewRoundBtn.addEventListener('click', () => { playClickSound(); startNewRoundWithSameTeam(); });
    if (finishGameShowFinalScoresBtn) finishGameShowFinalScoresBtn.addEventListener('click', () => { playClickSound(); showFinalScoreboard(); });
    if (restartGameFullBtn) restartGameFullBtn.addEventListener('click', () => { playClickSound(); resetGameFull(); });
    if(closeFinalScoreBtn) closeFinalScoreBtn.addEventListener('click', () => { playClickSound(); finalScoreDisplayModal.classList.add('hidden'); if(confettiAnimation) confettiAnimation.classList.add('hidden'); });
    if (restartFromFinalBtn) restartFromFinalBtn.addEventListener('click', () => { playClickSound(); resetGameFull(); });
    if (peekCardBtn) peekCardBtn.addEventListener('click', () => { playClickSound(); openPeekSelectionModal(); });
    if(closePeekSelectModalBtn) closePeekSelectModalBtn.addEventListener('click', () => { playClickSound(); peekPlayerSelectModal.classList.add('hidden'); });
    if (confirmPeekBtn) confirmPeekBtn.addEventListener('click', () => { playClickSound(); handleConfirmPeek(); });
    if (closePeekViewBtn) closePeekViewBtn.addEventListener('click', () => { playClickSound(); cardRevealModal.classList.add('hidden'); });
    if (massTruthBtn) massTruthBtn.addEventListener('click', () => { playClickSound(); applyMassPenalty('truth'); });
    if (massDareBtn) massDareBtn.addEventListener('click', () => { playClickSound(); applyMassPenalty('dare'); });
    if (massPenaltyNextBtn) massPenaltyNextBtn.addEventListener('click', () => { playClickSound(); processNextPenalty(); });
    if (shareResultsBtn) shareResultsBtn.addEventListener('click', (e) => { playClickSound(); handleShareResults(e.target); });
    
    // --- Word Pack Manager Event Listeners ---
    if (manageWordPacksBtn) manageWordPacksBtn.addEventListener('click', () => { playClickSound(); wordPackManagerModal.classList.remove('hidden'); });
    const closeManager = () => { playClickSound(); wordPackManagerModal.classList.add('hidden'); };
    if (closeWordPackManagerBtn) closeWordPackManagerBtn.addEventListener('click', closeManager);
    if (closeWordPackManagerDoneBtn) closeWordPackManagerDoneBtn.addEventListener('click', closeManager);
    if (createNewPackBtn) createNewPackBtn.addEventListener('click', () => { playClickSound(); handleCreateNewPack(); });
    if (addWordPairBtn) addWordPairBtn.addEventListener('click', () => { playClickSound(); handleAddWordPair(); });
    if (deletePackBtn) deletePackBtn.addEventListener('click', () => { playClickSound(); handleDeletePack(); });
    if (editPackSelection) editPackSelection.addEventListener('change', () => { displayWordsForSelectedPack(); });


    // --- Stepper Buttons ---
    const configSectionForSteppers = document.getElementById('initial-config-section');
    if (configSectionForSteppers) configSectionForSteppers.addEventListener('click', (event) => {
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
        if (!wordPackSelection || !editPackSelection) return; // Safely exit if elements not found

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
        if (!newPackNameInput || !editPackSelection) return; // Safely exit

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
        if (!editPackSelection || !currentPackDisplayName || !wordListDisplay || !addWordPairBtn || !deletePackBtn) return; // Safely exit

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
        if (!editPackSelection || !newCivilianWordInput || !newUndercoverWordInput) return; // Safely exit

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
        if (!editPackSelection) return; // Safely exit

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
        if (popupWinnerMessageH2) { // Safely access popupWinnerMessageH2
            const winnerMessage = popupWinnerMessageH2.textContent;
            if (winnerMessage.includes('Tim Civilian')) { winnerText = 'Tim Civilian Menang!'; } 
            else if (winnerMessage.includes('Tim Undercover')) { winnerText = 'Tim Undercover & Mr. White Menang!'; } 
            else if (winnerMessage.includes('Mr. White')) {
                 if(winnerMessage.includes('Luar Biasa')){ winnerText = `${currentWinnerPlayerObjects[0].name} (Mr. White) Menang dengan Menebak Kata!`; } 
                 else { winnerText = 'Tim Mr. White Menang!'; }
            } else { winnerText = winnerMessage; }
        }
        
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
        if (!peekPlayerSelect || !peekPlayerSelectModal) return; // Safely exit
        peekPlayerSelect.innerHTML = '';
        const activePlayers = players.filter(p => !p.isEliminated);
        activePlayers.forEach(player => { const option = document.createElement('option'); option.value = player.name; option.textContent = player.name; peekPlayerSelect.appendChild(option); });
        peekPlayerSelectModal.classList.remove('hidden');
    }

    function handleConfirmPeek() {
        if (!peekPlayerSelect || !peekPlayerSelectModal || !cardRevealPopupTitleH3 || !cardPlayerRoleP || !cardPlayerWordP || !cardPlayerMissionP || !roleCardElement || !hideCardAndProceedBtn || !closePeekViewBtn || !cardRevealModal) return; // Safely exit

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
        isMrWhiteFinalDuel = false; 
        if (isMusicPlaying && backgroundMusic) { backgroundMusic.pause(); isMusicPlaying = false; musicManuallyPaused = true; if (toggleMusicBtn) toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>'; }
        if (musicSelection) musicSelection.value = "0"; 
        if (totalPlayersConfigInput) totalPlayersConfigInput.value = "5"; 
        if (civiliansConfigInput) civiliansConfigInput.value = "3";
        if (undercoversConfigInput) undercoversConfigInput.value = "1"; 
        if (mrWhitesConfigInput) mrWhitesConfigInput.value = "1";
        if (configErrorP) { configErrorP.classList.add('hidden'); configErrorP.textContent = ''; }

        // Ensure all relevant modals for auth are hidden on full reset
        const allScreens = [playerNameInputSection, gameSection, mrWhiteGuessSection, eliminationResultPopup, winnerPopupModal, roundOverSection, finalScoreDisplayModal, cardRevealModal, musicSettingsModal, peekPlayerSelectModal, massPenaltyModal, howToPlayModal, wordPackManagerModal, authModal, forgotPasswordModal, updatePasswordModal];
        allScreens.forEach(s => { if(s) s.classList.add('hidden'); });
        
        if (initialConfigSection) initialConfigSection.classList.remove('hidden');
        resetTruthOrDareButtons(); 
        if(debugCivilianWordP) debugCivilianWordP.style.display = 'none';
        if(activePlayerListUl) activePlayerListUl.innerHTML = ''; 
        if(playerToEliminateDisplay) playerToEliminateDisplay.textContent = "Belum ada";
        if(confirmEliminationBtn) confirmEliminationBtn.disabled = true; 
        if(roundRolesListUl) roundRolesListUl.innerHTML = '';
        if(finalCumulativeScoresTbody) finalCumulativeScoresTbody.innerHTML = ''; 
        if(confettiAnimation) confettiAnimation.classList.add('hidden');
        loadWordPacks();
    }

    function validateConfigAndProceed() {
        if (!totalPlayersConfigInput || !civiliansConfigInput || !undercoversConfigInput || !mrWhitesConfigInput || !configErrorP || !wordPackSelection || !initialConfigSection || !playerNameInputSection) return; // Safely exit

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
        if (!isMusicPlaying && musicManuallyPaused && backgroundMusic && toggleMusicBtn) { // Safely access audio elements
            musicManuallyPaused = false;
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) { playPromise.then(() => { isMusicPlaying = true; toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; }).catch(error => { console.error("Pemutaran otomatis gagal:", error); musicManuallyPaused = true; isMusicPlaying = false; toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>'; }); }
        }
        configuredTotalPlayers = total; initialCiviliansCount = civ; initialUndercoversCount = uc; initialMrWhitesCount = mw;
        generateRolesToDistribute(); selectNewWordPair();
        players = []; currentPlayerIndex = 0; isInitialSetupPhase = true;
        gameInProgress = true; currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        switchScreen(initialConfigSection, playerNameInputSection);
        prepareForNextPlayerNameInput();
    }

    function generateRolesToDistribute() { 
        rolesToDistribute = []; 
        for (let i = 0; i < initialCiviliansCount; i++) rolesToDistribute.push("Civilian"); 
        for (let i = 0; i < initialUndercoversCount; i++) rolesToDistribute.push("Undercover"); 
        for (let i = 0; i < initialMrWhitesCount; i++) rolesToDistribute.push("Mr. White"); 
        
        // --- FIXED: Corrected the array name from 'roles' to 'rolesToDistribute' ---
        for (let i = rolesToDistribute.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1));
            [rolesToDistribute[i], rolesToDistribute[j]] = [rolesToDistribute[j], rolesToDistribute[i]]; 
        } 
    }
    
    function selectNewWordPair() { 
        if (!currentWordList || currentWordList.length === 0) {
            currentWordList = [{ civilian: "Error", undercover: "Bug" }];
        }
        const selectedPair = currentWordList[Math.floor(Math.random() * currentWordList.length)]; 
        civilianWord = selectedPair.civilian; 
        undercoverWord = selectedPair.undercover; 
    }

    function showConfigError(message) { if (configErrorP) { configErrorP.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`; configErrorP.classList.remove('hidden'); }}
    function prepareForNextPlayerNameInput() { 
        if (playerNameInputTitleH2) playerNameInputTitleH2.innerHTML = `<i class="fas fa-user-plus"></i> Masukkan Nama Pemain ${currentPlayerIndex + 1}`; 
        if (currentPlayerNameInput) currentPlayerNameInput.value = ''; 
        if (currentPlayerNameInput) currentPlayerNameInput.focus(); 
        if (submitNameAndDrawCardBtn) submitNameAndDrawCardBtn.disabled = false; 
    }

    function handleSubmitNameAndDrawCard() {
        if (!currentPlayerNameInput || !submitNameAndDrawCardBtn || !playerNameInputSection) return; // Safely exit

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
        if (!currentPlayer) return; // Safely exit if player not found
        const assignedRole = rolesToDistribute[currentPlayerIndex];
        currentPlayer.role = assignedRole;
        currentPlayer.word = (assignedRole === "Civilian") ? civilianWord : (assignedRole === "Undercover") ? undercoverWord : "Anda tidak punya kata. Amati!";
        showRoleOnCard(currentPlayer.name, currentPlayer.role, currentPlayer.word);
    }

    function showRoleOnCard(playerName, role, word) {
        if (!cardRevealPopupTitleH3 || !cardPlayerRoleP || !cardPlayerWordP || !cardPlayerMissionP || !roleCardElement || !hideCardAndProceedBtn || !closePeekViewBtn || !cardRevealModal) return; // Safely exit

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

    function handleCardFlip() { if (roleCardElement) { if (!roleCardElement.classList.contains('is-flipped')) { roleCardElement.classList.add('is-flipped'); if (hideCardAndProceedBtn) hideCardAndProceedBtn.classList.remove('hidden'); } } }
    
    function handleProceedAfterCardView() {
        if (!roleCardElement || !cardRevealModal) return; // Safely exit

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
        if (activePlayerListUl) updateActivePlayerListWithAvatars(); // Safely call
        const votingPhaseElement = document.getElementById('voting-phase');
        if (votingPhaseElement) votingPhaseElement.classList.remove('hidden');
        resetTruthOrDareButtons();
        if(confettiAnimation) confettiAnimation.classList.add('hidden');
    }

    function startNewRoundWithSameTeam() {
        isInitialSetupPhase = false; generateRolesToDistribute(); selectNewWordPair();
        currentPlayerIndex = 0;
        if (roundOverSection) switchScreen(roundOverSection, null);
        if (winnerPopupModal) winnerPopupModal.classList.add('hidden'); 
        if (finalScoreDisplayModal) finalScoreDisplayModal.classList.add('hidden');
        gameInProgress = true; currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        if(confettiAnimation) confettiAnimation.classList.add('hidden');
        prepareNewRoundRoleReveal();
    }

    function updateActivePlayerListWithAvatars() {
        if (!activePlayerListUl || !confirmEliminationBtn) return; // Safely exit

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
        if (!gameInProgress || !activePlayerListUl || !playerToEliminateDisplay || !confirmEliminationBtn) return; // Safely exit

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
        if (!playerSelectedForElimination || !eliminatedPlayerInfoH3 || !eliminationResultPopup || !mrWhiteGuessSection || !mrWhiteNameGuessStrong || !document.getElementById('voting-phase') || !confirmEliminationBtn) return; // Safely exit

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
        if (eliminationResultPopup) eliminationResultPopup.classList.add('hidden');
        resetTruthOrDareButtons();
        checkWinConditionsAndProceed();
    }

    function handleMrWhiteGuess() {
        if (!mrWhiteWordGuessInput || !mrWhiteGuessSection || !eliminatedPlayerInfoH3 || !eliminationResultPopup || !massPenaltyModal) return; // Safely exit

        const guess = mrWhiteWordGuessInput.value.trim();
        mrWhiteGuessSection.classList.add('hidden');
        mrWhiteWordGuessInput.value = '';
        gameInProgress = false;

        if (isMrWhiteFinalDuel) {
            isMrWhiteFinalDuel = false;
            const mrWhitePlayer = players.find(p => !p.isEliminated && p.role === 'Mr. White');
            const civilianPlayer = players.find(p => !p.isEliminated && p.role === 'Civilian');

            if (guess.toLowerCase() === civilianWord.toLowerCase()) {
                playWinSound();
                currentWinningTeamType = "MR_WHITE_GUESS";
                currentWinnerPlayerObjects = [mrWhitePlayer];
                if (civilianPlayer) eliminatedThisRoundPlayer = civilianPlayer; 
                if (eliminatedThisRoundPlayer) eliminatedThisRoundPlayer.isEliminated = true;
                eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-times-circle"></i> ${civilianPlayer ? civilianPlayer.name : 'Civilian'} (Civilian) gagal menghentikan Mr. White!`;
            } else {
                playWinSound();
                currentWinningTeamType = "CIVILIAN_TEAM";
                currentWinnerPlayerObjects = players.filter(p => p.originalRole === 'Civilian');
                if (mrWhitePlayer) eliminatedThisRoundPlayer = mrWhitePlayer;
                if (eliminatedThisRoundPlayer) eliminatedThisRoundPlayer.isEliminated = true;
                eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-times-circle"></i> ${mrWhitePlayer ? mrWhitePlayer.name : 'Mr. White'} (Mr. White) gagal menebak di duel terakhir!`;
            }
            resetTruthOrDareButtons();
            eliminationResultPopup.classList.remove('hidden');

        } else {
            // Logika lama: Mr. White ditebak saat voting
            if (guess.toLowerCase() === civilianWord.toLowerCase()) {
                playWinSound();
                currentWinningTeamType = "MR_WHITE_GUESS";
                currentWinnerPlayerObjects = [eliminatedThisRoundPlayer];
                playersAwaitingPenalty = players.filter(p => p.isEliminated === false && p.name !== eliminatedThisRoundPlayer.name);
                if (playersAwaitingPenalty.length > 0) {
                    massPenaltyModal.classList.remove('hidden');
                    processNextPenalty();
                } else {
                    announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
                }
            } else {
                playLoseSound();
                eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-times-circle"></i> ${eliminatedThisRoundPlayer ? eliminatedThisRoundPlayer.name : 'Pemain'} (Mr. White) gagal menebak dan tereliminasi.`;
                resetTruthOrDareButtons();
                eliminationResultPopup.classList.remove('hidden');
            }
        }
    }


    function processNextPenalty() {
        if (!massPenaltyPlayerName || !massPenaltyDisplay || !massTruthBtn || !massDareBtn || !massPenaltyNextBtn || !massPenaltyModal) return; // Safely exit

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
        if (!massPenaltyText || !massPenaltyDisplay || !massTruthBtn || !massDareBtn || !massPenaltyNextBtn) return; // Safely exit

        let item = (type === 'truth') ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        massPenaltyText.innerHTML = (type === 'truth') ? `<i class="fas fa-check-circle"></i> <strong>TRUTH:</strong> ${item}` : `<i class="fas fa-fire"></i> <strong>DARE:</strong> ${item}`;
        massPenaltyDisplay.classList.remove('hidden');
        massTruthBtn.disabled = true; massDareBtn.disabled = true;
        massPenaltyNextBtn.classList.remove('hidden');
        massPenaltyNextBtn.innerHTML = (playersAwaitingPenalty.length === 0) ? '<i class="fas fa-flag-checkered"></i> Selesaikan Babak' : '<i class="fas fa-arrow-right"></i> Lanjut ke Pemain Berikutnya';
    }

    // =================================================================
    // =========== LOGIKA KEMENANGAN AKHIR (VERSI FINAL) ============
    // =================================================================
    function checkWinConditionsAndProceed() {
        if (!gameInProgress && currentWinningTeamType) {
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
            return;
        }
        if (!gameInProgress) return;

        const activePlayers = players.filter(p => !p.isEliminated);
        const activeCivilians = activePlayers.filter(p => p.role === 'Civilian');
        const activeUndercovers = activePlayers.filter(p => p.role === 'Undercover');
        const activeMrWhite = activePlayers.filter(p => p.role === 'Mr. White');

        // Duel 1 Civilian vs 1 Mr. White
        const votingPhaseElement = document.getElementById('voting-phase');
        if (activePlayers.length === 2 && activeCivilians.length === 1 && activeMrWhite.length === 1) {
            gameInProgress = false; 
            isMrWhiteFinalDuel = true; 
            if (votingPhaseElement) votingPhaseElement.classList.add('hidden');
            if (mrWhiteGuessSection && mrWhiteNameGuessStrong) {
                mrWhiteGuessSection.classList.remove('hidden');
                mrWhiteNameGuessStrong.textContent = activeMrWhite[0].name;
                mrWhiteGuessSection.querySelector('h3').innerHTML = '<i class="fas fa-user-secret"></i> Duel Terakhir!';
                mrWhiteGuessSection.querySelector('p').innerHTML = `<strong id="mr-white-name-guess">${activeMrWhite[0].name}</strong>, ini kesempatan terakhirmu. Tebak kata rahasia Civilian untuk menang!`;
            }
            return; 
        }
        
        // Duel 1 Civilian vs 1 Undercover
        if (activePlayers.length === 2 && activeCivilians.length === 1 && activeUndercovers.length === 1) {
            gameInProgress = false; 
            const winningUndercover = activeUndercovers[0];
            const losingCivilian = activeCivilians[0];
            
            eliminatedThisRoundPlayer = losingCivilian;
            if (losingCivilian) losingCivilian.isEliminated = true;
            
            currentWinningTeamType = "UC_DUEL_WIN";
            currentWinnerPlayerObjects = [winningUndercover];
            playWinSound();

            if (votingPhaseElement) votingPhaseElement.classList.add('hidden');
            if (eliminatedPlayerInfoH3) eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-skull-crossbones"></i> ${losingCivilian ? losingCivilian.name : 'Civilian'} (Civilian) kalah dalam duel terakhir!`;
            resetTruthOrDareButtons();
            if (eliminationResultPopup) eliminationResultPopup.classList.remove('hidden');
            
            return; 
        }
        
        // Civilian terakhir dieliminasi
        if (activeCivilians.length === 0 && eliminatedThisRoundPlayer?.originalRole === 'Civilian') {
            gameInProgress = false; 
            let determinedWinType = "UC_MW_SURVIVAL"; 
            let determinedWinners = activePlayers;
            currentWinningTeamType = determinedWinType;
            currentWinnerPlayerObjects = determinedWinners;
            
            if (votingPhaseElement) votingPhaseElement.classList.add('hidden');
            if (eliminatedPlayerInfoH3) eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-skull-crossbones"></i> ${eliminatedThisRoundPlayer ? eliminatedThisRoundPlayer.name : 'Civilian'} (Civilian Terakhir) telah tereliminasi!`;
            resetTruthOrDareButtons();
            if (eliminationResultPopup) eliminationResultPopup.classList.remove('hidden');
            
            return; 
        }

        let winDetected = false;
        let determinedWinType = "";
        let determinedWinners = [];

        // Kemenangan Tim Civilian
        if (activeUndercovers.length === 0 && activeMrWhite.length === 0) {
            winDetected = true;
            determinedWinType = "CIVILIAN_TEAM";
            determinedWinners = players.filter(p => p.originalRole === 'Civilian'); 
        } 
        // Kemenangan Tim Undercover & Mr. White
        else if (activeCivilians.length === 0) {
            winDetected = true;
            determinedWinners = activePlayers; 
            
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

        if (winDetected) {
            gameInProgress = false;
            currentWinningTeamType = determinedWinType;
            currentWinnerPlayerObjects = determinedWinners;
            if (determinedWinType !== "NO_WINNER_DRAW" && currentWinningTeamType) playWinSound();
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
        } else {
            // Lanjutkan permainan
            updateActivePlayerListWithAvatars();
            if (votingPhaseElement) votingPhaseElement.classList.remove('hidden');
            playerSelectedForElimination = null;
            if (playerToEliminateDisplay) playerToEliminateDisplay.textContent = "Belum ada";
            if (confirmEliminationBtn) confirmEliminationBtn.disabled = true;
            resetTruthOrDareButtons();
            if (eliminationResultPopup) eliminationResultPopup.classList.add('hidden');
        }
    }
    // =========== AKHIR DARI LOGIKA KEMENANGAN ============

    function announceWinner(winningTeamType, winnerPlayerObjects = []) {
        if (!popupWinnerMessageH2 || !popupWinnerDetailP || !winnerPopupModal || !gameSection) return; // Safely exit

        let popupMsg = "🎉 Selamat! 🎉"; let popupDetail = "";
        switch (winningTeamType) {
            case "MR_WHITE_GUESS": popupMsg = `🎉 <i class="fas fa-crown"></i> Luar Biasa, ${winnerPlayerObjects[0] ? winnerPlayerObjects[0].name : 'Mr. White'}! 🎉`; popupDetail = "Anda (Mr. White) berhasil menebak kata rahasia Civilian!"; break;
            case "UC_DUEL_WIN": popupMsg = `🎉 Selamat, ${winnerPlayerObjects[0] ? winnerPlayerObjects[0].name : 'Undercover'} (Undercover)! 🎉`; popupDetail = `Undercover memenangkan duel terakhir melawan Civilian!`; break;
            case "UC_SURVIVAL": popupMsg = `🎉 Selamat, Tim Undercover! 🎉`; popupDetail = "Tim Undercover berhasil bertahan hingga akhir!"; break;
            case "MW_SURVIVAL": popupMsg = `🎉 Selamat, Tim Mr. White! 🎉`; popupDetail = "Mr. White berhasil bertahan hingga semua Civilian tersingkir!"; break;
            case "UC_MW_SURVIVAL": popupMsg = `🎉 Selamat, Tim Undercover & Mr. White! 🎉`; popupDetail = "Tim Undercover dan Mr. White berhasil mengeliminasi semua Civilian!"; break;
            case "CIVILIAN_TEAM": popupMsg = `🎉 Selamat, Tim Civilian! 🎉`; popupDetail = "Tim Civilian berhasil mengungkap semua penjahat!"; break;
            default: popupDetail = "Permainan telah berakhir.";
        }
        popupWinnerMessageH2.innerHTML = popupMsg; popupWinnerDetailP.textContent = popupDetail;
        if (confettiAnimation) { // Safely access confetti
            if (winningTeamType !== "NO_WINNER_DRAW" && currentWinningTeamType) { 
                confettiAnimation.classList.remove('hidden'); 
                confettiAnimation.src = confettiAnimation.src.split("?")[0] + "?" + new Date().getTime(); 
            } else { 
                confettiAnimation.classList.add('hidden'); 
            }
        }
        winnerPopupModal.classList.remove('hidden');
        switchScreen(gameSection, null);
    }

    function closeWinnerPopupAndShowRoundScores() { 
        if (winnerPopupModal) winnerPopupModal.classList.add('hidden'); 
        if (confettiAnimation) confettiAnimation.classList.add('hidden'); 
        if (roundOverSection) switchScreen(null, roundOverSection); 
        displayRoundOverDetails(); 
    }

    // --- PERBAIKAN: Logika penentuan pemenang di layar skor ---
    function displayRoundOverDetails() {
        if (!roundOverSection || !roundRolesListUl || !debugCivilianWordP || !civilianWordDisplay) return; // Safely exit

        calculateAndDisplayRoundScores();
        roundOverSection.querySelector('h2').textContent = "🏁 Babak Selesai! 🏁";
        roundRolesListUl.innerHTML = '';
        
        players.forEach(p => {
            const li = document.createElement('li');
            let roleIcon = '';
            if (p.originalRole === 'Civilian') roleIcon = '<i class="fas fa-shield-alt" style="color:var(--theme-success)"></i> ';
            else if (p.originalRole === 'Undercover') roleIcon = '<i class="fas fa-user-secret" style="color:var(--theme-error)"></i> ';
            else if (p.originalRole === 'Mr. White') roleIcon = '<i class="fas fa-user-tie" style="color:var(--theme-mrwhite)"></i> ';

            let isWinner = false;
            if (currentWinningTeamType === "MR_WHITE_GUESS") {
                isWinner = currentWinnerPlayerObjects.some(wp => wp.name === p.name);
            } else {
                const winningRoles = [];
                if (["CIVILIAN_TEAM"].includes(currentWinningTeamType)) winningRoles.push("Civilian");
                if (["UC_DUEL_WIN", "UC_SURVIVAL", "UC_MW_SURVIVAL"].includes(currentWinningTeamType)) winningRoles.push("Undercover");
                if (["MW_SURVIVAL", "UC_MW_SURVIVAL"].includes(currentWinningTeamType)) winningRoles.push("Mr. White");
                isWinner = winningRoles.includes(p.originalRole);
            }

            let status = p.isEliminated ? 'Tereliminasi' : 'Selamat';
            if (isWinner) status = '🎉 MENANG 🎉';
            const roundScoreForPlayer = p.roundScoreThisTurn || 0;
            li.innerHTML = `<strong>${p.name}</strong>: ${roleIcon}${p.originalRole} <span style="font-style:italic; color: var(--text-secondary);">(Kata: ${p.word})</span> - ${status} <strong style="color: var(--theme-primary);">[+${roundScoreForPlayer} Poin]</strong> (Total: ${p.score})`;
            roundRolesListUl.appendChild(li);
        });

        debugCivilianWordP.style.display = 'block';
        civilianWordDisplay.textContent = civilianWord;
        if(truthOrDareSection && truthOrDareSection.parentElement === eliminationResultPopup) { // Safely check parentElement
            eliminationResultPopup.classList.add('hidden');
        }
    }

    function calculateAndDisplayRoundScores() {
        players.forEach(player => {
            player.roundScoreThisTurn = POINTS_LOSER;
            let isDesignatedWinner = currentWinnerPlayerObjects.some(wp => wp.name === player.name);

            if(currentWinningTeamType === "CIVILIAN_TEAM" && player.originalRole === "Civilian"){
                isDesignatedWinner = true;
            }

            switch (currentWinningTeamType) {
                case "MR_WHITE_GUESS": if (player.originalRole === "Mr. White" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_MW_GUESS_WIN; break;
                case "UC_DUEL_WIN":
                case "UC_SURVIVAL": 
                    if (player.originalRole === "Undercover" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_UC_WIN; 
                    break;
                case "MW_SURVIVAL": if (player.originalRole === "Mr. White" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_MW_SURVIVAL_WIN; break;
                case "UC_MW_SURVIVAL": if (player.originalRole === "Undercover" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_UC_WIN; else if (player.originalRole === "Mr. White" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_MW_SURVIVAL_WIN; break;
                case "CIVILIAN_TEAM": if (player.originalRole === "Civilian") player.roundScoreThisTurn = player.isEliminated ? POINTS_CIVILIAN_TEAM_WIN_ELIMINATED : POINTS_CIVILIAN_TEAM_WIN_SURVIVED; break;
            }
            player.score += player.roundScoreThisTurn;
        });
    }

    function showFinalScoreboard() {
        if (!finalScoreDisplayModal || !roundOverSection || !winnerPopupModal || !finalCumulativeScoresTbody) return; // Safely exit

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
        if (!penaltyTextP || !penaltyDisplayDiv || !truthBtn || !dareBtn || !closeEliminationPopupBtn) return; // Safely exit

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

    // Initialize Game
    resetGameFull();
});