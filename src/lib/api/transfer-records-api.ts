import { supabase } from "../supabase";
import { TransferRecord } from "../validators/transfer-validator";

export const getTransferRecords = async (
  sheepId: string,
  farmId: string,
  direction?: "from" | "to"
) => {
  console.log(sheepId);
  let query = supabase.from("transfers").select(`
      *,
      from_farm:farm!transfers_from_fkey(name),
      to_farm:farm!transfers_to_fkey(name)
    `);

  if (direction === "from") {
    query = query.eq("from", farmId);
  } else if (direction === "to") {
    query = query.eq("to", farmId);
  } else {
    query = query.or(`from.eq.${farmId},to.eq.${farmId}`);
  }

  const { data, error } = await query.order("date", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
};

export const addTransferRecord = async (
  recordData: Omit<TransferRecord, "id">
) => {
  const { data, error } = await supabase
    .from("transfers")
    .insert(recordData)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const updateTransferRecord = async (
  id: string,
  recordData: Partial<TransferRecord>
) => {
  const { data, error } = await supabase
    .from("transfers")
    .update(recordData)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteTransferRecord = async (id: string) => {
  const { data, error } = await supabase
    .from("transfers")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};
