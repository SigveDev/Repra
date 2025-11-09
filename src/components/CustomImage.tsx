"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./skeleton";

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CustomImage = ({ src, alt, className }: CustomImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <Skeleton className={cn("absolute inset-0 w-full h-full", className)} />
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          `object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`,
          className
        )}
        fill
        onLoadingComplete={() => setIsLoading(false)}
      />
    </>
  );
};

export default CustomImage;
