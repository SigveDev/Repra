import { Permission } from "node-appwrite";
import { db, friendsTable } from "../../../name";
import { tablesDB } from "../../config";

export default async function createFriendsTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: friendsTable,
    name: friendsTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log(`Created table: ${friendsTable}`);

  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: friendsTable,
      key: "userId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: friendsTable,
      key: "friendId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createEnumColumn({
      databaseId: db,
      tableId: friendsTable,
      key: "status",
      elements: ["pending", "accepted", "rejected"],
      required: true,
      array: false,
    }),
  ]);
  console.log(`Created columns in table: ${friendsTable}`);
}
