import { tablesDB, account } from "@/models/client/config";
import { Query, Models } from "appwrite";
import { db, friendsTable } from "@/models/name";
import { Friend } from "@/types/socialsType";

export const MyFriends = async (): Promise<Friend[]> => {
  const user = await account.get();
  const friends = (await tablesDB.listRows({
    databaseId: db,
    tableId: friendsTable,
    queries: [
      Query.equal("userId", user.$id),
      Query.equal("status", "accepted"),
    ],
  })) as Models.RowList<Friend>;

  if (!friends || friends.total === 0) {
    return [];
  }

  return friends.rows as Friend[];
};
