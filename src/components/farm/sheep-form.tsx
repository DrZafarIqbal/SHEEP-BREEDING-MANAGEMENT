"use client";

import type React from "react";
import { useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  useCreateSheep,
  useUpdateSheep,
  useSheepById,
} from "@/lib/hooks/use-sheep";
import { sheepSchema, SheepFormData } from "@/lib/validators/sheep-validator";

interface SheepFormProps {
  sheepId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const formatDateForInput = (
  dateValue: string | Date | null | undefined
): string => {
  if (!dateValue) return "";

  try {
    let dateStr: string;

    if (dateValue instanceof Date) {
      const year = dateValue.getFullYear();
      const month = String(dateValue.getMonth() + 1).padStart(2, "0");
      const day = String(dateValue.getDate()).padStart(2, "0");
      dateStr = `${year}-${month}-${day}`;
    } else if (typeof dateValue === "string") {
      if (dateValue.includes("T")) {
        dateStr = dateValue.split("T")[0];
      } else if (dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
        dateStr = dateValue;
      } else {
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) return "";

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        dateStr = `${year}-${month}-${day}`;
      }
    } else {
      return "";
    }

    if (!dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return "";

    return dateStr;
  } catch (error) {
    console.warn("Date formatting error:", error, "for value:", dateValue);
    return "";
  }
};

const parseDateFromInput = (dateString: string): Date | null => {
  if (!dateString || !dateString.match(/^\d{4}-\d{2}-\d{2}$/)) return null;

  try {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
};

const transformSheepDataForForm = (data: any): Partial<SheepFormData> => {
  if (!data) return {};

  console.log("Raw sheep data from API:", data);

  const transformed = {
    ...data,
    dob: data.dob
      ? data.dob instanceof Date
        ? data.dob
        : new Date(data.dob)
      : null,
    branding_date: data.branding_date
      ? data.branding_date instanceof Date
        ? data.branding_date
        : new Date(data.branding_date)
      : null,
    death_date: data.death_date
      ? data.death_date instanceof Date
        ? data.death_date
        : new Date(data.death_date)
      : null,
    // Ensure numeric fields are numbers or undefined
    birth_weight: data.birth_weight ? Number(data.birth_weight) : undefined,
    // Ensure boolean fields are booleans
    dead: Boolean(data.dead),
    // Ensure string fields are strings or empty strings
    tag_number: data.tag_number?.toString() || "",
    branding_id: data.branding_id?.toString() || "",
    gender: data.gender || "",
    breed: data.breed || "",
    sire_branding_id: data.sire_branding_id?.toString() || "",
    dam_branding_id: data.dam_branding_id?.toString() || "",
    status: data.status?.toString() || "",
    sheep_type: data.sheep_type || "lamb",
    birth_type: data.birth_type?.toString() || "",
    cause_of_death: data.cause_of_death?.toString() || "",
    notes: data.notes?.toString() || "",
    farm_id: data.farm_id?.toString() || "",
  };

  console.log("Transformed data for form:", transformed);
  return transformed;
};

export function SheepForm({ sheepId, onSuccess, onCancel }: SheepFormProps) {
  const { userId } = useAuth();
  const { data: sheepData, isLoading: isLoadingSheep } = useSheepById(
    sheepId || ""
  );
  const createSheepMutation = useCreateSheep();
  const updateSheepMutation = useUpdateSheep();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<SheepFormData>({
    resolver: zodResolver(sheepSchema),
    defaultValues: {
      farm_id: userId as string,
      sheep_type: "lamb",
      dead: false,
    },
  });

  const resetForm = useCallback(
    (data: any) => {
      const transformedData = transformSheepDataForForm(data);
      console.log("Resetting form with data:", transformedData);
      reset(transformedData);
    },
    [reset]
  );

  useEffect(() => {
    if (sheepData && sheepId) {
      resetForm(sheepData);
    }
  }, [sheepData, sheepId, resetForm]);

  const onSubmit = async (data: SheepFormData) => {
    try {
      const payload = {
        ...data,
        birth_weight: data.birth_weight || null,
      };

      console.log("Final payload for API:", payload);

      if (sheepId) {
        console.log("Updating sheep with ID:", sheepId);
        await updateSheepMutation.mutateAsync(
          { id: sheepId, ...payload },
          {
            onSuccess: () => {
              console.log("Update successful");
              onSuccess();
            },
            onError: (error: any) => {
              console.error("Update failed:", error);
            },
          }
        );
      } else {
        console.log("Creating new sheep");
        await createSheepMutation.mutateAsync(payload, {
          onSuccess: () => {
            console.log("Create successful");
            onSuccess();
          },
          onError: (error: any) => {
            console.error("Create failed:", error);
          },
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const isDead = watch("dead");
  const isLoading =
    createSheepMutation.isPending || updateSheepMutation.isPending;

  if (isLoadingSheep && sheepId) {
    return (
      <Card className="bg-white">
        <CardContent className="flex items-center justify-center p-8">
          <div>Loading sheep data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{sheepId ? "Edit Sheep" : "Add New Sheep"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tag_number">Tag Number *</Label>
              <Input
                id="tag_number"
                {...register("tag_number")}
                placeholder="Enter tag number"
              />
              {errors.tag_number && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.tag_number.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="branding_id">Branding ID</Label>
              <Input
                id="branding_id"
                {...register("branding_id")}
                placeholder="Enter branding ID"
              />
              {errors.branding_id && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.branding_id.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="branding_date">Branding Date</Label>
              <Controller
                name="branding_date"
                control={control}
                render={({ field }) => (
                  <Input
                    id="branding_date"
                    type="date"
                    value={formatDateForInput(field.value)}
                    onChange={(e) => {
                      const dateValue = e.target.value;
                      field.onChange(
                        dateValue ? parseDateFromInput(dateValue) : null
                      );
                    }}
                  />
                )}
              />
              {errors.branding_date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.branding_date.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="breed">Breed</Label>
              <Controller
                name="breed"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Breed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kashmir Merino">
                        Kashmir Merino
                      </SelectItem>
                      <SelectItem value="Australian Merino">
                        Australian Merino
                      </SelectItem>
                      <SelectItem value="Texel">Texel</SelectItem>
                      <SelectItem value="Crossbred">Crossbred</SelectItem>
                      <SelectItem value="Corriedale">Corriedale</SelectItem>
                      <SelectItem value="Finn">Finn</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.breed && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.breed.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <Input
                    id="dob"
                    type="date"
                    value={formatDateForInput(field.value)}
                    onChange={(e) => {
                      const dateValue = e.target.value;
                      field.onChange(
                        dateValue ? parseDateFromInput(dateValue) : null
                      );
                    }}
                  />
                )}
              />
              {errors.dob && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="sire_branding_id">Sire Branding ID</Label>
              <Input
                id="sire_branding_id"
                {...register("sire_branding_id")}
                placeholder="Father's branding ID"
              />
              {errors.sire_branding_id && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.sire_branding_id.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="dam_branding_id">Dam Branding ID</Label>
              <Input
                id="dam_branding_id"
                {...register("dam_branding_id")}
                placeholder="Mother's branding ID"
              />
              {errors.dam_branding_id && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dam_branding_id.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                {...register("status")}
                placeholder="Current status"
              />
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="sheep_type">Sheep Type</Label>
              <Controller
                name="sheep_type"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || "lamb"}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adult">Adult</SelectItem>
                      <SelectItem value="hogget">Hogget</SelectItem>
                      <SelectItem value="weaner">Weaner</SelectItem>
                      <SelectItem value="lamb">Lamb</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.sheep_type && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.sheep_type.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="birth_weight">Birth Weight (kg)</Label>
              <Input
                id="birth_weight"
                type="number"
                step="0.01"
                min="0"
                {...register("birth_weight", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" ? undefined : Number(value),
                })}
                placeholder="Weight in kg"
              />
              {errors.birth_weight && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.birth_weight.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="birth_type">Birth Type</Label>
              <Input
                id="birth_type"
                {...register("birth_type")}
                placeholder="e.g., single, twin, triplet"
              />
              {errors.birth_type && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.birth_type.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="dead"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="dead"
                  checked={field.value || false}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              )}
            />
            <Label htmlFor="dead">Deceased</Label>
          </div>

          {isDead && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cause_of_death">Cause of Death</Label>
                <Input
                  id="cause_of_death"
                  {...register("cause_of_death")}
                  placeholder="Cause of death"
                />
                {errors.cause_of_death && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.cause_of_death.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="death_date">Death Date</Label>
                <Controller
                  name="death_date"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="death_date"
                      type="date"
                      value={formatDateForInput(field.value) || ""}
                      onChange={(e) => field.onChange(e.target.value || null)}
                    />
                  )}
                />
                {errors.death_date && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.death_date.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Additional notes about this sheep..."
              rows={3}
            />
            {errors.notes && (
              <p className="text-red-500 text-xs mt-1">
                {errors.notes.message}
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? sheepId
                  ? "Updating..."
                  : "Adding..."
                : sheepId
                ? "Update Sheep"
                : "Add Sheep"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
