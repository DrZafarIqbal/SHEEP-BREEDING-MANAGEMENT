import * as z from "zod";

export const transferRecordSchema = z.object({
  id: z.string().optional(),
  sheep_id: z.string(),
  from_farm_id: z.string(),
  to_farm_id: z.string(),
  date: z.string(),
  reason: z.string(),
});

export type TransferRecord = z.infer<typeof transferRecordSchema>;
