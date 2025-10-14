import { db, exerciseRecordTable } from "@/models/name";
import { Permission } from "node-appwrite";
import { tablesDB } from "../../config";

export default async function createExerciseRecordsTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: exerciseRecordTable,
    name: exerciseRecordTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
    rowSecurity: true,
  });
  console.log(`Created table: ${exerciseRecordTable}`);

  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: exerciseRecordTable,
      key: "userId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: exerciseRecordTable,
      key: "exerciseId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: exerciseRecordTable,
      key: "workoutId",
      size: 255,
      required: false,
      array: false,
    }),
    tablesDB.createDatetimeColumn({
      databaseId: db,
      tableId: exerciseRecordTable,
      key: "performedAt",
      required: true,
      array: false,
    }),
  ]);
  console.log(`Created columns in table: ${exerciseRecordTable}`);
}
