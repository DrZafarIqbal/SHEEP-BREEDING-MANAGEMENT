import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function FarmDashboardPage() {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Farm Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to the farm dashboard.</p>
        </CardContent>
      </Card>
    </div>
  );
}