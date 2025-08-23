import { supabase } from "../supabase";

export const loadCounts = async (userId: string) => {
  const { count: sheepCount } = await supabase
    .from("sheep")
    .select("*", { count: "exact", head: true })
    .eq("farm_id", userId);

  const { count: transferCount } = await supabase
    .from("transfers")
    .select("*", { count: "exact", head: true })
    .eq("from", userId);
  const { count: recievedCount } = await supabase
    .from("transfers")
    .select("*", { count: "exact", head: true })
    .eq("to", userId);

  return { sheepCount, transferCount, recievedCount };
};
