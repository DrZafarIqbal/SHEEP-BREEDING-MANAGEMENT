import { supabase } from "../supabase";

export const getHealthRecords = async (sheepId: string) => {
  const { data, error } = await supabase
    .from("health_records")
    .select("*")
    .eq("sheep_id", sheepId)
    .order("event_date", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
};

export const addHealthRecord = async (recordData: any) => {
  const { data, error } = await supabase
    .from("health_records")
    .insert(recordData)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const updateHealthRecord = async (id: string, recordData: any) => {
  const { data, error } = await supabase
    .from("health_records")
    .update(recordData)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteHealthRecord = async (id: string) => {
  const { data, error } = await supabase
    .from("health_records")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};
