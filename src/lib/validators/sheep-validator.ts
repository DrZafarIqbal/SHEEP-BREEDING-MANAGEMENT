import { z } from "zod";

export const sheepSchema = z.object({
  tag_number: z.string().min(1, "Tag number is required"),
  branding_id: z.string().optional(),
  branding_date: z.date().optional().nullable(),
  gender: z.enum(["male", "female", ""]).optional(),
  breed: z
    .enum([
      "kashmir Merino",
      "Australian Merino",
      "Texel",
      "Crossbred",
      "Corriedale",
      "Finn",
      "",
    ])
    .optional(),
  dob: z.date().optional().nullable(),
  sire_branding_id: z.string().optional(),
  dam_branding_id: z.string().optional(),
  notes: z.string().optional(),
  status: z.string().optional(),
  sheep_type: z.enum(["adult", "hogget", "weaner", "lamb", ""]).optional(),
  birth_weight: z.number().optional().nullable(),
  birth_type: z.string().optional(),
  dead: z.boolean().optional(),
  cause_of_death: z.string().optional(),
  death_date: z.date().optional().nullable(),
  farm_id: z.string().optional(),
});

export type SheepFormData = z.infer<typeof sheepSchema>;
