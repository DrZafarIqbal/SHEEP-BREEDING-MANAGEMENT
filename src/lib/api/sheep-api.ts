import { supabase } from "../supabase";

export const fetchSheep = async (page = 1, limit = 10, userId: string) => {
  const offset = (page - 1) * limit;
  const { data, error, count } = await supabase
    .from("sheep")
    .select("*", { count: "exact" })
    .eq("farm_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw new Error(error.message);
  return {
    sheep: data || [],
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
  };
};

export const searchSheep = async (query: string, userId: string) => {
  const { data, error } = await supabase
    .from("sheep")
    .select("*")
    .eq("farm_id", userId)
    .or(`tag_number.ilike.%${query}%`);

  if (error) throw new Error(error.message);
  return data || [];
};

export const getSheepById = async (id: string) => {
  const { data, error } = await supabase
    .from("sheep")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const createSheep = async (sheepData: any) => {
  const { data, error } = await supabase
    .from("sheep")
    .insert(sheepData)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const updateSheep = async ({ id, ...updateData }: any) => {
  const { data, error } = await supabase
    .from("sheep")
    .update(updateData)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteSheep = async (id: string) => {
  const { data, error } = await supabase.from("sheep").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};

export const getFarms = async () => {
  const { data, error } = await supabase.from("farm").select("id, name");
  if (error) throw new Error(error.message);
  return data || [];
};

export const fetchTransferredSheepFromUser = async (
  userId: string,
  page = 1,
  limit = 10
) => {
  const offset = (page - 1) * limit;
  const { data, error, count } = await supabase
    .from("sheep")
    .select(
      `
      *,
      transfers!inner(
        from
      )
    `,
      { count: "exact" }
    )
    .eq("transfers.from", userId)
    .range(offset, offset + limit - 1);

  if (error) throw new Error(error.message);
  return {
    sheep: data || [],
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
  };
};
