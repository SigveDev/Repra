import React from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DiscoverCircleSolidStandard,
  Home03SolidStandard,
  Search01SolidStandard,
  FolderLibrarySolidStandard,
  UserSolidStandard,
} from "@hugeicons-pro/core-solid-standard";
import {
  Home03StrokeStandard,
  DiscoverCircleStrokeStandard,
  Search01StrokeStandard,
  FolderLibraryStrokeStandard,
  UserStrokeStandard,
} from "@hugeicons-pro/core-stroke-standard";

export interface MobileMenuProps {
  active: "home" | "discover" | "search" | "library" | "profile";
}

function MobileMenu({ active }: MobileMenuProps) {
  return (
    <div className="w-full h-[var(--mobile-menu-height)] bg-linear-to-b from-bg-primary/85 to-45% to-bg-primary fixed bottom-0 left-0 flex flex-row justify-between items-start pt-5 px-4 z-40">
      <Link
        href="/"
        className={`flex-1 text-center flex flex-col justify-center items-center gap-1.5 ${
          active === "home" ? "text-fg-primary" : "text-fg-secondary"
        }`}
      >
        <HugeiconsIcon
          icon={active === "home" ? Home03SolidStandard : Home03StrokeStandard}
          className="w-7 h-7"
        />
        <span className="text-xs">Home</span>
      </Link>
      <Link
        href="/discover"
        className={`flex-1 text-center flex flex-col justify-center items-center gap-1.5 ${
          active === "discover" ? "text-fg-primary" : "text-fg-secondary"
        }`}
      >
        <HugeiconsIcon
          icon={
            active === "discover"
              ? DiscoverCircleSolidStandard
              : DiscoverCircleStrokeStandard
          }
          className="w-7 h-7"
        />
        <span className="text-xs">Discover</span>
      </Link>
      <Link
        href="/search"
        className={`flex-1 text-center flex flex-col justify-center items-center gap-1.5 ${
          active === "search" ? "text-fg-primary" : "text-fg-secondary"
        }`}
      >
        <HugeiconsIcon
          icon={
            active === "search" ? Search01SolidStandard : Search01StrokeStandard
          }
          className="w-7 h-7"
        />
        <span className="text-xs">Search</span>
      </Link>
      <Link
        href="/library"
        className={`flex-1 text-center flex flex-col justify-center items-center gap-1.5 ${
          active === "library" ? "text-fg-primary" : "text-fg-secondary"
        }`}
      >
        <HugeiconsIcon
          icon={
            active === "library"
              ? FolderLibrarySolidStandard
              : FolderLibraryStrokeStandard
          }
          className="w-7 h-7"
        />
        <span className="text-xs">Library</span>
      </Link>
      <Link
        href="/profile"
        className={`flex-1 text-center flex flex-col justify-center items-center gap-1.5 ${
          active === "profile" ? "text-fg-primary" : "text-fg-secondary"
        }`}
      >
        <HugeiconsIcon
          icon={active === "profile" ? UserSolidStandard : UserStrokeStandard}
          className="w-7 h-7"
        />
        <span className="text-xs">Profile</span>
      </Link>
    </div>
  );
}

export default MobileMenu;
