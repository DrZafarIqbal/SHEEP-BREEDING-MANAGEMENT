"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const vaccineDewormingSchema = z.object({
  name: z.string().min(1, "Name is required."),
  dose: z.string().min(1, "Dose is required."),
  date: z.string().min(1, "Date is required."),
  type: z.enum(["vaccine", "deworming"]),
});

export function VaccineDewormingForm({
  sheepId,
  record,
  onSubmit,
  onCancel,
}: any) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vaccineDewormingSchema),
    defaultValues: record || {
      name: "",
      dose: "",
      date: new Date().toISOString().split("T")[0],
      type: "vaccine",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{String(errors.name.message)}</p>
        )}
      </div>

      <div>
        <Label htmlFor="dose">Dose</Label>
        <Input id="dose" {...register("dose")} />
        {errors.dose && (
          <p className="text-red-500 text-sm">{String(errors.dose.message)}</p>
        )}
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...register("date")} />
        {errors.date && (
          <p className="text-red-500 text-sm">{String(errors.date.message)}</p>
        )}
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vaccine">Vaccine</SelectItem>
                <SelectItem value="deworming">Deworming</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && (
          <p className="text-red-500 text-sm">{String(errors.type.message)}</p>
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
