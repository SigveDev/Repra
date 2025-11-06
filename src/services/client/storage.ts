import { storage } from "@/models/client/config";
import { ID, ImageFormat } from "appwrite";
import { imagesBucket } from "@/models/name";

export const UploadNewImage = async (file: File) => {
  const response = await storage.createFile({
    bucketId: imagesBucket,
    fileId: ID.unique(),
    file: file,
  });
  const url = await storage.getFilePreview({
    bucketId: imagesBucket,
    fileId: response.$id,
    height: 512,
    width: 512,
    output: ImageFormat.Png,
  });
  return url;
};

export const DeleteImage = async (fileId: string) => {
  try {
    await storage.deleteFile({
      bucketId: imagesBucket,
      fileId: fileId,
    });
    return true;
  } catch (error) {
    console.log("Error deleting image:", error);
    return false;
  }
};
