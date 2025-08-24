"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getFarms } from "@/lib/api/sheep-api";
import { useAuth } from "@clerk/nextjs";

const transferRecordSchema = z.object({
  reason: z.string().min(1, "Reason is required."),
  date: z.string().min(1, "Date is required."),
  to: z.string().min(1, "To Farm ID is required."),
});

export function TransferRecordForm({
  sheepId,
  record,
  onSubmit,
  onCancel,
}: any) {
  const { userId } = useAuth();
  const { data: farms, isLoading: isLoadingFarms } = useQuery({
    queryKey: ["farms"],
    queryFn: getFarms,
  });

  const currentFarm = farms?.find((farm: any) => farm.id === userId);
  const otherFarms = farms?.filter((farm: any) => farm.id !== userId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transferRecordSchema),
    defaultValues: record || {
      reason: "",
      date: new Date().toISOString().split("T")[0],
      to: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...register("date")} />
        {errors.date && (
          <p className="text-red-500 text-sm">{String(errors.date.message)}</p>
        )}
      </div>
      <div>
        <Label htmlFor="to">To Farm</Label>
        <Controller
          name="to"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a farm" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingFarms ? (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : (
                  otherFarms?.map((farm: any) => (
                    <SelectItem key={farm.id} value={farm.id}>
                      {farm.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          )}
        />
        {errors.to && (
          <p className="text-red-500 text-sm">{String(errors.to.message)}</p>
        )}
      </div>
      <div>
        <Label htmlFor="reason">Reason</Label>
        <Textarea id="reason" {...register("reason")} />
        {errors.reason && (
          <p className="text-red-500 text-sm">
            {String(errors.reason.message)}
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
