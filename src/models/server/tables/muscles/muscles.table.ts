import { db, muscleTable } from "@/models/name";
import { Permission } from "node-appwrite";
import { tablesDB } from "../../config";

export default async function createMuscleTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: muscleTable,
    name: muscleTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
    rowSecurity: true,
  });
  console.log(`Created table: ${muscleTable}`);

  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: muscleTable,
      key: "name",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: muscleTable,
      key: "description",
      size: 1024,
      required: false,
      array: false,
    }),
  ]);
  console.log(`Created columns in table: ${muscleTable}`);
}
