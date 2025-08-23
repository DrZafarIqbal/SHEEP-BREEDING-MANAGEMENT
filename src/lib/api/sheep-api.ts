import { supabase } from "../supabase";

export async function getSheep(
  page = 1,
  limit = 10,
  userId: string | null | undefined
) {
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("sheep")
    .select("*", { count: "exact" })
    .eq("farm_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching sheep:", error);
    throw error;
  }

  return {
    sheep: data || [],
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export async function getSheepById(id: string) {
  const { data, error } = await supabase
    .from("sheep")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching sheep by ID:", error);
    throw error;
  }

  return data;
}

export async function createSheep(sheep: any) {
  const { data, error } = await supabase
    .from("sheep")
    .insert([sheep])
    .select()
    .single();

  if (error) {
    console.error("Error creating sheep:", error);
    throw error;
  }

  return data;
}

export async function updateSheep(id: string, updates: any) {
  const { data, error } = await supabase
    .from("sheep")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating sheep:", error);
    throw error;
  }

  return data;
}

export async function deleteSheep(id: string) {
  const { error } = await supabase.from("sheep").delete().eq("id", id);

  if (error) {
    console.error("Error deleting sheep:", error);
    throw error;
  }
}
