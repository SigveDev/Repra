import { tablesDB, account } from "@/models/client/config";
import { Query, Models, Permission, ID, Role } from "appwrite";
import { db, workoutTable, planTable } from "@/models/name";
import { Plan } from "@/types/plansType";
import { Workout } from "@/types/workoutsType";

export const CreatePlan = async (name: string): Promise<Plan> => {
  const user = await account.get();
  const plan = (await tablesDB.createRow({
    databaseId: db,
    tableId: planTable,
    rowId: ID.unique(),
    data: {
      name: name,
      description: undefined,
      authorId: user.$id,
      isPrivate: true,
      imageUrl: undefined,
      exerciseIds: [],
    },
    permissions: [
      Permission.read(Role.user(user.$id)),
      Permission.update(Role.user(user.$id)),
      Permission.delete(Role.user(user.$id)),
    ],
  })) as Plan;
  return plan;
};

export const GetPlanFromId = async (planId: string): Promise<Plan> => {
  console.log("Getting plan with id:", planId);
  const plan = (await tablesDB.getRow({
    databaseId: db,
    tableId: planTable,
    rowId: planId,
  })) as Plan;
  console.log("Fetched plan:", plan);
  return plan;
};

export const UpdateImageUrl = async (
  planId: string,
  imageUrl: string | undefined
): Promise<Plan> => {
  const updatedPlan = (await tablesDB.updateRow({
    databaseId: db,
    tableId: planTable,
    rowId: planId,
    data: {
      imageUrl: imageUrl,
    },
  })) as Plan;
  return updatedPlan;
};

export const ChangePlanToPrivate = async (
  planId: string,
  isPrivate: boolean
): Promise<Plan> => {
  const updatedPlan = (await tablesDB.updateRow({
    databaseId: db,
    tableId: planTable,
    rowId: planId,
    data: {
      isPrivate: isPrivate,
    },
    permissions: [
      Permission.read(
        isPrivate ? Role.user((await account.get()).$id) : Role.users()
      ),
      Permission.update(Role.user((await account.get()).$id)),
      Permission.delete(Role.user((await account.get()).$id)),
    ],
  })) as Plan;
  return updatedPlan;
};

export const DeletePlan = async (planId: string): Promise<void> => {
  await tablesDB.deleteRow({
    databaseId: db,
    tableId: planTable,
    rowId: planId,
  });
};

export const UpdatePlanDetails = async (
  planId: string,
  name: string,
  exerciseIds?: string[]
): Promise<Plan> => {
  const updatedPlan = (await tablesDB.updateRow({
    databaseId: db,
    tableId: planTable,
    rowId: planId,
    data: {
      name: name,
      exerciseIds: exerciseIds,
    },
  })) as Plan;
  return updatedPlan;
};

export const GetMyPlans = async (): Promise<Plan[]> => {
  const user = await account.get();
  const plans = (await tablesDB.listRows({
    databaseId: db,
    tableId: planTable,
    queries: [Query.equal("authorId", user.$id), Query.orderDesc("$updatedAt")],
  })) as Models.RowList<Plan>;
  return plans.rows;
};

export const GetUserPlans = async (userId: string): Promise<Plan[]> => {
  const plans = (await tablesDB.listRows({
    databaseId: db,
    tableId: planTable,
    queries: [Query.equal("authorId", userId), Query.orderDesc("$updatedAt")],
  })) as Models.RowList<Plan>;
  return plans.rows;
};

export const GetTopPlans = async () => {
  const lastWorkouts = (await tablesDB.listRows({
    databaseId: db,
    tableId: workoutTable,
    queries: [Query.orderDesc("endedAt"), Query.limit(10)],
  })) as Models.RowList<Workout>;

  const planIds = Array.from(
    new Set(lastWorkouts.rows.map((workout) => workout.planId).filter(Boolean))
  );

  if (planIds.length === 0) {
    const plans = (await tablesDB.listRows({
      databaseId: db,
      tableId: planTable,
      queries: [Query.limit(6), Query.orderDesc("$updatedAt")],
    })) as Models.RowList<Plan>;

    return plans.rows;
  }

  const plans = (await tablesDB.listRows({
    databaseId: db,
    tableId: planTable,
    queries: [Query.equal("$id", planIds), Query.limit(10)],
  })) as Models.RowList<Plan>;

  return plans.rows;
};

export const GetPublicPlans = async (): Promise<Plan[]> => {
  const user = await account.get();
  const plans = (await tablesDB.listRows({
    databaseId: db,
    tableId: planTable,
    queries: [
      Query.equal("isPrivate", false),
      Query.notEqual("authorId", user.$id),
    ],
  })) as Models.RowList<Plan>;

  return plans.rows;
};
