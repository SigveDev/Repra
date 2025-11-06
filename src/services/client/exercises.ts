import { tablesDB } from "@/models/client/config";
import { db, exerciseTable } from "@/models/name";
import { Exercise } from "@/types/plansType";

export const GetExerciseFromId = async (
  exerciseId: string
): Promise<Exercise> => {
  const result = (await tablesDB.getRow<Exercise>({
    databaseId: db,
    tableId: exerciseTable,
    rowId: exerciseId,
  })) as Exercise;
  return result;
};
