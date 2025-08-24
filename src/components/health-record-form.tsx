"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const healthRecordSchema = z.object({
  event_date: z.string().min(1, "Event date is required."),
  event_type: z.string().min(1, "Event type is required."),
  description: z.string().min(1, "Description is required."),
});

export function HealthRecordForm({ sheepId, record, onSubmit, onCancel }: any) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(healthRecordSchema),
    defaultValues: record || {
      event_date: new Date().toISOString().split("T")[0],
      event_type: "",
      description: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="event_date">Event Date</Label>
        <Input id="event_date" type="date" {...register("event_date")} />
        {errors.event_date?.message && (
          <p className="text-red-500 text-sm">
            {String(errors.event_date.message)}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="event_type">Event Type</Label>
        <Controller
          name="event_type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select an event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checkup">Check-up</SelectItem>
                <SelectItem value="illness">Illness</SelectItem>
                <SelectItem value="injury">Injury</SelectItem>
                <SelectItem value="treatment">Treatment</SelectItem>
                <SelectItem value="surgery">Surgery</SelectItem>
                <SelectItem value="vaccination">Vaccination</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.event_type && (
          <p className="text-red-500 text-sm">
            {String(errors.event_type.message)}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500 text-sm">
            {String(errors.description.message)}
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
