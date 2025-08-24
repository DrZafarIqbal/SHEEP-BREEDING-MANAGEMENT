import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSheep,
  searchSheep,
  getSheepById,
  createSheep,
  updateSheep,
  deleteSheep,
} from "../api/sheep-api";
import { toast } from "sonner";

export const useSheep = (page: number, limit: number, userId: string) => {
  return useQuery({
    queryKey: ["sheep", page, limit, userId],
    queryFn: () => fetchSheep(page, limit, userId),
    enabled: !!userId,
  });
};

export const useSearchSheep = (query: string, userId: string) => {
  return useQuery({
    queryKey: ["sheepSearch", query, userId],
    queryFn: () => searchSheep(query, userId),
    enabled: !!query && !!userId,
  });
};

export const useSheepById = (id: string) => {
  return useQuery({
    queryKey: ["sheep", id],
    queryFn: () => getSheepById(id),
    enabled: !!id,
  });
};

export const useCreateSheep = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSheep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sheep"] });
      toast.success("Sheep created successfully.");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateSheep = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSheep,
    onSuccess: (data: any, variables: any) => {
      queryClient.invalidateQueries({ queryKey: ["sheep"] });
      queryClient.invalidateQueries({ queryKey: ["sheep", variables.id] });
      toast.success("Sheep updated successfully.");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteSheep = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSheep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sheep"] });
      toast.success("Sheep deleted successfully.");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
