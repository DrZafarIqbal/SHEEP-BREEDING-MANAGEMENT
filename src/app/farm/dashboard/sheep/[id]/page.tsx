"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SheepDetail } from "@/components/farm/sheep-detail";
import { RecordTabs } from "@/components/farm/record-tabs";
import { useSheepById } from "@/lib/hooks/use-sheep";
import { Card } from "@/components/ui/card";

export default function SheepDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sheepId = params.id as string;

  const { data: sheep, isLoading, isError } = useSheepById(sheepId);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p>Loading sheep details...</p>
        </div>
      </div>
    );
  }

  if (isError || !sheep) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-red-600">
            {isError ? "Failed to load sheep details" : "Sheep not found"}
          </p>
          <Button
            onClick={() => router.push("/farm/dashboard")}
            className="mt-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => router.push("/farm/dashboard")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">
          Sheep Details - Tag: {sheep.tag_number}
        </h1>
      </div>

      <SheepDetail sheep={sheep} />
      <Card className="px-6 bg-white">
        <RecordTabs sheepId={sheepId} />
      </Card>
    </div>
  );
}
