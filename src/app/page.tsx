"use client";

import HomePage from "@/components/homePage";
import MobileMenu from "@/components/mobileMenu";
import Player from "@/components/player";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";

export default function Home() {
  const { session } = useAuthStore();

  if (session) {
    return (
      <div className="w-full h-fit min-h-screen flex flex-col items-center justify-start mb-[calc(var(--mobile-menu-height)_+_var(--mobile-player-height))]">
        <HomePage />
        <Player />
        <MobileMenu active="home" />
      </div>
    );
  }

  // If not logged in, show the landing page
  return (
    <div className="w-full h-fit min-h-screen flex flex-col items-center justify-center">
      <div className="w-fit h-fit flex flex-col gap-10 justify-center items-center text-center">
        <div className="w-fit h-fit flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-semibold">
            Welcome to <span className="text-primary font-bold">Repra!</span>
          </h1>
          <p>A workout tracker app built for Gymrats by Gymrats.</p>
        </div>
        <div className="w-fit h-fit flex gap-4 justify-center items-center text-center">
          <Link
            href="/signup"
            className="w-fit h-fit text-center text-fg-primary font-medium bg-primary px-5 py-2 rounded-full"
          >
            Sign Up
          </Link>
          <Link
            href="/signin"
            className="w-fit h-fit text-center text-fg-primary font-medium bg-bg-secondary px-5 py-2 rounded-full"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
