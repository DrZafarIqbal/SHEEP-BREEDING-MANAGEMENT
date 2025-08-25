import { supabase } from "@/lib/supabase";

export type SheepCounts = {
  lambs: {
    male: number;
    female: number;
    total: number;
  };
  weaners: {
    male: number;
    female: number;
    total: number;
  };
  hoggets: {
    male: number;
    female: number;
    total: number;
  };
  adults: {
    male: number;
    female: number;
    total: number;
  };
  total: {
    male: number;
    female: number;
    total: number;
  };
  transfers: {
    sent: number;
    received: number;
  };
};

export const getSheepCounts = async (userId: string): Promise<SheepCounts> => {
  // Get all sheep for the current user
  const { data: sheep, error: sheepError } = await supabase
    .from("sheep")
    .select("*")
    .eq("farm_id", userId);

  if (sheepError) {
    throw new Error(sheepError.message);
  }

  // Get transfer counts
  const { count: sentCount, error: sentError } = await supabase
    .from("transfers")
    .select("*", { count: "exact" })
    .eq("from", userId);

  if (sentError) {
    throw new Error(sentError.message);
  }

  const { count: receivedCount, error: receivedError } = await supabase
    .from("transfers")
    .select("*", { count: "exact" })
    .eq("to", userId);

  if (receivedError) {
    throw new Error(receivedError.message);
  }

  const now = new Date();
  const counts: SheepCounts = {
    lambs: { male: 0, female: 0, total: 0 },
    weaners: { male: 0, female: 0, total: 0 },
    hoggets: { male: 0, female: 0, total: 0 },
    adults: { male: 0, female: 0, total: 0 },
    total: { male: 0, female: 0, total: 0 },
    transfers: {
      sent: sentCount || 0,
      received: receivedCount || 0,
    },
  };

  sheep.forEach((s: any) => {
    const birthDate = new Date(s.date_of_birth);
    const now = new Date();

    // Calculate the exact age in months
    let ageInMonths =
      (now.getFullYear() - birthDate.getFullYear()) * 12 +
      (now.getMonth() - birthDate.getMonth());

    // Adjust if the current day is before the birth day in the current month
    if (now.getDate() < birthDate.getDate()) {
      ageInMonths--;
    }

    if (ageInMonths < 0) {
      ageInMonths = 0;
    }

    if (ageInMonths <= 6) {
      counts.lambs.total++;
      if (s.gender === "male") {
        counts.lambs.male++;
      } else {
        counts.lambs.female++;
      }
    } else if (ageInMonths <= 12) {
      counts.weaners.total++;
      if (s.gender === "male") {
        counts.weaners.male++;
      } else {
        counts.weaners.female++;
      }
    } else if (ageInMonths <= 24) {
      counts.hoggets.total++;
      if (s.gender === "male") {
        counts.hoggets.male++;
      } else {
        counts.hoggets.female++;
      }
    } else {
      counts.adults.total++;
      if (s.gender === "male") {
        counts.adults.male++;
      } else {
        counts.adults.female++;
      }
    }
  });

  counts.total.male =
    counts.lambs.male +
    counts.weaners.male +
    counts.hoggets.male +
    counts.adults.male;
  counts.total.female =
    counts.lambs.female +
    counts.weaners.female +
    counts.hoggets.female +
    counts.adults.female;
  counts.total.total =
    counts.lambs.total +
    counts.weaners.total +
    counts.hoggets.total +
    counts.adults.total;

  return counts;
};
