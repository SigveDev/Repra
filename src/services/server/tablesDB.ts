import { tablesDB } from "@/models/server/config";
import { db, exerciseTable } from "@/models/name";
import { Models, Query } from "node-appwrite";
import { Exercise } from "@/types/plansType";

export async function exercisesSearch(
  query: string | null
): Promise<Exercise[]> {
  if (!query || query.trim() === "") {
    const exerciseList = (await tablesDB.listRows({
      databaseId: db,
      tableId: exerciseTable,
      queries: [Query.equal("isPrivate", false), Query.limit(20)],
    })) as Models.RowList<Exercise>;
    return exerciseList.rows;
  } else {
    const exerciseList = (await tablesDB.listRows({
      databaseId: db,
      tableId: exerciseTable,
      queries: [
        Query.search("name", query),
        Query.equal("isPrivate", false),
        Query.limit(20),
      ],
    })) as Models.RowList<Exercise>;
    return exerciseList.rows;
  }
}
