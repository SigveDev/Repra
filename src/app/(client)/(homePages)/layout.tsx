"use client";

import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
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

  if (!session) {
    return null;
  }

  return <>{children}</>;
};

export default Layout;
