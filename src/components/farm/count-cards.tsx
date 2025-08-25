import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSheepCounts } from "@/lib/api/counts-api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const CountCards = () => {
  const { userId } = useAuth();
  const {
    data: counts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sheepCounts", userId],
    queryFn: () => getSheepCounts(userId ?? ""),
    enabled: !!userId,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching counts</div>;

  const groups = [
    { key: "lambs", label: "Lambs" },
    { key: "weaners", label: "Weaners" },
    { key: "hoggets", label: "Hoggets" },
    { key: "adults", label: "Adults" },
    { key: "total", label: "Total", highlight: true },
  ] as const;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {groups.map((g) => {
        const group = counts?.[g.key];
        return (
          <Card
            key={g.key}
            className={`rounded-2xl shadow-sm transition hover:shadow-md ${
              g.label ? "bg-indigo-50 border-indigo-300" : "bg-white"
            }`}
          >
            <CardHeader>
              <CardTitle
                className={`text-lg font-bold ${
                  g.label ? "text-indigo-700" : "text-gray-800"
                }`}
              >
                {g.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Male</span>
                  <span className="font-medium text-gray-900">
                    {group?.male ?? 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Female</span>
                  <span className="font-medium text-gray-900">
                    {group?.female ?? 0}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span>Total</span>
                  <span
                    className={`font-semibold ${
                      g.label ? "text-indigo-700" : "text-gray-900"
                    }`}
                  >
                    {group?.total ?? 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CountCards;
