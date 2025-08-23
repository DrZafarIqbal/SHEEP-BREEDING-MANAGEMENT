"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SheepList } from "@/components/sheep-list";
import { SheepForm } from "@/components/sheep-form";
import { getSheep, deleteSheep } from "@/lib/api/sheep-api";
import { useAuth } from "@clerk/nextjs";
import { loadCounts } from "@/lib/api/counts-api";

export default function FarmDashboardPage() {
  const [sheep, setSheep] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sheepCount, setSheepCount] = useState(0);
  const [transferCount, setTransferCount] = useState(0);
  const [recievedCount, setRecievedCount] = useState(0);

  const router = useRouter();
  const { userId } = useAuth();

  const ITEMS_PER_PAGE = 10;

  const loadSheep = async (page = 1) => {
    try {
      setLoading(true);
      const result: any = await getSheep(page, ITEMS_PER_PAGE, userId);
      setSheep(result.sheep);
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to load sheep:", error);
    } finally {
      setLoading(false);
    }
  };

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
    loadSheep();
  }, [userId]);

  const handleSheepAdded = () => {
    setShowForm(false);
    loadSheep(currentPage);
  };

  const handleDeleteSheep = async (id: string) => {
    try {
      await deleteSheep(id);
      loadSheep(currentPage);
    } catch (error) {
      console.error("Failed to delete sheep:", error);
    }
  };

  const handleSheepClick = (sheepId: string) => {
    router.push(`farm/sheep/${sheepId}`);
  };

  const handlePageChange = (page: number) => {
    loadSheep(page);
  };

  const handleEditSheep = (id: string) => {
    console.log("edit");
  };

  return (
    <div className="p-4 bg-white space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Farm Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
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
          onSubmit={handleSheepAdded}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <SheepList
          sheep={sheep}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onAddSheep={() => setShowForm(true)}
          onDeleteSheep={handleDeleteSheep}
          onSheepClick={handleSheepClick}
          onPageChange={handlePageChange}
          onEditSheep={handleEditSheep}
        />
      )}
    </div>
  );
}
