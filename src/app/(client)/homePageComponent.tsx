"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { CustomizeStrokeRounded } from "@hugeicons-pro/core-stroke-rounded";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { formatSecondsToFullTime } from "@/lib/formatSecondsToFullTime";
import { ArrowRight02SolidRounded } from "@hugeicons-pro/core-solid-rounded";
import LargeCard from "@/components/largeCard";

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

  return (
    <div className="p-4 min-h-screen h-fit w-full flex flex-col gap-5">
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
              icon={CustomizeStrokeRounded}
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
          <button className="w-full h-15 bg-bg-secondary rounded-2xl p-2 flex justify-center items-center gap-2">
            <div className="h-full aspect-square relative rounded-sm">
              <Image
                src="/images/fallback.webp"
                alt="Workout Image"
                className="rounded-sm"
                fill
              />
            </div>
            <div className="grow h-full flex flex-col justify-center items-start text-sm">
              <span className="text-fg-primary">Push</span>
              <span className="text-fg-secondary">5 exercises</span>
            </div>
          </button>
          <button className="w-full h-15 bg-bg-secondary rounded-2xl p-2 flex justify-center items-center gap-2">
            <div className="h-full aspect-square relative rounded-sm">
              <Image
                src="/images/fallback.webp"
                alt="Workout Image"
                className="rounded-sm"
                fill
              />
            </div>
            <div className="grow h-full flex flex-col justify-center items-start text-sm">
              <span className="text-fg-primary">Pull</span>
              <span className="text-fg-secondary">6 exercises</span>
            </div>
          </button>
          <button className="w-full h-15 bg-bg-secondary rounded-2xl p-2 flex justify-center items-center gap-2">
            <div className="h-full aspect-square relative rounded-sm">
              <Image
                src="/images/fallback.webp"
                alt="Workout Image"
                className="rounded-sm"
                fill
              />
            </div>
            <div className="grow h-full flex flex-col justify-center items-start text-sm">
              <span className="text-fg-primary">Leggs</span>
              <span className="text-fg-secondary">5 exercises</span>
            </div>
          </button>
          <button className="w-full h-15 bg-bg-secondary rounded-2xl p-2 flex justify-center items-center gap-2">
            <div className="h-full aspect-square relative rounded-sm">
              <Image
                src="/images/fallback.webp"
                alt="Workout Image"
                className="rounded-sm"
                fill
              />
            </div>
            <div className="grow h-full flex flex-col justify-center items-start text-sm">
              <span className="text-fg-primary">Upper</span>
              <span className="text-fg-secondary">6 exercises</span>
            </div>
          </button>
          <button className="w-full h-15 bg-bg-secondary rounded-2xl p-2 flex justify-center items-center gap-2">
            <div className="h-full aspect-square relative rounded-sm">
              <Image
                src="/images/fallback.webp"
                alt="Workout Image"
                className="rounded-sm"
                fill
              />
            </div>
            <div className="grow h-full flex flex-col justify-center items-start text-sm">
              <span className="text-fg-primary">Lower</span>
              <span className="text-fg-secondary">5 exercises</span>
            </div>
          </button>
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <div className="w-full h-fit flex flex-row justify-between items-center">
            <h2 className="text-xl font-semibold text-fg-primary">
              My Workouts
            </h2>
          </div>
          <div className="w-full h-fit flex-nowrap overflow-x-scroll overflow-y-hidden flex flex-row gap-2 justify-start items-center no-scrollbar">
            <Link
              href="/workout/1"
              className="w-40 h-14 flex-shrink-0 flex flex-row gap-2 px-2 py-1.5 bg-bg-secondary rounded-2xl"
            >
              <div className="h-full aspect-square flex justify-center items-center text-center text-fg-primary text-sm">
                <span>{format(new Date(), "dd. MMM")}</span>
              </div>
              <div className="grow h-full flex flex-col justify-center items-start text-sm">
                <span className="text-fg-primary">Push</span>
                <span className="text-fg-secondary">
                  {formatSecondsToFullTime(3853)}
                </span>
              </div>
            </Link>
            <Link
              href="/workout/2"
              className="w-40 h-14 flex-shrink-0 flex flex-row gap-2 px-2 py-1.5 bg-bg-secondary rounded-2xl"
            >
              <div className="h-full aspect-square flex justify-center items-center text-center text-fg-primary text-sm">
                <span>{format(new Date(), "dd. MMM")}</span>
              </div>
              <div className="grow h-full flex flex-col justify-center items-start text-sm">
                <span className="text-fg-primary">Pull</span>
                <span className="text-fg-secondary">
                  {formatSecondsToFullTime(2753)}
                </span>
              </div>
            </Link>
            <Link
              href="/workout/3"
              className="w-40 h-14 flex-shrink-0 flex flex-row gap-2 px-2 py-1.5 bg-bg-secondary rounded-2xl"
            >
              <div className="h-full aspect-square flex justify-center items-center text-center text-fg-primary text-sm">
                <span>{format(new Date(), "dd. MMM")}</span>
              </div>
              <div className="grow h-full flex flex-col justify-center items-start text-sm">
                <span className="text-fg-primary">Leggs</span>
                <span className="text-fg-secondary">
                  {formatSecondsToFullTime(3053)}
                </span>
              </div>
            </Link>
            <Link
              href="/workout/4"
              className="w-40 h-14 flex-shrink-0 flex flex-row gap-2 px-2 py-1.5 bg-bg-secondary rounded-2xl"
            >
              <div className="h-full aspect-square flex justify-center items-center text-center text-fg-primary text-sm">
                <span>{format(new Date(), "dd. MMM")}</span>
              </div>
              <div className="grow h-full flex flex-col justify-center items-start text-sm">
                <span className="text-fg-primary">Upper</span>
                <span className="text-fg-secondary">
                  {formatSecondsToFullTime(4153)}
                </span>
              </div>
            </Link>
            <Link
              href="/workout/5"
              className="w-40 h-14 flex-shrink-0 flex flex-row gap-2 px-2 py-1.5 bg-bg-secondary rounded-2xl"
            >
              <div className="h-full aspect-square flex justify-center items-center text-center text-fg-primary text-sm">
                <span>{format(new Date(), "dd. MMM")}</span>
              </div>
              <div className="grow h-full flex flex-col justify-center items-start text-sm">
                <span className="text-fg-primary">Lower</span>
                <span className="text-fg-secondary">
                  {formatSecondsToFullTime(4153)}
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <div className="w-full h-fit flex flex-row justify-between items-center">
            <h2 className="text-xl font-semibold text-fg-primary">
              Popular Workout Routines
            </h2>
          </div>
          <div className="w-full h-fit flex-nowrap overflow-x-scroll overflow-y-hidden flex flex-row gap-2 justify-start items-center no-scrollbar">
            <LargeCard
              href="/plan/0"
              imageAlt="Workout Image"
              imageSrc="/images/fallback.webp"
              title="Full Body Advanced"
              subtitle="7 exercises"
            />
            <LargeCard
              href="/plan/1"
              imageAlt="Workout Image"
              imageSrc="/images/fallback.webp"
              title="Full Body Beginner"
              subtitle="5 exercises"
            />
            <LargeCard
              href="/plan/2"
              imageAlt="Workout Image"
              imageSrc="/images/fallback.webp"
              title="Push Pull Legs"
              subtitle="6 exercises"
            />
            <LargeCard
              href="/plan/3"
              imageAlt="Workout Image"
              imageSrc="/images/fallback.webp"
              title="Upper Lower Split"
              subtitle="5 exercises"
            />
            <LargeCard
              href="/plan/4"
              imageAlt="Workout Image"
              imageSrc="/images/fallback.webp"
              title="Strength Training"
              subtitle="6 exercises"
            />
            <LargeCard
              href="/plan/5"
              imageAlt="Workout Image"
              imageSrc="/images/fallback.webp"
              title="Core Focus"
              subtitle="5 exercises"
            />
          </div>
        </div>
      </section>
      <section
        id="friends-section"
        className="w-full h-fit flex flex-col gap-2"
      >
        <div className="w-full h-fit flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold text-fg-primary">Friends</h2>
        </div>
        <div className="w-full h-fit flex-nowrap overflow-x-scroll overflow-y-hidden flex flex-row gap-2 justify-start items-center no-scrollbar">
          <Link
            href="/user/1"
            className="w-18 h-24 flex-shrink-0 flex flex-col gap-1 justify-center items-center"
          >
            <div className="w-16 h-16 relative rounded-full overflow-hidden">
              <Image
                src="/images/fallback.webp"
                alt="User Avatar"
                className="rounded-full border-2 border-primary"
                fill
              />
            </div>
            <span className="text-fg-primary text-sm text-center">Alice</span>
          </Link>
          <Link
            href="/user/2"
            className="w-18 h-24 flex-shrink-0 flex flex-col gap-1 justify-center items-center"
          >
            <div className="w-16 h-16 relative rounded-full overflow-hidden">
              <Image
                src="/images/fallback.webp"
                alt="User Avatar"
                className="rounded-full"
                fill
              />
            </div>
            <span className="text-fg-primary text-sm text-center">Bob</span>
          </Link>
        </div>
      </section>
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
              icon={ArrowRight02SolidRounded}
              className="w-5 h-5 ml-1"
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
