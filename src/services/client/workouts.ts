import { account, tablesDB } from "@/models/client/config";
import { db, workoutTable } from "@/models/name";
import { Workout } from "@/types/workoutsType";
import { Query } from "appwrite";

export const GetWorkoutFromId = async (workoutId: string): Promise<Workout> => {
  const result = (await tablesDB.getRow<Workout>({
    databaseId: db,
    tableId: workoutTable,
    rowId: workoutId,
  })) as Workout;
  return result;
};

export const GetMyLatestWorkouts = async (): Promise<Workout[]> => {
  const user = await account.get();
  const result = await tablesDB.listRows<Workout>({
    databaseId: db,
    tableId: workoutTable,
    queries: [
      Query.equal("userId", user.$id),
      Query.orderDesc("$createdAt"),
      Query.isNotNull("endedAt"),
      Query.limit(8),
    ],
  });

  if (!result || result.total === 0) {
    return [];
  }

  return result.rows;
};
