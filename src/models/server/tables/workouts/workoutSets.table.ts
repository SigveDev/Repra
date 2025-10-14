import { db, workoutSetTable } from "@/models/name";
import { Permission } from "node-appwrite";
import { tablesDB } from "../../config";

export default async function createWorkoutSetsTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: workoutSetTable,
    name: workoutSetTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
    rowSecurity: true,
  });
  console.log(`Created table: ${workoutSetTable}`);

  await Promise.all([
    tablesDB.createIntegerColumn({
      databaseId: db,
      tableId: workoutSetTable,
      key: "setIndex",
      min: 0,
      max: 999999,
      required: true,
      array: false,
    }),
    tablesDB.createIntegerColumn({
      databaseId: db,
      tableId: workoutSetTable,
      key: "weight",
      min: 0,
      max: 999999,
      required: false,
      array: false,
    }),
    tablesDB.createEnumColumn({
      databaseId: db,
      tableId: workoutSetTable,
      key: "weightUnit",
      elements: ["kg", "lbs"],
      required: false,
      array: false,
    }),
    tablesDB.createIntegerColumn({
      databaseId: db,
      tableId: workoutSetTable,
      key: "reps",
      min: 0,
      max: 999999,
      required: false,
      array: false,
    }),
  ]);
  console.log(`Created columns in table: ${workoutSetTable}`);
}
