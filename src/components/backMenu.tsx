"use client";

import { ArrowLeft01StrokeStandard } from "@hugeicons-pro/core-stroke-standard";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

const BackMenu = ({ onBack }: { onBack?: () => void }) => {
  const router = useRouter();
  return (
    <div className="w-full h-10 flex flex-row justify-start items-center">
      <button
        onClick={() => {
          if (onBack) {
            onBack();
          } else {
            router.back();
          }
        }}
      >
        <HugeiconsIcon icon={ArrowLeft01StrokeStandard} className="w-9 h-9" />
      </button>
    </div>
  );
};

export default BackMenu;
