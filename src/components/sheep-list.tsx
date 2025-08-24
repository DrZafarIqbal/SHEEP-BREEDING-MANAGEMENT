"use client";

import { useState } from "react";
import type React from "react";
import { useAuth } from "@clerk/nextjs";
import {
  useSheep,
  useDeleteSheep,
  useSearchSheep,
} from "@/lib/hooks/use-sheep";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Search,
} from "lucide-react";

interface SheepListProps {
  onAddSheep: () => void;
  onEditSheep: (id: string) => void;
  onSheepClick: (id: string) => void;
}

export function SheepList({
  onAddSheep,
  onEditSheep,
  onSheepClick,
}: SheepListProps) {
  const { userId } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const { data, isLoading, isError } = useSheep(
    currentPage,
    limit,
    userId as string
  );
  const { data: searchResults } = useSearchSheep(searchTerm, userId as string);
  const deleteSheepMutation = useDeleteSheep();

  const sheep = searchTerm ? searchResults : data?.sheep || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = data?.totalPages || 0;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getSheepTypeColor = (type: string | null) => {
    switch (type) {
      case "adult":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "hogget":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "weaner":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "lamb":
        return "bg-pink-100 text-pink-800 hover:bg-pink-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (
      window.confirm(
        "Are you sure you want to delete this sheep? This action cannot be undone."
      )
    ) {
      deleteSheepMutation.mutate(id);
    }
  };

  const handleEditClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onEditSheep(id);
  };

  const handleViewClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onSheepClick(id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sheep Inventory ({totalCount})</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by tag..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={onAddSheep} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Sheep
          </Button>
        </div>
      </CardHeader>
      <CardContent className="bg-white">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Loading sheep...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            <p>Error loading sheep data.</p>
          </div>
        ) : sheep?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No sheep added yet. Click "Add Sheep" to get started.</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Tag #</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Branding ID</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Breed</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Weight (kg)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Parents</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sheep?.map((animal: any) => (
                    <TableRow
                      key={animal.id}
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                        animal.dead ? "bg-red-50" : ""
                      }`}
                      onClick={() => onSheepClick(animal.id)}
                    >
                      <TableCell className="font-medium">
                        {animal.tag_number}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getSheepTypeColor(animal.sheep_type)}
                          >
                            {animal.sheep_type || "N/A"}
                          </Badge>
                          {animal.dead && (
                            <Badge variant="destructive" className="text-xs">
                              Deceased
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {animal.branding_id || "N/A"}
                      </TableCell>

                      <TableCell className="text-muted-foreground capitalize">
                        {animal.gender || "N/A"}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {animal.breed || "N/A"}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {formatDate(animal.dob)}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {animal.birth_weight || "N/A"}
                      </TableCell>

                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="text-muted-foreground text-sm">
                            {animal.status || "N/A"}
                          </span>
                          {animal.dead && (
                            <div className="text-xs text-red-600">
                              <div>Cause: {animal.cause_of_death || "N/A"}</div>
                              <div>Date: {formatDate(animal.death_date)}</div>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-muted-foreground text-sm">
                        <div className="flex flex-col gap-1">
                          {animal.sire_branding_id && (
                            <div>♂ {animal.sire_branding_id}</div>
                          )}
                          {animal.dam_branding_id && (
                            <div>♀ {animal.dam_branding_id}</div>
                          )}
                          {!animal.sire_branding_id &&
                            !animal.dam_branding_id && <div>N/A</div>}
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleViewClick(e, animal.id)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleEditClick(e, animal.id)}
                            className="h-8 w-8 p-0 text-orange-600 hover:text-orange-800 hover:bg-orange-50"
                            title="Edit Sheep"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleDeleteClick(e, animal.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                            title="Delete Sheep"
                            disabled={deleteSheepMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && !searchTerm && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages} ({totalCount} total sheep)
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
