"use client";

import { useAuthStore } from "@/store/Auth";
import HomePageComponent from "./homePageComponent";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useAuthStore((s) => s.session);
  const verifySession = useAuthStore((s) => s.verifySession);
  const hydrated = useAuthStore((s) => s.hydrated);
  const router = useRouter();

  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await verifySession();
      } catch {
        // ignore
      } finally {
        if (mounted) setCheckingSession(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [verifySession]);

  useEffect(() => {
    if (!checkingSession && hydrated) {
      if (!session) router.push("/signin");
    }
  }, [checkingSession, hydrated, session, router]);

  if (checkingSession || !hydrated) {
    return null;
  }

  if (session) {
    return (
      <div className="w-full h-fit min-h-screen flex flex-col items-center justify-start">
        <HomePageComponent />
      </div>
    );
  }

  return null;
}
