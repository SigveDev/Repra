import { db, workoutExerciseTable } from "@/models/name";
import { Permission } from "node-appwrite";
import { tablesDB } from "../../config";

export default async function createWorkoutExercisesTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: workoutExerciseTable,
    name: workoutExerciseTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
    rowSecurity: true,
  });
  console.log(`Created table: ${workoutExerciseTable}`);

  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: workoutExerciseTable,
      key: "exerciseId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: workoutExerciseTable,
      key: "setIds",
      size: 255,
      required: false,
      array: true,
    }),
    tablesDB.createDatetimeColumn({
      databaseId: db,
      tableId: workoutExerciseTable,
      key: "startedAt",
      required: true,
      array: false,
    }),
    tablesDB.createDatetimeColumn({
      databaseId: db,
      tableId: workoutExerciseTable,
      key: "endedAt",
      required: false,
      array: false,
    }),
  ]);
  console.log(`Created columns in table: ${workoutExerciseTable}`);
}
