"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GrowthRecordForm } from './farm/growth-record-form';
import {
  getGrowthRecords,
  addGrowthRecord,
  updateGrowthRecord,
  deleteGrowthRecord,
} from '@/lib/api/growth-records-api';
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

export function GrowthRecords({ sheepId }: { sheepId: string }) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['growthRecords', sheepId, page],
    queryFn: () => getGrowthRecords(sheepId),
  });

  const addRecordMutation = useMutation({
    mutationFn: addGrowthRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['growthRecords', sheepId] });
      setIsDialogOpen(false);
    },
  });

  const updateRecordMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateGrowthRecord(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['growthRecords', sheepId] });
      setIsDialogOpen(false);
      setEditingRecord(null);
    },
  });

  const deleteRecordMutation = useMutation({
    mutationFn: deleteGrowthRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['growthRecords', sheepId] });
    },
  });

  const handleFormSubmit = (formData: any) => {
    if (editingRecord) {
      updateRecordMutation.mutate({ id: editingRecord.id, data: { ...formData, sheep_id: sheepId } });
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
        <h2 className="text-2xl font-bold">Growth Records</h2>
        <Button onClick={openDialogForAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Record
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRecord ? 'Edit' : 'Add'} Growth Record</DialogTitle>
          </DialogHeader>
          <GrowthRecordForm
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
              <TableHead>Age (days)</TableHead>
              <TableHead>Body Weight (kg)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((record: any) => (
              <TableRow key={record.id}>
                <TableCell>{record.age_days}</TableCell>
                <TableCell>{record.body_weight}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => openDialogForEdit(record)}>
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
                          This action cannot be undone. This will permanently delete the growth record.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteRecordMutation.mutate(record.id)}>
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
