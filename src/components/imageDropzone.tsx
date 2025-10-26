"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, type FileError } from "react-dropzone";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type ImageDropzoneProps = {
  onChange?: (file: File | null) => void;
  initialPreviewUrl?: string | null;
  rejectGif?: boolean;
  className?: string;
  placeholderTitle?: string;
  placeholderSubtitle?: string;
};

export default function ImageDropzone({
  onChange,
  initialPreviewUrl = null,
  rejectGif = true,
  className = "",
  placeholderTitle = "Upload Image",
  placeholderSubtitle = "Click or drag an image here",
}: ImageDropzoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialPreviewUrl
  );

  const fileValidator = useCallback(
    (f: File) => {
      if (rejectGif && f.type === "image/gif") {
        const err: FileError = {
          code: "file-invalid-type",
          message: "GIFs are not allowed",
        };
        return err;
      }
      return null;
    },
    [rejectGif]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const first = acceptedFiles && acceptedFiles[0];
      if (first) {
        setFile(first);
        const url = URL.createObjectURL(first);
        setPreviewUrl(url);
        if (onChange) onChange(first);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
    validator: fileValidator,
  });

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== initialPreviewUrl) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch (e) {
          void e;
        }
      }
    };
  }, [previewUrl, initialPreviewUrl]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "w-full h-full rounded-xl overflow-hidden flex items-center justify-center cursor-pointer bg-fg-secondary/10",
        className
      )}
    >
      <input {...getInputProps()} />

      {previewUrl ? (
        <div className="w-full h-full relative">
          <Image
            src={previewUrl as string}
            alt={file?.name ?? "preview"}
            className="object-cover"
            fill
            unoptimized
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center p-4">
          <div className="text-sm font-semibold text-fg-primary">
            {placeholderTitle}
          </div>
          <div className="text-xs text-fg-secondary">{placeholderSubtitle}</div>
        </div>
      )}
    </div>
  );
}
