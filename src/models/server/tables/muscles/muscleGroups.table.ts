import { db, muscleGroupTable } from "@/models/name";
import { Permission } from "node-appwrite";
import { tablesDB } from "../../config";

export default async function createMuscleGroupsTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: muscleGroupTable,
    name: muscleGroupTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log(`Created table: ${muscleGroupTable}`);

  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: muscleGroupTable,
      key: "name",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: muscleGroupTable,
      key: "description",
      size: 1024,
      required: false,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: muscleGroupTable,
      key: "muscleIds",
      size: 255,
      required: false,
      array: true,
    }),
  ]);
  console.log(`Created columns in table: ${muscleGroupTable}`);
}
