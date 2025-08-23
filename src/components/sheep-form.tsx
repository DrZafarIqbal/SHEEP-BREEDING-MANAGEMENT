"use client";

import type React from "react";
import { useState } from "react";
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
import { createSheep } from "@/lib/api/sheep-api";
import { useAuth } from "@clerk/nextjs";

interface SheepFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export function SheepForm({ onSubmit, onCancel }: SheepFormProps) {
  const { userId } = useAuth();

  const [formData, setFormData] = useState({
    tag_number: "",
    branding_id: "",
    branding_date: null,
    gender: "",
    breed: "",
    dob: "",
    sire_branding_id: "",
    dam_branding_id: "",
    notes: "",
    status: "",
    sheep_type: "lamb",
    birth_weight: null,
    birth_type: "",
    dead: false,
    cause_of_death: "",
    death_date: null,
    farm_id: userId,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        birth_weight: formData.birth_weight
          ? Number(formData.birth_weight)
          : null,
      };

      await createSheep(dataToSubmit);
      onSubmit();
    } catch (error) {
      console.error("Failed to create sheep:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof any,
    value: string | boolean | number | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Add New Sheep</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tag_number">Tag Number</Label>
              <Input
                id="tag_number"
                value={formData.tag_number}
                onChange={(e) =>
                  handleInputChange("tag_number", e.target.value)
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="branding_id">Branding ID</Label>
              <Input
                id="branding_id"
                value={formData.branding_id || ""}
                onChange={(e) =>
                  handleInputChange("branding_id", e.target.value)
                }
              />
            </div>

            <div>
              <Label htmlFor="branding_date">Branding Date</Label>
              <Input
                id="branding_date"
                type="date"
                value={formData.branding_date || ""}
                onChange={(e) =>
                  handleInputChange("branding_date", e.target.value)
                }
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="breed">Breed</Label>
              <Select
                onValueChange={(value) => handleInputChange("breed", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Breed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kashmir Merino">Kashmir Merino</SelectItem>
                  <SelectItem value="Australian Merino">
                    Australian Merino
                  </SelectItem>
                  <SelectItem value="Texel">Texel</SelectItem>
                  <SelectItem value="Crossbred">Crossbred</SelectItem>
                  <SelectItem value="Corriedale">Corriedale</SelectItem>
                  <SelectItem value="Finn">Finn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob || ""}
                onChange={(e) => handleInputChange("dob", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="sire_branding_id">Sire Branding ID</Label>
              <Input
                id="sire_branding_id"
                value={formData.sire_branding_id || ""}
                onChange={(e) =>
                  handleInputChange("sire_branding_id", e.target.value)
                }
              />
            </div>

            <div>
              <Label htmlFor="dam_branding_id">Dam Branding ID</Label>
              <Input
                id="dam_branding_id"
                value={formData.dam_branding_id || ""}
                onChange={(e) =>
                  handleInputChange("dam_branding_id", e.target.value)
                }
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                value={formData.status || ""}
                onChange={(e) => handleInputChange("status", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="sheep_type">Sheep Type</Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("sheep_type", value)
                }
                defaultValue="lamb"
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
            </div>

            <div>
              <Label htmlFor="birth_weight">Birth Weight</Label>
              <Input
                id="birth_weight"
                type="number"
                step="0.01"
                value={formData.birth_weight || ""}
                onChange={(e) =>
                  handleInputChange(
                    "birth_weight",
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                placeholder="kg"
              />
            </div>

            <div>
              <Label htmlFor="birth_type">Birth Type</Label>
              <Input
                id="birth_type"
                value={formData.birth_type || ""}
                onChange={(e) =>
                  handleInputChange("birth_type", e.target.value)
                }
                placeholder="e.g., single, twin, triplet"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="dead"
              checked={formData.dead}
              onCheckedChange={(checked) =>
                handleInputChange("dead", checked as boolean)
              }
            />
            <Label htmlFor="dead">Deceased</Label>
          </div>

          {formData.dead && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cause_of_death">Cause of Death</Label>
                <Input
                  id="cause_of_death"
                  value={formData.cause_of_death || ""}
                  onChange={(e) =>
                    handleInputChange("cause_of_death", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor="death_date">Death Date</Label>
                <Input
                  id="death_date"
                  type="date"
                  value={formData.death_date || ""}
                  onChange={(e) =>
                    handleInputChange("death_date", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Additional notes about this sheep..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Sheep"}
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
