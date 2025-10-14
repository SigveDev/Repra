import { db, exerciseTable } from "@/models/name";
import { Permission } from "node-appwrite";
import { tablesDB } from "../../config";

export default async function createExercisesTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: exerciseTable,
    name: exerciseTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
    rowSecurity: true,
  });
  console.log(`Created table: ${exerciseTable}`);

  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: exerciseTable,
      key: "authorId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: exerciseTable,
      key: "name",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: exerciseTable,
      key: "description",
      size: 1024,
      required: false,
      array: false,
    }),
    tablesDB.createBooleanColumn({
      databaseId: db,
      tableId: exerciseTable,
      key: "isPrivate",
      required: false,
      xdefault: false,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: exerciseTable,
      key: "imageUrl",
      size: 512,
      required: false,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: exerciseTable,
      key: "muscleGroupIds",
      size: 255,
      required: false,
      array: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: exerciseTable,
      key: "primaryTargetMuscleId",
      size: 255,
      required: false,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: exerciseTable,
      key: "secondaryTargetMuscleIds",
      size: 255,
      required: false,
      array: true,
    }),
    tablesDB.createIntegerColumn({
      databaseId: db,
      tableId: exerciseTable,
      key: "sets",
      min: 0,
      max: 999999,
      required: false,
      array: false,
    }),
    tablesDB.createIntegerColumn({
      databaseId: db,
      tableId: exerciseTable,
      key: "restTimeSeconds",
      min: 0,
      max: 999999,
      required: false,
      array: false,
    }),
  ]);
  console.log(`Created columns in table: ${exerciseTable}`);
}
