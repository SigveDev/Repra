import { Permission } from "node-appwrite";
import { db, groupTable } from "../../../name";
import { tablesDB } from "../../config";

export default async function createGroupsTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: groupTable,
    name: groupTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
    rowSecurity: true,
  });
  console.log(`Created table: ${groupTable}`);

  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: groupTable,
      key: "authorId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: groupTable,
      key: "name",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: groupTable,
      key: "description",
      size: 1024,
      required: false,
      array: false,
    }),
    tablesDB.createBooleanColumn({
      databaseId: db,
      tableId: groupTable,
      key: "isPrivate",
      required: false,
      xdefault: false,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: groupTable,
      key: "imageUrl",
      size: 512,
      required: false,
      array: false,
    }),
    tablesDB.createBooleanColumn({
      databaseId: db,
      tableId: groupTable,
      key: "weekDependent",
      required: false,
      xdefault: false,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: groupTable,
      key: "planIds",
      size: 255,
      required: false,
      array: true,
    }),
  ]);
  console.log(`Created columns in table: ${groupTable}`);
}
