// File: online.js (Versi Final dengan Fitur Kartu)

document.addEventListener('DOMContentLoaded', () => {
    console.log("Logika Online.js dengan Fitur Kartu dimuat.");
    
    // --- Elemen UI ---
    const onlineLobbySection = document.getElementById('online-lobby-section');
    const onlineGameRoom = document.getElementById('online-game-room');
    const createRoomBtn = document.getElementById('create-room-btn');
    const joinRoomBtn = document.getElementById('join-room-btn');
    const leaveRoomBtn = document.getElementById('leave-room-btn');
    const startGameBtn = document.getElementById('start-game-online-btn');
    const playerNameInput = document.getElementById('player-name-online');
    const roomCodeInput = document.getElementById('join-room-code');
    const roomCodeDisplay = document.getElementById('room-code-display');
    const copyCodeBtn = document.getElementById('copy-code-btn');
    const playerListUI = document.getElementById('online-player-list');
    const errorUI = document.getElementById('online-error');
    const playerCountUI = document.getElementById('player-count');
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const discussionTitle = document.getElementById('discussion-title');

    // === ELEMEN KARTU PERAN (BARU) ===
    const cardRevealModal = document.getElementById('card-reveal-modal');
    const cardRevealPopupTitleH3 = document.getElementById('card-reveal-popup-title');
    const roleCardElement = document.getElementById('role-card');
    const cardPlayerRoleP = document.getElementById('card-player-role');
    const cardPlayerWordP = document.getElementById('card-player-word');
    const cardPlayerMissionP = document.getElementById('card-player-mission');
    const hideCardAndProceedBtn = document.getElementById('hide-card-and-proceed-btn');

    // --- State Lokal ---
    let localPlayer = { id: null, name: null, is_host: false, role: null, word: null, voted_for: null };
    let currentRoom = null;
    let roomChannel = null;
    let playersInRoom = [];

    // --- Fungsi Bantuan UI ---
    function showError(message) {
        errorUI.textContent = message;
        errorUI.classList.remove('hidden');
        setTimeout(() => errorUI.classList.add('hidden'), 5000);
    }
    
    function switchView(view) {
        if (view === 'lobby') {
            onlineLobbySection.classList.remove('hidden');
            onlineGameRoom.classList.add('hidden');
        } else if (view === 'room') {
            onlineLobbySection.classList.add('hidden');
            onlineGameRoom.classList.remove('hidden');
        }
    }

    function addSystemMessage(message) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message system';
        msgDiv.textContent = message;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function addChatMessage(message) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message';
        if (message.player_id === localPlayer.id) {
            msgDiv.classList.add('sent');
        } else {
            msgDiv.classList.add('received');
        }
        const nameSpan = document.createElement('span');
        nameSpan.className = 'player-name';
        nameSpan.textContent = message.player_name;
        const contentP = document.createElement('p');
        contentP.textContent = message.content;
        msgDiv.append(nameSpan, contentP);
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function renderPlayerList() {
        playerListUI.innerHTML = '';
        playersInRoom.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        
        playersInRoom.forEach((player, index) => {
            const li = document.createElement('li');
            li.dataset.playerId = player.id;
            li.className = 'player-avatar-card';
            if (player.id === localPlayer.id) li.classList.add('is-me');
            if (currentRoom?.game_state === 'voting') li.classList.add('voting-active');

            const img = document.createElement('img');
            img.src = `assets/images/avatar${(index % 6) + 1}.png`;
            img.className = 'player-avatar-img';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = player.name + (player.is_host ? ' 👑' : '');
            nameSpan.className = 'player-avatar-name';
            
            const voteBtn = document.createElement('button');
            voteBtn.className = 'vote-button';
            voteBtn.dataset.targetId = player.id;
            voteBtn.innerHTML = '<i class="fas fa-vote-yea"></i> Vote';
            
            if (player.id === localPlayer.voted_for) {
                voteBtn.classList.add('voted');
                voteBtn.textContent = 'Voted';
                voteBtn.disabled = true;
            }

            li.append(img, nameSpan, voteBtn);
            playerListUI.appendChild(li);
        });
        playerCountUI.textContent = playersInRoom.length;
        
        if (localPlayer.is_host && playersInRoom.length >= 3 && currentRoom?.game_state === 'lobby') {
            startGameBtn.classList.remove('hidden');
        } else {
            startGameBtn.classList.add('hidden');
        }
    }

    // --- Logika Inti Game ---
    async function handleCreateRoom() {
        const name = playerNameInput.value.trim();
        if (!name) return showError("Nama Anda tidak boleh kosong!");
        localPlayer.name = name;
        localPlayer.is_host = true;
        
        const code = Math.random().toString(36).substring(2, 7).toUpperCase();
        
        const { data, error } = await supabaseClient.from('rooms').insert({ code, host_name: name, game_state: 'lobby' }).select().single();
        
        if (error) return showError('Gagal membuat room. Coba lagi.');
        
        await handleJoinRoom(code);
    }
    
    async function handleJoinRoom(code) {
        const name = playerNameInput.value.trim();
        if (!name) return showError("Nama Anda tidak boleh kosong!");
        
        const roomCode = (code || roomCodeInput.value.trim()).toUpperCase();
        if (!roomCode) return showError("Kode room tidak boleh kosong!");

        const { data: room, error: roomError } = await supabaseClient.from('rooms').select('*').eq('code', roomCode).single();
        if (roomError || !room) return showError(`Room ${roomCode} tidak ditemukan.`);
        currentRoom = room;

        const { data: player, error: playerError } = await supabaseClient.from('players').insert({ name, room_id: currentRoom.id, is_host: localPlayer.is_host }).select().single();
        if (playerError) return showError('Gagal bergabung. Nama mungkin sudah dipakai.');
        
        localPlayer.id = player.id;
        localPlayer.name = player.name;
        
        switchView('room');
        roomCodeDisplay.textContent = currentRoom.code;
        chatInput.disabled = false;
        sendChatBtn.disabled = false;
        
        if (!localPlayer.is_host) addSystemMessage(`Menunggu Host (${currentRoom.host_name}) memulai permainan...`);
        
        await fetchInitialMessages();
        listenToRoomChanges();
    }
    
    async function fetchInitialMessages() {
        if (!currentRoom) return;
        const { data, error } = await supabaseClient.from('messages').select('*').eq('room_id', currentRoom.id).order('created_at', { ascending: true });
        if (error) return console.error("Gagal memuat riwayat chat:", error);
        chatBox.innerHTML = '';
        data.forEach(message => addChatMessage(message));
    }
    
    function listenToRoomChanges() {
        if (roomChannel) roomChannel.unsubscribe();
        
        roomChannel = supabaseClient.channel(`room-${currentRoom.id}`);
        
        roomChannel
        .on('postgres_changes', { event: '*', schema: 'public', table: 'players', filter: `room_id=eq.${currentRoom.id}` }, payload => {
            fetchPlayersInRoom();
        })
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${currentRoom.id}` }, payload => {
            const oldState = currentRoom.game_state;
            const newState = payload.new.game_state;
            currentRoom.game_state = newState;
            
            if (newState === 'discussion' && oldState === 'lobby') onGameStart();
            else if (newState === 'voting') onVotingStart();
        })
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${currentRoom.id}`}, payload => {
            addChatMessage(payload.new);
        })
        .subscribe();
        
        fetchPlayersInRoom(); 
    }
    
    async function fetchPlayersInRoom() {
        const { data, error } = await supabaseClient.from('players').select('*').eq('room_id', currentRoom.id);
        if (error) return console.error("Gagal mengambil data pemain", error);
        
        playersInRoom = data;
        const self = playersInRoom.find(p => p.id === localPlayer.id);
        if (self) localPlayer = self;
        
        renderPlayerList();
    }
    
    async function handleStartGameClick() {
        startGameBtn.disabled = true;
        startGameBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memulai...';
        try {
            const { error } = await supabaseClient.functions.invoke('startGame', {
                body: { roomId: currentRoom.id },
            });
            if (error) throw error;
        } catch (error) {
            showError("Gagal memulai game: " + (error.message || ""));
            startGameBtn.disabled = false;
            startGameBtn.innerHTML = '<i class="fas fa-play"></i> Mulai Permainan (Host)';
        }
    }
    
    async function onGameStart() {
        addSystemMessage('Permainan Dimulai! Waktunya Diskusi...');
        discussionTitle.innerHTML = '<i class="fas fa-user-secret"></i> Waktunya Diskusi';
        startGameBtn.classList.add('hidden');
        
        const { data, error } = await supabaseClient.from('players').select('role, word').eq('id', localPlayer.id).single();
        if (error) return showError("Gagal mendapatkan peran Anda.");
        
        localPlayer.role = data.role;
        localPlayer.word = data.word;
        
        // MENGGANTI alert() DENGAN FUNGSI KARTU BARU
        showRoleOnCard(localPlayer.role, localPlayer.word);
    }

    // === BAGIAN KARTU PERAN (BARU) ===
    function showRoleOnCard(role, word) {
        cardRevealPopupTitleH3.innerHTML = `<i class="fas fa-id-card"></i> Kartu untuk ${localPlayer.name}`;
        cardPlayerRoleP.textContent = role;
        cardPlayerWordP.textContent = word || "Anda tidak punya kata. Amati!";
        
        let missionText = '';
        switch (role) {
            case "Civilian":
                missionText = "Beri petunjuk satu kata yang mengarah ke katamu untuk menemukan teman, tapi jangan terlalu jelas agar musuh tidak menebaknya. Bongkar kedok para penyamar!";
                break;
            case "Undercover":
                missionText = "Katamu sedikit berbeda. Berpura-puralah menjadi Civilian dengan memberi petunjuk yang meyakinkan, lalu singkirkan mereka satu per satu saat lengah.";
                break;
            case "Mr. White":
                missionText = "Kamu adalah agen rahasia tanpa informasi. Dengarkan petunjuk lain, beraktinglah seolah kamu tahu segalanya, dan tebak kata rahasia jika identitasmu terbongkar!";
                break;
        }
        cardPlayerMissionP.textContent = missionText;

        // Siapkan kartu untuk ditampilkan
        roleCardElement.classList.remove('is-flipped'); // Pastikan kartu tertutup
        hideCardAndProceedBtn.textContent = "Sembunyikan Kartu"; // Ganti teks tombol
        hideCardAndProceedBtn.classList.add('hidden'); // Sembunyikan tombol dulu
        
        // Tampilkan modal
        cardRevealModal.classList.remove('hidden');
    }

    function handleCardFlip() {
        if (!roleCardElement.classList.contains('is-flipped')) {
            roleCardElement.classList.add('is-flipped');
            hideCardAndProceedBtn.classList.remove('hidden');
        }
    }

    function handleHideCard() {
        roleCardElement.classList.remove('is-flipped');
        setTimeout(() => {
            cardRevealModal.classList.add('hidden');
        }, 250);
    }
    // === AKHIR BAGIAN KARTU PERAN ===

    function onVotingStart() {
        addSystemMessage("Waktu habis! Silakan vote pemain yang paling mencurigakan.");
        discussionTitle.innerHTML = '<i class="fas fa-vote-yea"></i> Waktunya VOTE!';
        chatInput.disabled = true;
        sendChatBtn.disabled = true;
        renderPlayerList();
    }
    
    async function handleVote(targetPlayerId) {
        if (targetPlayerId === localPlayer.id) return alert("Anda tidak bisa vote diri sendiri!");
        
        const { error } = await supabaseClient.from('players').update({ voted_for: targetPlayerId }).eq('id', localPlayer.id);
        if (error) showError("Gagal melakukan vote. Coba lagi.");
        else addSystemMessage(`Anda telah memberikan vote.`);
    }

    async function handleLeaveRoom() {
        if (roomChannel) await roomChannel.unsubscribe();
        if(localPlayer.id) await supabaseClient.from('players').delete().eq('id', localPlayer.id);
        window.location.href = 'index.html';
    }

    async function handleSendMessage() {
        const messageContent = chatInput.value.trim();
        if (!messageContent) return;

        const messageData = {
            content: messageContent,
            player_id: localPlayer.id,
            player_name: localPlayer.name,
            room_id: currentRoom.id
        };

        try {
            const { error } = await supabaseClient.from('messages').insert(messageData);
            if (error) throw error;
            chatInput.value = '';
        } catch (error) {
            console.error("Gagal mengirim pesan:", error);
            showError("Gagal mengirim pesan. Periksa izin database (RLS).");
        }
    }

    // --- Event Listeners ---
    createRoomBtn.addEventListener('click', handleCreateRoom);
    joinRoomBtn.addEventListener('click', () => handleJoinRoom(null));
    leaveRoomBtn.addEventListener('click', handleLeaveRoom);
    startGameBtn.addEventListener('click', handleStartGameClick);
    copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(currentRoom.code);
        alert(`Kode Room ${currentRoom.code} disalin!`);
    });
    
    playerListUI.addEventListener('click', (e) => {
        const voteButton = e.target.closest('.vote-button');
        if (voteButton && !voteButton.disabled) {
            const targetId = voteButton.dataset.targetId;
            handleVote(targetId);
        }
    });

    sendChatBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // === EVENT LISTENER KARTU PERAN (BARU) ===
    roleCardElement.addEventListener('click', handleCardFlip);
    hideCardAndProceedBtn.addEventListener('click', handleHideCard);

    window.addEventListener('beforeunload', async (event) => {
        if (localPlayer.id) {
            await supabaseClient.from('players').delete().eq('id', localPlayer.id);
        }
    });
});