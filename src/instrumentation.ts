import getOrCreateDB from "@/models/server/dbSetup";
import getOrCreateStorage from "@/models/server/storageSetup";

// handle registration of database and storage at app startup
export async function register() {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
}
