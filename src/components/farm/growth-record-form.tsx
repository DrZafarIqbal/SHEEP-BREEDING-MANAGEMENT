"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const growthRecordSchema = z.object({
  age_days: z.coerce.number().int().positive("Age must be a positive number."),
  body_weight: z.coerce
    .number()
    .positive("Body weight must be a positive number."),
});

export function GrowthRecordForm({ sheepId, record, onSubmit, onCancel }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(growthRecordSchema),
    defaultValues: record || {
      age_days: 0,
      body_weight: 0.0,
      sheep_id: sheepId,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="age_days">Age (days)</Label>
        <Input id="age_days" type="number" {...register("age_days")} />
        {errors.age_days && (
          <p className="text-red-500 text-sm">
            {String(errors.age_days.message)}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="body_weight">Body Weight (kg)</Label>
        <Input
          id="body_weight"
          type="number"
          step="0.1"
          {...register("body_weight")}
        />
        {errors.body_weight && (
          <p className="text-red-500 text-sm">
            {String(errors.body_weight.message)}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
