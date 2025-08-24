"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SheepList } from "@/components/sheep-list";
import { SheepForm } from "@/components/farm/sheep-form";
import { useAuth } from "@clerk/nextjs";
import { loadCounts } from "@/lib/api/counts-api";

export default function FarmDashboardPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedSheepId, setSelectedSheepId] = useState<string | undefined>(
    undefined
  );
  const [sheepCount, setSheepCount] = useState(0);
  const [transferCount, setTransferCount] = useState(0);
  const [recievedCount, setRecievedCount] = useState(0);

  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const counts = await loadCounts(userId);
      setSheepCount(counts.sheepCount ?? 0);
      setTransferCount(counts.transferCount ?? 0);
      setRecievedCount(counts.recievedCount ?? 0);
    })();
  }, [userId]);

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedSheepId(undefined);
  };

  const handleAddSheep = () => {
    setSelectedSheepId(undefined);
    setShowForm(true);
  };

  const handleEditSheep = (id: string) => {
    setSelectedSheepId(id);
    setShowForm(true);
  };

  const handleSheepClick = (sheepId: string) => {
    console.log("clicked");
    router.push(`/farm/dashboard/sheep/${sheepId}`);
  };

  return (
    <div className="p-4 bg-white space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Farm Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <p className="text-muted-foreground mb-4">
            Manage your sheep inventory and track important information.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border bg-gray-50">
              <p className="text-sm text-muted-foreground">Total Sheep</p>
              <p className="text-2xl font-bold">{sheepCount}</p>
            </div>

            <div className="p-4 rounded-lg border bg-gray-50">
              <p className="text-sm text-muted-foreground">Transfer Count</p>
              <p className="text-2xl font-bold">{transferCount}</p>
            </div>

            <div className="p-4 rounded-lg border bg-gray-50">
              <p className="text-sm text-muted-foreground">Recieved Count</p>
              <p className="text-2xl font-bold">{recievedCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {showForm ? (
        <SheepForm
          sheepId={selectedSheepId}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <SheepList
          onAddSheep={handleAddSheep}
          onEditSheep={handleEditSheep}
          onSheepClick={handleSheepClick}
        />
      )}
    </div>
  );
}
