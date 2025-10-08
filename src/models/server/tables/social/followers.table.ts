import { tablesDB } from "../../config";
import { db, followersTable } from "../../../name";
import { Permission } from "node-appwrite";

export default async function createFollowersTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: followersTable,
    name: followersTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log(`Created table: ${followersTable}`);

  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: followersTable,
      key: "followerId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: followersTable,
      key: "followedId",
      size: 255,
      required: true,
      array: false,
    }),
  ]);
  console.log(`Created columns in table: ${followersTable}`);
}
