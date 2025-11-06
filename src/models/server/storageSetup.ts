import { Permission } from "node-appwrite";
import { imagesBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket({
      bucketId: imagesBucket,
    });
    console.log("Storage Connected");
  } catch {
    try {
      await storage.createBucket({
        bucketId: imagesBucket,
        name: imagesBucket,
        permissions: [
          Permission.create("user"),
          Permission.read("users"),
          Permission.read("any"),
          Permission.update("user"),
          Permission.delete("user"),
        ],
        allowedFileExtensions: ["jpg", "png", "gif", "jpeg", "webp", "heic"],
      });

      console.log("Storage Created");
      console.log("Storage Connected");
    } catch (error) {
      console.error("Error creating storage:", error);
    }
  }
}
