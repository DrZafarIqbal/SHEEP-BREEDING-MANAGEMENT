"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HealthRecords } from "@/components/health-records";
import { GrowthRecords } from "@/components/growth-records";
import { TransferRecords } from "@/components/farm/transfer-records";
import { VaccineDewormingRecords } from "@/components/vaccine-deworming-records";
import { Card } from "../ui/card";
import { WoolRecords } from "@/components/farm/wool-records";

interface RecordTabsProps {
  sheepId: string;
}

export function RecordTabs({ sheepId }: RecordTabsProps) {
  return (
    <Tabs defaultValue="health" className="w-full">
      <TabsList className="grid w-full bg-gray-100 grid-cols-5">
        <TabsTrigger value="health">Health</TabsTrigger>
        <TabsTrigger value="growth">Growth</TabsTrigger>
        <TabsTrigger value="transfers">Transfers</TabsTrigger>
        <TabsTrigger value="vaccines">Vaccines</TabsTrigger>
        <TabsTrigger value="wool">Wool</TabsTrigger>
      </TabsList>

      <TabsContent value="health" className="mt-6">
        <Card className="px-4 bg-white">
          <HealthRecords sheepId={sheepId} />
        </Card>
      </TabsContent>
      <TabsContent value="growth" className="mt-6">
        <Card className="px-4 bg-white">
          <GrowthRecords sheepId={sheepId} />
        </Card>
      </TabsContent>

      <TabsContent value="vaccines" className="mt-6">
        <Card className="px-4 bg-white">
          <VaccineDewormingRecords sheepId={sheepId} />
        </Card>
      </TabsContent>

      <TabsContent value="wool" className="mt-6">
        <Card className="px-4 bg-white">
          <WoolRecords sheepId={sheepId} />
        </Card>
      </TabsContent>

      <TabsContent value="transfers" className="mt-6">
        <Card className="px-4 bg-white">
          <TransferRecords sheepId={sheepId} />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
