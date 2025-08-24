import { supabase } from "../supabase";

export const getGrowthRecords = async (sheepId: string) => {
  const { data, error } = await supabase
    .from("growth")
    .select("*")
    .eq("sheep_id", sheepId)
    .order("age_days", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
};

export const addGrowthRecord = async (recordData: any) => {
  console.log(recordData);
  const { data, error } = await supabase
    .from("growth")
    .insert(recordData)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const updateGrowthRecord = async (id: string, recordData: any) => {
  const { data, error } = await supabase
    .from("growth")
    .update(recordData)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteGrowthRecord = async (id: string) => {
  const { data, error } = await supabase.from("growth").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};
