import { tablesDB } from "@/models/client/config";
import { Query, Models } from "appwrite";
import { db, workoutTable, planTable } from "@/models/name";
import { Plan } from "@/types/plansType";
import { Workout } from "@/types/workoutsType";

export const GetTopPlans = async () => {
  const lastWorkouts = (await tablesDB.listRows({
    databaseId: db,
    tableId: workoutTable,
    queries: [Query.orderDesc("endedAt"), Query.limit(10)],
  })) as Models.RowList<Workout>;

  const planIds = Array.from(
    new Set(lastWorkouts.rows.map((workout) => workout.planId).filter(Boolean))
  );

  if (planIds.length === 0) return [];

  const plans = (await tablesDB.listRows({
    databaseId: db,
    tableId: planTable,
    queries: [Query.equal("$id", planIds), Query.limit(10)],
  })) as Models.RowList<Plan>;

  return plans.rows;
};
