"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { differenceInSeconds, format } from "date-fns";
import { formatSecondsToFullTime } from "@/lib/formatSecondsToFullTime";
import LargeCard from "@/components/largeCard";
import {
  ArrowRight01StrokeStandard,
  Notification01StrokeStandard,
} from "@hugeicons-pro/core-stroke-standard";
import { Plan } from "@/types/plansType";
import {
  GetPlanFromId,
  GetPublicPlans,
  GetTopPlans,
} from "@/services/client/plans";
import { useQuery, useQueries } from "@tanstack/react-query";
import { Models } from "appwrite";
import { UserPrefs } from "@/store/Auth";
import CustomImage from "@/components/CustomImage";
import Repeat from "@/components/repeat";
import { Skeleton } from "@/components/skeleton";
import { GetMyLatestWorkouts } from "@/services/client/workouts";
import { Workout } from "@/types/workoutsType";
import { Friend } from "@/types/socialsType";
import { MyFriends } from "@/services/client/socials";

function HomePageComponent() {
  const [urlHash, setUrlHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setUrlHash(window.location.hash);
    };

    // Set initial hash
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const {
    isLoading: isLoadingPlans,
    data: topPlans,
    isError: isErrorPlans,
  } = useQuery<Plan[]>({
    queryKey: ["topPlans"],
    queryFn: GetTopPlans,
  });

  const {
    isLoading: isLoadingWorkouts,
    data: latestWorkouts,
    isError: isErrorWorkouts,
  } = useQuery<Workout[]>({
    queryKey: ["latestWorkouts"],
    queryFn: GetMyLatestWorkouts,
  });

  const {
    isLoading: isLoadingPublicPlans,
    data: popularPlans,
    isError: isErrorPublicPlans,
  } = useQuery<Plan[]>({
    queryKey: ["popularPlans"],
    queryFn: GetPublicPlans,
  });

  const { data: friends } = useQuery<Friend[]>({
    queryKey: ["myFriends"],
    queryFn: MyFriends,
  });

  // derived maps (built from react-query results) — do not keep in state to avoid update loops

  const friendQueries = useQueries({
    queries: (friends?.slice(0, 6) || []).map((friend) => ({
      queryKey: ["friendDetails", friend.$id],
      queryFn: async () => {
        const [userRes, activeRes] = await Promise.all([
          fetch(
            `/api/account/getUserProfile?username=${encodeURIComponent(
              friend.friendId
            )}`
          ).then((r) => r.json()),
          fetch(
            `/api/workouts/getActiveWorkout?username=${encodeURIComponent(
              friend.friendId
            )}`
          ).then((r) => r.json()),
        ]);

        return {
          friendId: friend.$id,
          user: (userRes as Models.User<UserPrefs>) || null,
          activeWorkout:
            (activeRes &&
              (activeRes as { activeWorkout?: boolean }).activeWorkout) ||
            false,
        } as {
          friendId: string;
          user: Models.User<UserPrefs> | null;
          activeWorkout: boolean;
        };
      },
      staleTime: 1000 * 60 * 5,
      enabled: !!friend.friendId,
    })),
  });

  const friendsDetailsMap = useMemo(() => {
    const next: Record<
      string,
      { activeWorkout: boolean; user: Models.User<UserPrefs> | null }
    > = {};
    if (!friendQueries || friendQueries.length === 0) return next;
    friendQueries.forEach((q) => {
      if (q.data) {
        next[q.data.friendId] = {
          activeWorkout: q.data.activeWorkout,
          user: q.data.user,
        };
      }
    });
    return next;
  }, [friendQueries]);

  const uniquePlanIds = useMemo(
    () =>
      latestWorkouts
        ? Array.from(
            new Set(latestWorkouts.map((w) => w.planId).filter(Boolean))
          )
        : [],
    [latestWorkouts]
  );

  const planQueries = useQueries({
    queries: uniquePlanIds.map((planId) => ({
      queryKey: ["plan", planId],
      queryFn: () => GetPlanFromId(planId),
      staleTime: 1000 * 60 * 5,
      enabled: !!planId,
    })),
  });

  const workoutPlansMap = useMemo(() => {
    const next: Record<string, Plan | null> = {};
    if (!planQueries || planQueries.length === 0) return next;
    planQueries.forEach((q, i) => {
      const id = uniquePlanIds[i];
      if (q.data) next[id] = q.data as Plan;
      else next[id] = null;
    });
    return next;
  }, [planQueries, uniquePlanIds]);

  return (
    <div className="p-4 pb-[var(--total-mobile-bottom-height)] min-h-screen h-fit w-full flex flex-col gap-5">
      <div className="w-full h-10 flex flex-row justify-between items-center">
        <div className="w-fit h-fit flex flex-row gap-3 justify-center items-center">
          <a
            href="#workouts-section"
            className={`w-fit h-full flex justify-center items-center text-sm text-fg-primary ${
              urlHash === "#workouts-section" || urlHash === ""
                ? "bg-primary"
                : "bg-bg-secondary"
            } rounded-xl px-4 py-2`}
          >
            Workouts
          </a>
          <a
            href="#friends-section"
            className={`w-fit h-full flex justify-center items-center text-sm text-fg-primary ${
              urlHash === "#friends-section" ? "bg-primary" : "bg-bg-secondary"
            } rounded-xl px-4 py-2`}
          >
            Friends
          </a>
          <a
            href="#progress-section"
            className={`w-fit h-full flex justify-center items-center text-sm text-fg-primary ${
              urlHash === "#progress-section" ? "bg-primary" : "bg-bg-secondary"
            } rounded-xl px-4 py-2`}
          >
            Progress
          </a>
        </div>
        <div className="w-fit h-10 flex justify-center items-center">
          <button className="w-10 h-10 flex justify-end items-center">
            <HugeiconsIcon
              icon={Notification01StrokeStandard}
              className="w-7 h-7 text-fg-secondary"
            />
          </button>
        </div>
      </div>
      <section
        id="workouts-section"
        className="w-full h-fit flex flex-col gap-8"
      >
        <div className="w-full h-fit grid grid-cols-2 grid-rows-3 gap-3">
          {topPlans && topPlans.length > 0 ? (
            topPlans.slice(0, 6).map((plan: Plan, index: number) => (
              <Link
                href={`/library/plans/${plan.$id}`}
                className="w-full h-15 bg-bg-secondary rounded-xl p-2 flex justify-center items-center gap-2"
                key={index}
              >
                <div className="h-full aspect-square relative rounded-sm">
                  <CustomImage
                    src={plan.imageUrl || "/images/fallback.webp"}
                    alt={plan.name || "Workout Image"}
                    className="rounded-sm"
                  />
                </div>
                <div className="grow h-full flex flex-col justify-center items-start text-sm overflow-hidden">
                  <span className="text-fg-primary w-full overflow-hidden text-ellipsis flex-none text-nowrap">
                    {plan.name}
                  </span>
                  <span className="text-fg-secondary">
                    {plan.exerciseIds.length} exercises
                  </span>
                </div>
              </Link>
            ))
          ) : isLoadingPlans ? (
            <Repeat count={6}>
              <Skeleton className="w-full h-15 bg-bg-secondary rounded-xl p-2" />
            </Repeat>
          ) : isErrorPlans ? (
            <div className="h-[calc((var(--spacing)_*_45)_+_(var(--spacing)_*_6))] col-span-2 row-span-3 flex flex-col justify-center items-center rounded-xl p-4 bg-other-alert text-fg-primary text-center">
              <span className="w-3/4">
                There was an error loading plans, please try again later.
              </span>
            </div>
          ) : (
            <div className="h-[calc((var(--spacing)_*_45)_+_(var(--spacing)_*_6))] col-span-2 row-span-3 flex flex-col justify-center items-center rounded-xl p-4 bg-bg-secondary text-fg-primary text-center">
              <span className="w-3/4">
                You don&#39;t have any plans yet. Explore the library to create
                your first plan!
              </span>
            </div>
          )}
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <div className="w-full h-fit flex flex-row justify-between items-center">
            <h2 className="text-xl font-semibold text-fg-primary">
              My Workouts
            </h2>
          </div>
          <div className="w-full h-fit flex-nowrap overflow-x-scroll overflow-y-hidden flex flex-row gap-2 justify-start items-center no-scrollbar">
            {latestWorkouts && latestWorkouts.length > 0 ? (
              latestWorkouts.map((workout, index) => {
                const plan = workoutPlansMap[workout.planId];

                return (
                  <Link
                    key={index}
                    href={`/library/workout/${workout.$id}`}
                    className="w-40 h-14 flex-shrink-0 flex flex-row gap-2 px-2 py-1.5 bg-bg-secondary rounded-2xl"
                  >
                    <div className="h-full aspect-square flex justify-center items-center text-center text-fg-primary text-sm">
                      <span>
                        {format(new Date(workout.endedAt || 0), "dd. MMM")}
                      </span>
                    </div>
                    <div className="grow h-full flex flex-col justify-center items-start text-sm">
                      <span className="text-fg-primary">
                        {plan ? plan.name : "Unknown Plan"}
                      </span>
                      <span className="text-fg-secondary">
                        {formatSecondsToFullTime(
                          differenceInSeconds(
                            new Date(workout.endedAt || 0),
                            new Date(workout.startedAt || 0)
                          )
                        )}
                      </span>
                    </div>
                  </Link>
                );
              })
            ) : isLoadingWorkouts ? (
              <Repeat count={6}>
                <Skeleton className="w-40 h-14 flex-shrink-0 bg-bg-secondary rounded-2xl" />
              </Repeat>
            ) : isErrorWorkouts ? (
              <div className="h-14 w-full bg-other-alert rounded-2xl p-4 flex flex-col justify-center items-center text-fg-primary text-center">
                <span className="w-full">
                  There was an error loading your workouts, please try again
                  later.
                </span>
              </div>
            ) : (
              <div className="h-14 w-full bg-bg-secondary rounded-2xl p-4 flex flex-col justify-center items-center text-fg-primary text-center">
                <span className="w-full">
                  You don&#39;t have any workouts yet. Start your first workout
                  today!
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <div className="w-full h-fit flex flex-row justify-between items-center">
            <h2 className="text-xl font-semibold text-fg-primary">
              Popular Workout Plans
            </h2>
          </div>
          <div className="w-full h-fit flex-nowrap overflow-x-scroll overflow-y-hidden flex flex-row gap-2 justify-start items-center no-scrollbar">
            {popularPlans && popularPlans.length > 0 ? (
              popularPlans
                .slice(0, 6)
                .map((plan: Plan, index: number) => (
                  <LargeCard
                    key={index}
                    href={`/plan/${plan.$id}`}
                    imageAlt={plan.name}
                    imageSrc={plan.imageUrl || "/images/fallback.webp"}
                    title={plan.name}
                    subtitle={`${plan.exerciseIds.length} exercises`}
                  />
                ))
            ) : isLoadingPublicPlans ? (
              <Repeat count={6}>
                <LargeCard
                  href=""
                  imageAlt=""
                  imageSrc=""
                  title=""
                  subtitle=""
                  type="loading"
                />
              </Repeat>
            ) : isErrorPublicPlans ? (
              <div className="h-40 w-full bg-other-alert rounded-2xl p-4 flex flex-col justify-center items-center text-fg-primary text-center">
                <span className="w-full">
                  There was an error loading popular plans, please try again
                  later.
                </span>
              </div>
            ) : (
              <div className="h-40 w-full bg-bg-secondary rounded-2xl p-4 flex flex-col justify-center items-center text-fg-primary text-center">
                <span className="w-full">No popular plans available.</span>
              </div>
            )}
          </div>
        </div>
      </section>
      {friends && friends.length > 0 && (
        <section
          id="friends-section"
          className="w-full h-fit flex flex-col gap-2"
        >
          <div className="w-full h-fit flex flex-row justify-between items-center">
            <h2 className="text-xl font-semibold text-fg-primary">Friends</h2>
          </div>
          <div className="w-full h-fit flex-nowrap overflow-x-scroll overflow-y-hidden flex flex-row gap-2 justify-start items-center no-scrollbar">
            {friends.slice(0, 6).map((friend: Friend, index: number) => {
              const details = friendsDetailsMap[friend.$id];
              const activeWorkout = details?.activeWorkout;
              const friendUser = details?.user || { name: "Unknown User" };
              return (
                <Link
                  key={index}
                  href={`/user/${friend.friendId}`}
                  className="w-18 h-24 flex-shrink-0 flex flex-col gap-1 justify-center items-center"
                >
                  <div className="w-16 h-16 relative rounded-full overflow-hidden">
                    <CustomImage
                      src="/images/fallback.webp"
                      alt="User Avatar"
                      className={`rounded-full ${
                        activeWorkout ? "border-2 border-primary" : ""
                      }`}
                    />
                  </div>
                  <span className="text-fg-primary text-sm text-center">
                    {friendUser.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
      <section
        id="progress-section"
        className="w-full h-fit flex flex-col gap-2"
      >
        <div className="w-full h-fit flex flex-row justify-between items-center">
          <Link
            href="/progress"
            className="text-xl font-semibold text-fg-primary flex flex-row justify-center items-center gap-1"
          >
            Progress
            <HugeiconsIcon
              icon={ArrowRight01StrokeStandard}
              className="w-5 h-5 ml-0.1"
            />
          </Link>
        </div>
        <div className="w-full h-40 bg-bg-secondary rounded-xl flex justify-center items-center text-fg-secondary">
          Progress Chart Placeholder
        </div>
        <div className="w-full h-12 grid grid-cols-2 gap-4">
          <div className="w-full h-full bg-bg-secondary rounded-lg flex flex-col justify-center items-center text-sm text-fg-primary">
            <span>14</span>
            <span className="text-fg-secondary">Workouts last month</span>
          </div>
          <div className="w-full h-full bg-bg-secondary rounded-lg flex flex-col justify-center items-center text-sm text-fg-primary">
            <span>96</span>
            <span className="text-fg-secondary">Workouts last 6 months</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePageComponent;
