import { Models } from "appwrite";

export interface Group extends Models.Row {
  name: string;
  description?: string;
  authorId: string;
  isPrivate: boolean;
  imageUrl?: string;
  weekDependent: boolean;
  planIds: string[];
}

export interface Plan extends Models.Row {
  name: string;
  description?: string;
  authorId: string;
  isPrivate: boolean;
  imageUrl?: string;
  exerciseIds: string[];
}

export interface Exercise extends Models.Row {
  name: string;
  description?: string;
  authorId: string;
  isPrivate: boolean;
  imageUrl?: string;
  muscleGroupIds: string[];
  primaryTargetMuscleId?: string;
  secondaryTargetMuscleIds?: string[];
  sets: number;
  rest?: number;
}
