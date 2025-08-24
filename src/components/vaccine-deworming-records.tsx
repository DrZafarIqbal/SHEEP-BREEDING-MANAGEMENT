"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { VaccineDewormingForm } from "./farm/vaccine-deworming-form";
import {
  getVaccineDewormingRecords,
  addVaccineDewormingRecord,
  updateVaccineDewormingRecord,
  deleteVaccineDewormingRecord,
} from "@/lib/api/vaccine-deworming-api";
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

export function VaccineDewormingRecords({ sheepId }: { sheepId: string }) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [filter, setFilter] = useState<"all" | "vaccine" | "deworming">("all");

  const { data, isLoading } = useQuery({
    queryKey: ["vaccineDewormingRecords", sheepId, page, filter],
    queryFn: () =>
      getVaccineDewormingRecords(
        sheepId,
        filter === "all" ? undefined : filter
      ),
  });

  const addRecordMutation = useMutation({
    mutationFn: addVaccineDewormingRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccineDewormingRecords", sheepId],
      });
      setIsDialogOpen(false);
    },
  });

  const updateRecordMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateVaccineDewormingRecord(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccineDewormingRecords", sheepId],
      });
      setIsDialogOpen(false);
      setEditingRecord(null);
    },
  });

  const deleteRecordMutation = useMutation({
    mutationFn: deleteVaccineDewormingRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccineDewormingRecords", sheepId],
      });
    },
  });

  const handleFormSubmit = (formData: any) => {
    if (editingRecord) {
      updateRecordMutation.mutate({
        id: editingRecord.id,
        data: { ...formData, sheep_id: sheepId },
      });
    } else {
      addRecordMutation.mutate({ ...formData, sheep_id: sheepId });
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
        <h2 className="text-2xl font-bold">Vaccine & Deworming Records</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "secondary" : "outline"}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("vaccine")}
            variant={filter === "vaccine" ? "secondary" : "outline"}
          >
            Vaccines
          </Button>
          <Button
            onClick={() => setFilter("deworming")}
            variant={filter === "deworming" ? "secondary" : "outline"}
          >
            Deworming
          </Button>
          <Button onClick={openDialogForAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add Record
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRecord ? "Edit" : "Add"} Record</DialogTitle>
          </DialogHeader>
          <VaccineDewormingForm
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
              <TableHead>Name</TableHead>
              <TableHead>Dose</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((record: any) => (
              <TableRow key={record.id}>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.dose}</TableCell>
                <TableCell>
                  {new Date(record.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{record.type}</TableCell>
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
                          delete the record.
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
