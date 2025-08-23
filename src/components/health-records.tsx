// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Plus, Edit, Trash2 } from "lucide-react";
// import { HealthRecordForm } from "@/components/health-record-form";
// // import { getHealthRecords, deleteHealthRecord } from "@/lib/api/health-records"

// export function HealthRecords({ sheepId }: HealthRecordsProps) {
//   const [records, setRecords] = useState<HealthRecord[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingRecord, setEditingRecord] = useState(null);

//   const loadRecords = async () => {
//     try {
//       setLoading(true);
//       //   const data = await getHealthRecords(sheepId)
//     //   setRecords(data);
//     } catch (error) {
//       console.error("Failed to load health records:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadRecords();
//   }, [sheepId]);

//   const handleFormSubmit = () => {
//     setShowForm(false);
//     setEditingRecord(null);
//     loadRecords();
//   };

//   const handleEdit = (record: any) => {
//     setEditingRecord(record);
//     setShowForm(true);
//   };

//   const handleDelete = async (id: string) => {
//     if (confirm("Are you sure you want to delete this health record?")) {
//       try {
//         // await deleteHealthRecord(id)
//         loadRecords();
//       } catch (error) {
//         console.error("Failed to delete health record:", error);
//       }
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const getRecordTypeColor = (type: string) => {
//     switch (type) {
//       case "checkup":
//         return "bg-green-100 text-green-800";
//       case "illness":
//         return "bg-red-100 text-red-800";
//       case "injury":
//         return "bg-orange-100 text-orange-800";
//       case "treatment":
//         return "bg-blue-100 text-blue-800";
//       case "surgery":
//         return "bg-purple-100 text-purple-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   if (showForm) {
//     return (
//       <HealthRecordForm
//         sheepId={sheepId}
//         record={editingRecord || undefined}
//         onSubmit={handleFormSubmit}
//         onCancel={() => {
//           setShowForm(false);
//           setEditingRecord(null);
//         }}
//       />
//     );
//   }

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle>Health Records ({records.length})</CardTitle>
//         <Button
//           onClick={() => setShowForm(true)}
//           className="flex items-center gap-2"
//         >
//           <Plus className="h-4 w-4" />
//           Add Health Record
//         </Button>
//       </CardHeader>
//       <CardContent>
//         {loading ? (
//           <div className="text-center py-8 text-muted-foreground">
//             <p>Loading health records...</p>
//           </div>
//         ) : records.length === 0 ? (
//           <div className="text-center py-8 text-muted-foreground">
//             <p>
//               No health records found. Click "Add Health Record" to get started.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {records.map((record) => (
//               <div key={record.id} className="border rounded-lg p-4 bg-card">
//                 <div className="flex justify-between items-start mb-3">
//                   <div className="flex items-center gap-2">
//                     <Badge className={getRecordTypeColor(record.record_type)}>
//                       {record.record_type}
//                     </Badge>
//                     <span className="text-sm text-muted-foreground">
//                       {formatDate(record.record_date)}
//                     </span>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => handleEdit(record)}
//                     >
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => handleDelete(record.id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <div>
//                     <span className="font-medium text-sm">Description:</span>
//                     <p className="text-muted-foreground">
//                       {record.description}
//                     </p>
//                   </div>

//                   {record.treatment && (
//                     <div>
//                       <span className="font-medium text-sm">Treatment:</span>
//                       <p className="text-muted-foreground">
//                         {record.treatment}
//                       </p>
//                     </div>
//                   )}

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
//                     {record.veterinarian && (
//                       <div>
//                         <span className="font-medium text-sm">
//                           Veterinarian:
//                         </span>
//                         <p className="text-muted-foreground">
//                           {record.veterinarian}
//                         </p>
//                       </div>
//                     )}

//                     {record.cost && (
//                       <div>
//                         <span className="font-medium text-sm">Cost:</span>
//                         <p className="text-muted-foreground">
//                           ${record.cost.toFixed(2)}
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   {record.notes && (
//                     <div className="mt-3 pt-3 border-t">
//                       <span className="font-medium text-sm">Notes:</span>
//                       <p className="text-muted-foreground text-sm">
//                         {record.notes}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
