import { Permission } from "node-appwrite";
import { db, planTable } from "../../../name";
import { tablesDB } from "../../config";

export default async function createPlansTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: planTable,
    name: planTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log(`Created table: ${planTable}`);

  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: planTable,
      key: "authorId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: planTable,
      key: "name",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: planTable,
      key: "description",
      size: 1024,
      required: false,
      array: false,
    }),
    tablesDB.createBooleanColumn({
      databaseId: db,
      tableId: planTable,
      key: "isPrivate",
      required: false,
      xdefault: false,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: planTable,
      key: "imageUrl",
      size: 512,
      required: false,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: planTable,
      key: "exerciseIds",
      size: 255,
      required: false,
      array: true,
    }),
  ]);
  console.log(`Created columns in table: ${planTable}`);
}
