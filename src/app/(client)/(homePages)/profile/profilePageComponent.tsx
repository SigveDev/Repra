"use client";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/Auth";
import {
  ArrowRight01StrokeStandard,
  ChampionStrokeStandard,
  Clock02StrokeStandard,
  Notification01StrokeStandard,
  Settings01StrokeStandard,
} from "@hugeicons-pro/core-stroke-standard";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const memberStatusColors: Record<
  | "rookie"
  | "novice"
  | "intermediate"
  | "advanced"
  | "expert"
  | "elite"
  | "master",
  string
> = {
  rookie: "#7EC8E3",
  novice: "#7ED957",
  intermediate: "#FFD447",
  advanced: "#FF914D",
  expert: "#E34234",
  elite: "#8E44AD",
  master: "#E5E4E2",
};

function ProfilePageComponent() {
  const { user, logout } = useAuthStore();
  const [signoutConfirm, setSignoutConfirm] = useState(false);
  return (
    <div className="p-4 min-h-screen h-fit w-full flex flex-col gap-4">
      <div
        className={cn(
          "w-full h-36 rounded-xl bg-gradient-to-b from-[#7EC8E3] to-80% to-transparent"
        )}
        style={{
          backgroundImage: `linear-gradient(to bottom, ${
            memberStatusColors[user?.prefs?.repraTier || "rookie"]
          }66, transparent 80%)`,
        }}
      >
        <div className="w-full h-full rounded-xl border-2 border-[rgba(255,255,255,0.1)] flex flex-row justify-center items-center gap-4 p-4 bg-transparent">
          <div className="h-full aspect-square relative rounded-full">
            <Image
              src="/images/fallback.webp"
              alt="Profile Picture"
              layout="fill"
              className="object-cover rounded-full"
            />
          </div>
          <div className="h-full grow flex flex-col justify-around items-start">
            <h1 className="text-xl font-semibold text-fg-primary">
              {user?.name}
            </h1>
            <div className="w-fit h-fit flex justify-center items-center flex-row gap-2 text-xs text-fg-secondary">
              <span>
                <span className="text-fg-primary">100</span> Followers
              </span>
              <span className="w-fit h-fit my-auto">&bull;</span>
              <span>
                <span className="text-fg-primary">150</span> Following
              </span>
            </div>
            <div
              className={cn(
                "w-fit h-fit flex flex-row gap-2",
                `text-[${
                  memberStatusColors[user?.prefs?.repraTier || "rookie"]
                }]`
              )}
            >
              <HugeiconsIcon
                icon={ChampionStrokeStandard}
                className="w-5 h-5"
              />
              <span className="text-base font-bold">
                {user?.prefs?.repraTier
                  ? user.prefs.repraTier.charAt(0).toUpperCase() +
                    user.prefs.repraTier.slice(1).toLowerCase()
                  : "Rookie"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-48 flex flex-col gap-2 px-4 py-2 rounded-xl border-2 border-[rgba(255,255,255,0.1)]">
        <h2 className="text-base font-semibold text-fg-primary">Friends</h2>
      </div>
      <section className="w-full h-fit flex flex-col gap-3">
        <Link
          href="/history"
          className="w-full h-12 flex flex-row justify-between items-center border-b-2 border-[var(--color-bg-secondary)]"
        >
          <div className="w-fit h-full flex flex-row gap-3 justify-center items-center">
            <HugeiconsIcon
              icon={Clock02StrokeStandard}
              className="w-6 h-6 text-fg-secondary"
            />
            <span className="text-fg-primary">View History</span>
          </div>
          <HugeiconsIcon
            icon={ArrowRight01StrokeStandard}
            className="w-6 h-6 text-fg-secondary"
          />
        </Link>
        <Link
          href="/settings"
          className="w-full h-12 flex flex-row justify-between items-center border-b-2 border-[var(--color-bg-secondary)]"
        >
          <div className="w-fit h-full flex flex-row gap-3 justify-center items-center">
            <HugeiconsIcon
              icon={Settings01StrokeStandard}
              className="w-6 h-6 text-fg-secondary"
            />
            <span className="text-fg-primary">Settings and more</span>
          </div>
          <HugeiconsIcon
            icon={ArrowRight01StrokeStandard}
            className="w-6 h-6 text-fg-secondary"
          />
        </Link>
        <Link
          href="/about"
          className="w-full h-12 flex flex-row justify-between items-center border-b-2 border-[var(--color-bg-secondary)]"
        >
          <div className="w-fit h-full flex flex-row gap-3 justify-center items-center">
            <HugeiconsIcon
              icon={Notification01StrokeStandard}
              className="w-6 h-6 text-fg-secondary"
            />
            <span className="text-fg-primary">About Repra</span>
          </div>
          <HugeiconsIcon
            icon={ArrowRight01StrokeStandard}
            className="w-6 h-6 text-fg-secondary"
          />
        </Link>
      </section>
      <section className="w-full h-fit flex flex-col gap-3 mt-auto">
        {!signoutConfirm ? (
          <button
            className="w-full h-12 bg-bg-secondary transition-colors rounded-lg text-fg-primary font-semibold"
            onClick={() => setSignoutConfirm(true)}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="w-full h-12 bg-red-700/15 transition-colors rounded-lg text-fg-primary font-semibold"
            onClick={() => logout()}
          >
            Confirm Sign Out
          </button>
        )}
      </section>
    </div>
  );
}

export default ProfilePageComponent;
