import { Models } from "appwrite";

export interface Exercise extends Models.Row {
  name: string;
  description: string;
  authorId: string;
  public: boolean;
  imageUrl?: string;
  muscleGroupIds: string[];
  primaryTargetMuscleId?: string;
  secondaryTargetMuscleIds?: string[];
  sets: number;
  rest?: number;
}
