"use client";

import MobileMenu, { MobileMenuProps } from "@/components/mobileMenu";
import Player from "@/components/player";
import { useAuthStore } from "@/store/Auth";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { session } = useAuthStore();
  const pathname = usePathname();
  const player: boolean = false;

  const [activePage, setActivePage] =
    useState<MobileMenuProps["active"]>("home");

  useEffect(() => {
    if (pathname.includes("/")) {
      setActivePage("home");
    }
    if (pathname.includes("/discover")) {
      setActivePage("discover");
    }
    if (pathname.includes("/search")) {
      setActivePage("search");
    }
    if (pathname.includes("/library")) {
      setActivePage("library");
    }
    if (pathname.includes("/profile")) {
      setActivePage("profile");
    }
  }, [pathname]);

  return (
    <div className="w-full h-fit min-h-screen flex flex-col items-center justify-start">
      {children}
      {session && (
        <>
          {player && <Player />}
          <MobileMenu active={activePage} />
        </>
      )}
    </div>
  );
};

export default Layout;
