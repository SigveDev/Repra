import { Permission } from "node-appwrite";
import { db, subscriptionsTable } from "../../../name";
import { tablesDB } from "../../config";

export default async function createSubscriptionsTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: subscriptionsTable,
    name: subscriptionsTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log(`Created table: ${subscriptionsTable}`);

  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: subscriptionsTable,
      key: "userId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createEnumColumn({
      databaseId: db,
      tableId: subscriptionsTable,
      key: "type",
      elements: ["plan", "group"],
      required: true,
      array: false,
    }),
    tablesDB.createBooleanColumn({
      databaseId: db,
      tableId: subscriptionsTable,
      key: "isLinked",
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: subscriptionsTable,
      key: "linkedId",
      size: 255,
      required: false,
      array: false,
    }),
  ]);
  console.log(`Created columns in table: ${subscriptionsTable}`);
}
