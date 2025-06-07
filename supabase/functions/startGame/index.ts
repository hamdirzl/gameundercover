import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

function getRoleComposition(playerCount: number) {
  if (playerCount <= 4) return { civilians: playerCount - 2, undercovers: 1, mrWhites: 1 };
  if (playerCount <= 6) return { civilians: playerCount - 3, undercovers: 2, mrWhites: 1 };
  return { civilians: playerCount - 4, undercovers: 2, mrWhites: 2 };
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const defaultWordPairs = [
  { civilian: "Apel", undercover: "Pir" }, { civilian: "Pantai", undercover: "Gurun" }, { civilian: "Kucing", undercover: "Anjing" },
  { civilian: "Buku", undercover: "Majalah" }, { civilian: "Mobil", undercover: "Motor" }, { civilian: "Rumah", undercover: "Apartemen" },
  { civilian: "Sepak Bola", undercover: "Basket" }, { civilian: "Dokter", undercover: "Perawat" }, { civilian: "Nasi", undercover: "Roti" }
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    if (!body || !body.roomId) {
      throw new Error("Request body harus berisi 'roomId'.");
    }
    const { roomId } = body;

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // ================== PERBAIKAN #1 ==================
    // Kita perlu mengambil 'name' selain 'id' agar tidak hilang saat update.
    const { data: players, error: playersError } = await supabaseAdmin
      .from("players")
      .select("id, name") // Diubah dari select("id")
      .eq("room_id", roomId);

    if (playersError) throw playersError;
    if (players.length < 3) throw new Error("Permainan membutuhkan minimal 3 pemain.");

    const { civilians, undercovers, mrWhites } = getRoleComposition(players.length);
    let roles = [];
    for (let i = 0; i < civilians; i++) roles.push("Civilian");
    for (let i = 0; i < undercovers; i++) roles.push("Undercover");
    for (let i = 0; i < mrWhites; i++) roles.push("Mr. White");
    
    roles = shuffleArray(roles);

    const wordPair = defaultWordPairs[Math.floor(Math.random() * defaultWordPairs.length)];

    const playersUpdate = players.map((player, index) => {
      const assignedRole = roles[index];
      let assignedWord = null;
      if (assignedRole === "Civilian") assignedWord = wordPair.civilian;
      if (assignedRole === "Undercover") assignedWord = wordPair.undercover;

      // ================== PERBAIKAN #2 ==================
      // Kita sertakan kembali 'name' agar tidak terhapus menjadi null.
      return { 
        id: player.id, 
        name: player.name, // Ditambahkan baris ini
        role: assignedRole, 
        word: assignedWord 
      };
    });

    const { error: updatePlayersError } = await supabaseAdmin
      .from("players").upsert(playersUpdate);
    if (updatePlayersError) throw updatePlayersError;

    const { error: updateRoomError } = await supabaseAdmin
      .from("rooms").update({ game_state: 'discussion' }).eq('id', roomId);
    if (updateRoomError) throw updateRoomError;

    return new Response(JSON.stringify({ message: "Game started successfully!" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Terjadi error di fungsi startGame:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});