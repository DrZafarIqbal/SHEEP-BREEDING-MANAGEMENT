"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SheepDetail({ sheep }: any) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getSheepTypeColor = (type: string | null) => {
    switch (type) {
      case "adult":
        return "bg-green-100 text-green-800";
      case "hogget":
        return "bg-blue-100 text-blue-800";
      case "weaner":
        return "bg-yellow-100 text-yellow-800";
      case "lamb":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateAge = (dob: string | null) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    const ageInDays = Math.floor(
      (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (ageInDays < 30) {
      return `${ageInDays} days`;
    } else if (ageInDays < 365) {
      const months = Math.floor(ageInDays / 30);
      return `${months} month${months > 1 ? "s" : ""}`;
    } else {
      const years = Math.floor(ageInDays / 365);
      const remainingMonths = Math.floor((ageInDays % 365) / 30);
      return `${years} year${years > 1 ? "s" : ""}${
        remainingMonths > 0
          ? ` ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`
          : ""
      }`;
    }
  };

  return (
    <Card className={sheep.dead ? "border-red-200 bg-red-50" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            Tag: {sheep.tag_number}
            <Badge className={getSheepTypeColor(sheep.sheep_type)}>
              {sheep.sheep_type}
            </Badge>
            {sheep.dead && <Badge variant="destructive">Deceased</Badge>}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Added: {formatDate(sheep.created_at)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="font-semibold mb-3">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <span className="font-medium text-sm">Branding ID:</span>
              <p className="text-muted-foreground">
                {sheep.branding_id || "N/A"}
              </p>
            </div>
            <div>
              <span className="font-medium text-sm">Gender:</span>
              <p className="text-muted-foreground capitalize">
                {sheep.gender || "N/A"}
              </p>
            </div>
            <div>
              <span className="font-medium text-sm">Breed:</span>
              <p className="text-muted-foreground">{sheep.breed || "N/A"}</p>
            </div>
            <div>
              <span className="font-medium text-sm">Date of Birth:</span>
              <p className="text-muted-foreground">{formatDate(sheep.dob)}</p>
            </div>
            <div>
              <span className="font-medium text-sm">Age:</span>
              <p className="text-muted-foreground">{calculateAge(sheep.dob)}</p>
            </div>
            <div>
              <span className="font-medium text-sm">Status:</span>
              <p className="text-muted-foreground">{sheep.status || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Birth Information */}
        <div>
          <h3 className="font-semibold mb-3">Birth Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <span className="font-medium text-sm">Birth Weight:</span>
              <p className="text-muted-foreground">
                {sheep.birth_weight ? `${sheep.birth_weight} kg` : "N/A"}
              </p>
            </div>
            <div>
              <span className="font-medium text-sm">Birth Type:</span>
              <p className="text-muted-foreground">
                {sheep.birth_type || "N/A"}
              </p>
            </div>
            <div>
              <span className="font-medium text-sm">Branding Date:</span>
              <p className="text-muted-foreground">
                {formatDate(sheep.branding_date)}
              </p>
            </div>
          </div>
        </div>

        {/* Parentage */}
        {(sheep.sire_branding_id || sheep.dam_branding_id) && (
          <div>
            <h3 className="font-semibold mb-3">Parentage</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sheep.sire_branding_id && (
                <div>
                  <span className="font-medium text-sm">Sire Branding ID:</span>
                  <p className="text-muted-foreground">
                    {sheep.sire_branding_id}
                  </p>
                </div>
              )}
              {sheep.dam_branding_id && (
                <div>
                  <span className="font-medium text-sm">Dam Branding ID:</span>
                  <p className="text-muted-foreground">
                    {sheep.dam_branding_id}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Death Information */}
        {sheep.dead && (
          <div className="border-t border-red-200 pt-4">
            <h3 className="font-semibold mb-3 text-red-800">
              Death Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-sm">Cause of Death:</span>
                <p className="text-muted-foreground">
                  {sheep.cause_of_death || "N/A"}
                </p>
              </div>
              <div>
                <span className="font-medium text-sm">Death Date:</span>
                <p className="text-muted-foreground">
                  {formatDate(sheep.death_date)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        {sheep.notes && (
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Notes</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {sheep.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
