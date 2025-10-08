import { db } from "../name";

import { tablesDB } from "./config";
import createMuscleGroupsTable from "./tables/muscles/muscleGroups.table";
import createMuscleTable from "./tables/muscles/muscles.table";
import createExercisesTable from "./tables/plans/exercises.table";
import createGroupsTable from "./tables/plans/groups.table";
import createPlansTable from "./tables/plans/plans.table";
import createProgressImagesTable from "./tables/progress/progressImages.table";
import createExerciseRecordsTable from "./tables/records/exerciseRecords.table";
import createFollowersTable from "./tables/social/followers.table";
import createFriendsTable from "./tables/social/friends.table";
import createSubscriptionsTable from "./tables/social/subscriptions.table";
import createWorkoutExercisesTable from "./tables/workouts/workoutExercises.table";
import createWorkoutsTable from "./tables/workouts/workouts.table";
import createWorkoutSetsTable from "./tables/workouts/workoutSets.table";

export default async function getOrCreateDB() {
  try {
    await tablesDB.get({
      databaseId: db,
    });
    console.log("Database connection");
  } catch {
    try {
      await tablesDB.create({
        databaseId: db,
        name: db,
      });
      console.log("database created");

      await Promise.all([
        createFollowersTable(),
        createFriendsTable(),
        createSubscriptionsTable(),

        createGroupsTable(),
        createPlansTable(),
        createExercisesTable(),

        createWorkoutsTable(),
        createWorkoutExercisesTable(),
        createWorkoutSetsTable(),

        createMuscleGroupsTable(),
        createMuscleTable(),

        createExerciseRecordsTable(),

        createProgressImagesTable(),
      ]);
      console.log("Collection created");
      console.log("Database connected");
    } catch (error) {
      console.log("Error creating databases or collection", error);
    }
  }

  return tablesDB;
}
