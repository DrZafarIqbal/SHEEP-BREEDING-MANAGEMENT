import { supabase } from "../supabase";

export const getWoolRecords = async (sheepId: string) => {
  const { data, error } = await supabase
    .from("wool_records")
    .select("*")
    .eq("sheep_id", sheepId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
};

export const addWoolRecord = async (recordData: any) => {
  const { data, error } = await supabase
    .from("wool_records")
    .insert(recordData)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const updateWoolRecord = async (id: string, recordData: any) => {
  const { data, error } = await supabase
    .from("wool_records")
    .update(recordData)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteWoolRecord = async (id: string) => {
  const { data, error } = await supabase
    .from("wool_records")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};
