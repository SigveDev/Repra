"use client";

import { useAuthStore } from "@/store/Auth";
import Link from "next/link";

export default function Home() {
  const { session, user, logout } = useAuthStore();

  if (session) {
    return (
      <div className="w-full h-fit min-h-screen flex flex-col items-center justify-center">
        <div className="w-fit h-fit flex flex-col gap-10 justify-center items-center text-center">
          <div className="w-fit h-fit flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-semibold">
              Welcome back,{" "}
              <span className="text-primary font-bold">{user?.name}</span>!
            </h1>
            <p>Ready for your next workout?</p>
          </div>
          <div className="w-fit h-fit flex flex-col gap-4 justify-center items-center text-center">
            <Link
              href="/dashboard"
              className="w-fit h-fit text-center text-fg-primary font-medium bg-primary px-5 py-2 rounded-full"
            >
              Go to Dashboard
            </Link>
            <button
              className="w-fit h-fit text-center text-fg-secondary font-medium rounded-full"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
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
