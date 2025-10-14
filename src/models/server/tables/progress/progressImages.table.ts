import { db, progressImageTable } from "@/models/name";
import { Permission } from "node-appwrite";
import { tablesDB } from "../../config";

export default async function createProgressImagesTable() {
  await tablesDB.createTable({
    databaseId: db,
    tableId: progressImageTable,
    name: progressImageTable,
    permissions: [
      Permission.create("users"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
    rowSecurity: true,
  });
  console.log(`Created table: ${progressImageTable}`);

  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: progressImageTable,
      key: "userId",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: progressImageTable,
      key: "description",
      size: 1024,
      required: false,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: progressImageTable,
      key: "imageUrl",
      size: 512,
      required: true,
      array: false,
    }),
    tablesDB.createDatetimeColumn({
      databaseId: db,
      tableId: progressImageTable,
      key: "date",
      required: true,
      array: false,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: progressImageTable,
      key: "location",
      size: 255,
      required: true,
      array: false,
    }),
    tablesDB.createFloatColumn({
      databaseId: db,
      tableId: progressImageTable,
      key: "weight",
      min: 0,
      max: 9999,
      required: false,
      array: false,
    }),
    tablesDB.createEnumColumn({
      databaseId: db,
      tableId: progressImageTable,
      key: "weightUnit",
      elements: ["kg", "lbs"],
      required: false,
      array: false,
    }),
  ]);
  console.log(`Created columns in table: ${progressImageTable}`);
}
