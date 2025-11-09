import { tablesDB } from "@/models/server/config";
import { db, workoutTable } from "@/models/name";
import { Models, Query } from "node-appwrite";
import { Workout } from "@/types/workoutsType";

export const getActiveWorkout = async (userId: string): Promise<boolean> => {
  const workouts = (await tablesDB.listRows({
    databaseId: db,
    tableId: workoutTable,
    queries: [
      Query.equal("userId", userId),
      Query.isNull("endedAt"),
      Query.limit(1),
    ],
  })) as Models.RowList<Workout>;

  return workouts.total > 0;
};
