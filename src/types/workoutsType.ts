import { Models } from "appwrite";

export interface Workout extends Models.Row {
  userId: string;
  planId: string;
  workoutExerciseIds: string[];
  startedAt: string;
  endedAt?: string;
  loacation?: string;
  rating?: number;
}

export interface WorkoutExercise extends Models.Row {
  exerciseId: string;
  setIds: string[];
  startedAt: string;
  endedAt?: string;
}

export interface WorkoutSet extends Models.Row {
  setIndex: number;
  weight: number;
  weightUnit: "kg" | "lbs";
}
