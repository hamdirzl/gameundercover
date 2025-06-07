// supabase/functions/game-logic/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Data game statis
const defaultWordPairs = [
  { civilian: "Apel", undercover: "Pir" }, { civilian: "Pantai", undercover: "Gurun" }, { civilian: "Kucing", undercover: "Anjing" },
  { civilian: "Buku", undercover: "Majalah" }, { civilian: "Mobil", undercover: "Motor" }, { civilian: "Rumah", undercover: "Apartemen" },
  { civilian: "Sepak Bola", undercover: "Basket" }, { civilian: "Dokter", undercover: "Perawat" }, { civilian: "Nasi", undercover: "Roti" }
];

serve(async (req) => {
  // Menangani preflight request untuk CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }});
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const { action, roomId, guess } = await req.json();

    // Ambil data room dan pemain saat ini
    const { data: room, error: roomError } = await supabaseClient.from('rooms').select('*').eq('id', roomId).single();
    if (roomError) throw new Error(`Room not found: ${roomError.message}`);

    const { data: players, error: playersError } = await supabaseClient.from('players').select('*').eq('room_id', roomId);
    if (playersError) throw new Error(`Players not found: ${playersError.message}`);

    // Router untuk setiap aksi
    switch (action) {
      case 'startGame':
        return await startGame(supabaseClient, room, players);
      case 'processVotes':
        return await processVotes(supabaseClient, room, players);
      case 'mrWhiteGuess':
        return await handleMrWhiteGuess(supabaseClient, room, players, guess);
      case 'continueAfterElimination':
        return await checkWinAndContinue(supabaseClient, room, players);
      case 'resetGame':
        return await resetGame(supabaseClient, room, players);
      default:
        throw new Error("Invalid action");
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
    });
  }
});

// --- FUNGSI LOGIKA GAME ---

async function startGame(supabase, room, players) {
    // 1. Validasi
    if (players.length < 3) throw new Error("Butuh minimal 3 pemain.");

    // 2. Tentukan Komposisi Peran (contoh sederhana)
    let undercoversCount = 1;
    let mrWhitesCount = players.length > 4 ? 1 : 0;
    let civiliansCount = players.length - undercoversCount - mrWhitesCount;

    let roles = [
        ...Array(civiliansCount).fill('Civilian'),
        ...Array(undercoversCount).fill('Undercover'),
        ...Array(mrWhitesCount).fill('Mr. White')
    ];
    // Acak peran
    roles.sort(() => Math.random() - 0.5);

    // 3. Pilih Kata
    const wordPair = defaultWordPairs[Math.floor(Math.random() * defaultWordPairs.length)];

    // 4. Update setiap pemain dengan peran dan kata
    const playerUpdates = players.map((player, index) => {
        const role = roles[index];
        let word = null;
        if (role === 'Civilian') word = wordPair.civilian;
        if (role === 'Undercover') word = wordPair.undercover;
        return supabase.from('players').update({ role, word, is_eliminated: false, voted_for: null }).eq('id', player.id);
    });
    await Promise.all(playerUpdates);

    // 5. Update status room untuk memulai permainan
    await supabase.from('rooms').update({
        game_state: 'card_distribution',
        civilian_word: wordPair.civilian,
        undercover_word: wordPair.undercover,
        last_eliminated_id: null,
        winner_details: null
    }).eq('id', room.id);

    // Setelah delay singkat, ganti state ke diskusi
    setTimeout(async () => {
         await supabase.from('rooms').update({ game_state: 'discussion' }).eq('id', room.id);
    }, 3000);

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } });
}

async function processVotes(supabase, room, players) {
    const activePlayers = players.filter(p => !p.is_eliminated);
    const votes = {};
    activePlayers.forEach(p => {
        if (p.voted_for) {
            votes[p.voted_for] = (votes[p.voted_for] || 0) + 1;
        }
    });

    let maxVotes = 0;
    let playersToEliminate = [];
    for (const playerId in votes) {
        if (votes[playerId] > maxVotes) {
            maxVotes = votes[playerId];
            playersToEliminate = [playerId];
        } else if (votes[playerId] === maxVotes) {
            playersToEliminate.push(playerId);
        }
    }

    // Jika vote seri atau tidak ada yg vote, kembali ke diskusi
    if (playersToEliminate.length !== 1) {
        await supabase.from('players').update({ voted_for: null }).eq('room_id', room.id); // Reset votes
        await supabase.from('rooms').update({ game_state: 'discussion' }).eq('id', room.id);
        return new Response(JSON.stringify({ success: true, message: "Vote tied" }), { headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } });
    }

    const eliminatedPlayerId = playersToEliminate[0];
    const eliminatedPlayer = players.find(p => p.id === eliminatedPlayerId);

    // Update status pemain yang tereliminasi
    await supabase.from('players').update({ is_eliminated: true }).eq('id', eliminatedPlayerId);

    // Cek apakah yang tereliminasi adalah Mr. White
    if (eliminatedPlayer.role === 'Mr. White') {
        await supabase.from('rooms').update({ game_state: 'mr_white_guess', last_eliminated_id: eliminatedPlayerId }).eq('id', room.id);
    } else {
        await supabase.from('rooms').update({ game_state: 'elimination_result', last_eliminated_id: eliminatedPlayerId }).eq('id', room.id);
    }

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } });
}

async function checkWinAndContinue(supabase, room, players) {
    // Refresh data pemain setelah eliminasi
    const { data: currentPlayers } = await supabase.from('players').select('*').eq('room_id', room.id);

    const activePlayers = currentPlayers.filter(p => !p.is_eliminated);
    const activeCivilians = activePlayers.filter(p => p.role === 'Civilian');
    const activeImpostors = activePlayers.filter(p => p.role === 'Undercover' || p.role === 'Mr. White');

    let winner_details = null;

    // Kondisi menang Impostor: tidak ada Civilian tersisa
    if (activeCivilians.length === 0) {
        winner_details = "Tim Penyamar Menang!\nSemua Civilian telah dieliminasi.";
    }
    // Kondisi menang Civilian: tidak ada Impostor tersisa
    else if (activeImpostors.length === 0) {
        winner_details = "Tim Civilian Menang!\nSemua penyamar telah ditemukan.";
    }

    if (winner_details) {
        await supabase.from('rooms').update({ game_state: 'game_over', winner_details }).eq('id', room.id);
    } else {
        // Jika belum ada pemenang, reset vote dan kembali ke diskusi
        await supabase.from('players').update({ voted_for: null }).eq('room_id', room.id);
        await supabase.from('rooms').update({ game_state: 'discussion' }).eq('id', room.id);
    }
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } });
}

async function handleMrWhiteGuess(supabase, room, players, guess) {
    let winner_details = null;
    if (guess.toLowerCase() === room.civilian_word.toLowerCase()) {
        winner_details = "Mr. White Menang!\nDia berhasil menebak kata rahasia.";
    } else {
        winner_details = "Tim Civilian Menang!\nMr. White gagal menebak kata dan tereliminasi.";
    }

    // Apapun hasilnya, game berakhir
    await supabase.from('rooms').update({ game_state: 'game_over', winner_details }).eq('id', room.id);
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } });
}

async function resetGame(supabase, room, players) {
    // Hanya host yang bisa reset
    const callingPlayer = players.find(p => p.id === supabase.auth.user()?.id);
    // Note: Auth check ini tidak akan berfungsi di anon key. Kita asumsikan client-side sudah memvalidasi host.

    await supabase.from('rooms').update({ game_state: 'lobby' }).eq('id', room.id);
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } });
}