import { users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { Models, Query } from "node-appwrite";

export const isUsernameAvailable = async (
  username: string
): Promise<boolean> => {
  const userList = await users.list({
    queries: [Query.equal("$id", username)],
  });
  return userList.total === 0;
};

export const getUserProfileFromUserId = async (
  userId: string
): Promise<Models.User<UserPrefs>> => {
  const userProfile = (await users.get({
    userId: userId,
  })) as Models.User<UserPrefs>;
  return userProfile;
};
