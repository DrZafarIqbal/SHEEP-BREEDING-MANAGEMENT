"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TransferRecordForm } from "./transfer-record-form";
import {
  getTransferRecords,
  addTransferRecord,
  updateTransferRecord,
  deleteTransferRecord,
} from "@/lib/api/transfer-records-api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { getFarms, updateSheep } from "@/lib/api/sheep-api";

export function TransferRecords({ sheepId }: { sheepId: string }) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [filter, setFilter] = useState<"all" | "from" | "to">("all");
  const { data: farms, isLoading: isLoadingFarms } = useQuery({
    queryKey: ["farms"],
    queryFn: getFarms,
  });

  const currentFarm = farms?.find((farm: any) => farm.id === userId);
  const { data, isLoading } = useQuery({
    queryKey: ["transferRecords", sheepId, page, filter],
    queryFn: () =>
      getTransferRecords(
        sheepId,
        currentFarm?.id,
        filter === "all" ? undefined : filter
      ),
  });

  const addRecordMutation = useMutation({
    mutationFn: addTransferRecord,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transferRecords", sheepId] });
      setIsDialogOpen(false);
      // Update sheep's farm_id
      updateSheepMutation.mutate({ id: sheepId, farm_id: data[0].to });
    },
  });

  const updateRecordMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateTransferRecord(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transferRecords", sheepId] });
      setIsDialogOpen(false);
      setEditingRecord(null);
      // Update sheep's farm_id
      updateSheepMutation.mutate({ id: sheepId, farm_id: data[0].to });
    },
  });

  const deleteRecordMutation = useMutation({
    mutationFn: deleteTransferRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transferRecords", sheepId] });
    },
  });

  const updateSheepMutation = useMutation({
    mutationFn: updateSheep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sheep", sheepId] });
    },
  });

  const handleFormSubmit = (formData: any) => {
    const data = {
      ...formData,
      sheep_id: sheepId,
      from: currentFarm?.id,
    };
    if (editingRecord) {
      updateRecordMutation.mutate({ id: editingRecord.id, data });
    } else {
      addRecordMutation.mutate(data);
    }
  };

  const openDialogForEdit = (record: any) => {
    setEditingRecord(record);
    setIsDialogOpen(true);
  };

  const openDialogForAdd = () => {
    setEditingRecord(null);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Transfer Records</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "secondary" : "outline"}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("from")}
            variant={filter === "from" ? "secondary" : "outline"}
          >
            Transferred From
          </Button>
          <Button
            onClick={() => setFilter("to")}
            variant={filter === "to" ? "secondary" : "outline"}
          >
            Transferred To
          </Button>
          <Button onClick={openDialogForAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add Record
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingRecord ? "Edit" : "Add"} Transfer Record
            </DialogTitle>
          </DialogHeader>
          <TransferRecordForm
            sheepId={sheepId}
            record={editingRecord}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((record: any) => (
              <TableRow key={record.id}>
                <TableCell>
                  {new Date(record.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{record.from_farm.name}</TableCell>
                <TableCell>{record.to_farm.name}</TableCell>
                <TableCell>{record.reason}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openDialogForEdit(record)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the transfer record.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteRecordMutation.mutate(record.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex justify-end space-x-2 mt-4">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={!data || data.length < 10}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
