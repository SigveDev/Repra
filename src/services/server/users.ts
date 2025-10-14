import { users } from "@/models/server/config";
import { Query } from "node-appwrite";

export async function isUsernameAvailable(username: string): Promise<boolean> {
  const userList = await users.list({
    queries: [Query.equal("$id", username)],
  });
  return userList.total === 0;
}
