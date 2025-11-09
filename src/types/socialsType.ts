import { Models } from "appwrite";

export interface Friend extends Models.Row {
  friendId: string;
  userId: string;
  status: "pending" | "accepted" | "rejected";
}

export interface Follower extends Models.Row {
  followingId: string;
  followerId: string;
}

export interface Subscribtion extends Models.Row {
  isLinked: boolean;
  userId: string;
  linkedId: string;
  type: "plan" | "group";
}
