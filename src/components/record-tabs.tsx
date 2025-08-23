// "use client";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { HealthRecords } from "@/components/health-records";
// import { GrowthRecords } from "@/components/growth-records";
// import { TransferRecords } from "@/components/transfer-records";
// import { VaccineRecords } from "@/components/vaccine-records";
// import { WoolRecords } from "@/components/wool-records";

// interface RecordTabsProps {
//   sheepId: string;
// }

// export function RecordTabs({ sheepId }: RecordTabsProps) {
//   return (
//     <Tabs defaultValue="health" className="w-full">
//       <TabsList className="grid w-full grid-cols-5">
//         <TabsTrigger value="health">Health</TabsTrigger>
//         <TabsTrigger value="growth">Growth</TabsTrigger>
//         <TabsTrigger value="transfers">Transfers</TabsTrigger>
//         <TabsTrigger value="vaccines">Vaccines</TabsTrigger>
//         <TabsTrigger value="wool">Wool</TabsTrigger>
//       </TabsList>

//       <TabsContent value="health" className="mt-6">
//         <HealthRecords sheepId={sheepId} />
//       </TabsContent>

//       <TabsContent value="growth" className="mt-6">
//         <GrowthRecords sheepId={sheepId} />
//       </TabsContent>

//       <TabsContent value="transfers" className="mt-6">
//         <TransferRecords sheepId={sheepId} />
//       </TabsContent>

//       <TabsContent value="vaccines" className="mt-6">
//         <VaccineRecords sheepId={sheepId} />
//       </TabsContent>

//       <TabsContent value="wool" className="mt-6">
//         <WoolRecords sheepId={sheepId} />
//       </TabsContent>
//     </Tabs>
//   );
// }
