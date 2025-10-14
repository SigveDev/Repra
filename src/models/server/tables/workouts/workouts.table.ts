import { db, workoutTable } from "@/models/name";
import { Permission } from "node-appwrite";
import { tablesDB } from "../../config";

export default async function createWorkoutsTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: workoutTable,
    name: workoutTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
    rowSecurity: true,
  });
  console.log(`Created table: ${workoutTable}`);

  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: workoutTable,
      key: "userId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: workoutTable,
      key: "planId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: workoutTable,
      key: "workoutExerciseIds",
      size: 255,
      required: false,
      array: true,
    }),
    tablesDB.createDatetimeColumn({
      databaseId: db,
      tableId: workoutTable,
      key: "startedAt",
      required: true,
      array: false,
    }),
    tablesDB.createDatetimeColumn({
      databaseId: db,
      tableId: workoutTable,
      key: "endedAt",
      required: false,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: workoutTable,
      key: "location",
      size: 1024,
      required: false,
      array: false,
    }),
    tablesDB.createIntegerColumn({
      databaseId: db,
      tableId: workoutTable,
      key: "rating",
      min: 0,
      max: 10,
      required: false,
      array: false,
    }),
  ]);
  console.log(`Created columns in table: ${workoutTable}`);
}
