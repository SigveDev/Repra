"use client";

import Accordion from "@/components/accordion";
import Input from "@/components/input";
import LargeCard from "@/components/largeCard";
import ListCard from "@/components/listCard";
import {
  Add01SolidRounded,
  Search01SolidRounded,
} from "@hugeicons-pro/core-solid-rounded";
import {
  GridViewStrokeStandard,
  ListViewStrokeStandard,
} from "@hugeicons-pro/core-stroke-standard";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";

function LibraryPageComponent() {
  const [tempQuery, setTempQuery] = useState("");
  const [query, setQuery] = useState("");
  const [listType, setListType] = useState<"grid" | "list">("grid");
  return (
    <div className="p-4 min-h-screen h-fit w-full flex flex-col gap-5">
      <div className="w-full h-fit flex flex-row gap-3">
        <form className="grow h-10 flex flex-col gap-3 relative">
          <Input
            type="text"
            id="searchQuery"
            name="searchQuery"
            placeholder="Search library"
            value={tempQuery}
            onChange={(e) => setTempQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setQuery(tempQuery);
              }
            }}
          />
          <button
            type="submit"
            className="w-fit h-full flex justify-center items-center absolute top-0 right-3 text-fg-secondary/70"
            onClick={(e) => {
              e.preventDefault();
              setQuery(tempQuery);
            }}
          >
            <HugeiconsIcon icon={Search01SolidRounded} className="w-6 h-6" />
          </button>
        </form>
        <Link
          href="/create"
          className="w-10 h-10 flex justify-end items-center text-fg-secondary"
        >
          <HugeiconsIcon icon={Add01SolidRounded} className="w-7 h-7" />
        </Link>
      </div>
      {query === "" && (
        <section className="w-full h-fit flex flex-col gap-3">
          <div className="w-full h-6 flex flex-row gap-4 justify-start items-center">
            {listType === "grid" ? (
              <button
                className="w-fit h-8 flex justify-center items-center gap-2 text-base text-fg-secondary/70"
                onClick={() => setListType("list")}
              >
                <HugeiconsIcon
                  icon={ListViewStrokeStandard}
                  className="w-5 h-5"
                />
                List
              </button>
            ) : (
              <button
                className="w-fit h-8 flex justify-center items-center gap-2 text-base text-fg-secondary/70"
                onClick={() => setListType("grid")}
              >
                <HugeiconsIcon
                  icon={GridViewStrokeStandard}
                  className="w-5 h-5"
                />
                Grid
              </button>
            )}
          </div>
          <div className="w-full h-fit flex flex-col gap-2">
            <Accordion header="New & Updated" defaultOpen>
              {listType === "grid" ? (
                <div className="w-full h-fit flex flex-row gap-2 overflow-x-auto py-1 px-0.5">
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
              ) : (
                <div className="w-full max-h-full h-fit flex flex-col gap-3 overflow-y-auto">
                  <ListCard
                    href="/plan/0"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Full Body Advanced"
                    subtitle="7 exercises"
                  />
                  <ListCard
                    href="/plan/1"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Full Body Beginner"
                    subtitle="5 exercises"
                  />
                  <ListCard
                    href="/plan/2"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Push Pull Legs"
                    subtitle="6 exercises"
                  />
                  <ListCard
                    href="/plan/3"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Upper Lower Split"
                    subtitle="5 exercises"
                  />
                  <ListCard
                    href="/plan/4"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Strength Training"
                    subtitle="6 exercises"
                  />
                  <ListCard
                    href="/plan/5"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Core Focus"
                    subtitle="5 exercises"
                  />
                </div>
              )}
            </Accordion>
            <Accordion header="My Plans">
              {listType === "grid" ? (
                <div className="w-full h-fit flex flex-row gap-2 overflow-x-auto py-1 px-0.5">
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
              ) : (
                <div className="w-full max-h-full h-fit flex flex-col gap-3 overflow-y-auto">
                  <ListCard
                    href="/plan/0"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Full Body Advanced"
                    subtitle="7 exercises"
                  />
                  <ListCard
                    href="/plan/1"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Full Body Beginner"
                    subtitle="5 exercises"
                  />
                  <ListCard
                    href="/plan/2"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Push Pull Legs"
                    subtitle="6 exercises"
                  />
                  <ListCard
                    href="/plan/3"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Upper Lower Split"
                    subtitle="5 exercises"
                  />
                  <ListCard
                    href="/plan/4"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Strength Training"
                    subtitle="6 exercises"
                  />
                  <ListCard
                    href="/plan/5"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Core Focus"
                    subtitle="5 exercises"
                  />
                </div>
              )}
            </Accordion>
            <Accordion header="Friends' Plans">
              {listType === "grid" ? (
                <div className="w-full h-fit flex flex-row gap-2 overflow-x-auto py-1 px-0.5">
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
              ) : (
                <div className="w-full max-h-full h-fit flex flex-col gap-3 overflow-y-auto">
                  <ListCard
                    href="/plan/0"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Full Body Advanced"
                    subtitle="7 exercises"
                  />
                  <ListCard
                    href="/plan/1"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Full Body Beginner"
                    subtitle="5 exercises"
                  />
                  <ListCard
                    href="/plan/2"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Push Pull Legs"
                    subtitle="6 exercises"
                  />
                  <ListCard
                    href="/plan/3"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Upper Lower Split"
                    subtitle="5 exercises"
                  />
                  <ListCard
                    href="/plan/4"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Strength Training"
                    subtitle="6 exercises"
                  />
                  <ListCard
                    href="/plan/5"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Core Focus"
                    subtitle="5 exercises"
                  />
                </div>
              )}
            </Accordion>
            <Accordion header="Followed Plans">
              {listType === "grid" ? (
                <div className="w-full h-fit flex flex-row gap-2 overflow-x-auto py-1 px-0.5">
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
              ) : (
                <div className="w-full max-h-full h-fit flex flex-col gap-3 overflow-y-auto">
                  <ListCard
                    href="/plan/0"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Full Body Advanced"
                    subtitle="7 exercises"
                  />
                  <ListCard
                    href="/plan/1"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Full Body Beginner"
                    subtitle="5 exercises"
                  />
                  <ListCard
                    href="/plan/2"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Push Pull Legs"
                    subtitle="6 exercises"
                  />
                  <ListCard
                    href="/plan/3"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Upper Lower Split"
                    subtitle="5 exercises"
                  />
                  <ListCard
                    href="/plan/4"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Strength Training"
                    subtitle="6 exercises"
                  />
                  <ListCard
                    href="/plan/5"
                    imageAlt="Workout Image"
                    imageSrc="/images/fallback.webp"
                    title="Core Focus"
                    subtitle="5 exercises"
                  />
                </div>
              )}
            </Accordion>
          </div>
        </section>
      )}
    </div>
  );
}

export default LibraryPageComponent;
