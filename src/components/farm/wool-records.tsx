"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WoolRecordForm } from "./wool-record-form";
import {
  getWoolRecords,
  addWoolRecord,
  updateWoolRecord,
  deleteWoolRecord,
} from "@/lib/api/wool-records-api";
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

export function WoolRecords({ sheepId }: { sheepId: string }) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["woolRecords", sheepId, page],
    queryFn: () => getWoolRecords(sheepId),
  });

  const addRecordMutation = useMutation({
    mutationFn: addWoolRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["woolRecords", sheepId] });
      setIsDialogOpen(false);
    },
  });

  const updateRecordMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateWoolRecord(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["woolRecords", sheepId] });
      setIsDialogOpen(false);
      setEditingRecord(null);
    },
  });

  const deleteRecordMutation = useMutation({
    mutationFn: deleteWoolRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["woolRecords", sheepId] });
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
        <h2 className="text-2xl font-bold">Wool Records</h2>
        <Button onClick={openDialogForAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Record
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingRecord ? "Edit" : "Add"} Wool Record
            </DialogTitle>
          </DialogHeader>
          <WoolRecordForm
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
              <TableHead>Greasy Fleece Yield</TableHead>
              <TableHead>Clean Fleece Yield</TableHead>
              <TableHead>Staple Length</TableHead>
              <TableHead>Fibre Diameter</TableHead>
              <TableHead>Medullation (%)</TableHead>
              <TableHead>Crimps</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((record: any) => (
              <TableRow key={record.id}>
                <TableCell>{record.greasy_fleece_yield}</TableCell>
                <TableCell>{record.clean_fleece_yield}</TableCell>
                <TableCell>{record.staple_length}</TableCell>
                <TableCell>{record.fibre_diameter}</TableCell>
                <TableCell>{record.medullation_percent}</TableCell>
                <TableCell>{record.crimps}</TableCell>
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
                          delete the wool record.
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
