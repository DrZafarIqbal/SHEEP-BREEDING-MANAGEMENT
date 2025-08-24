import { supabase } from "../supabase";

export const getVaccineDewormingRecords = async (sheepId: string, type?: 'vaccine' | 'deworming') => {
  let query = supabase
    .from("vaccine_deworming")
    .select("*")
    .eq("sheep_id", sheepId)
    .order("date", { ascending: false });

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data || [];
};

export const addVaccineDewormingRecord = async (recordData: any) => {
  const { data, error } = await supabase
    .from("vaccine_deworming")
    .insert(recordData)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const updateVaccineDewormingRecord = async (id: string, recordData: any) => {
  const { data, error } = await supabase
    .from("vaccine_deworming")
    .update(recordData)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteVaccineDewormingRecord = async (id: string) => {
  const { data, error } = await supabase
    .from("vaccine_deworming")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};
