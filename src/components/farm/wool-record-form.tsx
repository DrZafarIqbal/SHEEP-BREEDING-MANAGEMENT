"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const woolRecordSchema = z.object({
  greasy_fleece_yield: z.coerce.number().positive(),
  clean_fleece_yield: z.coerce.number().positive(),
  staple_length: z.coerce.number().positive(),
  fibre_diameter: z.coerce.number().positive(),
  medullation_percent: z.coerce.number().min(0).max(100),
  crimps: z.coerce.number().positive(),
});

export function WoolRecordForm({ sheepId, record, onSubmit, onCancel }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(woolRecordSchema),
    defaultValues: record || {
      greasy_fleece_yield: 0,
      clean_fleece_yield: 0,
      staple_length: 0,
      fibre_diameter: 0,
      medullation_percent: 0,
      crimps: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="greasy_fleece_yield">Greasy Fleece Yield</Label>
          <Input
            id="greasy_fleece_yield"
            type="number"
            step="0.01"
            {...register("greasy_fleece_yield")}
          />
          {errors.greasy_fleece_yield && (
            <p className="text-red-500 text-sm">
              {String(errors.greasy_fleece_yield.message)}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="clean_fleece_yield">Clean Fleece Yield</Label>
          <Input
            id="clean_fleece_yield"
            type="number"
            step="0.01"
            {...register("clean_fleece_yield")}
          />
          {errors.clean_fleece_yield && (
            <p className="text-red-500 text-sm">
              {String(errors.clean_fleece_yield.message)}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="staple_length">Staple Length</Label>
          <Input
            id="staple_length"
            type="number"
            step="0.01"
            {...register("staple_length")}
          />
          {errors.staple_length && (
            <p className="text-red-500 text-sm">
              {String(errors.staple_length.message)}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="fibre_diameter">Fibre Diameter</Label>
          <Input
            id="fibre_diameter"
            type="number"
            step="0.01"
            {...register("fibre_diameter")}
          />
          {errors.fibre_diameter && (
            <p className="text-red-500 text-sm">
              {String(errors.fibre_diameter.message)}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="medullation_percent">Medullation (%)</Label>
          <Input
            id="medullation_percent"
            type="number"
            step="0.01"
            {...register("medullation_percent")}
          />
          {errors.medullation_percent && (
            <p className="text-red-500 text-sm">
              {String(errors.medullation_percent.message)}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="crimps">Crimps</Label>
          <Input
            id="crimps"
            type="number"
            step="0.01"
            {...register("crimps")}
          />
          {errors.crimps && (
            <p className="text-red-500 text-sm">
              {String(errors.crimps.message)}
            </p>
          )}
        </div>
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
