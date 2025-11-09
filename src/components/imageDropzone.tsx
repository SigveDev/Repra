"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, type FileError } from "react-dropzone";
import { cn } from "@/lib/utils";
import CustomImage from "./CustomImage";

export type ImageDropzoneProps = {
  onChange?: (file: File | null) => void;
  initialPreviewUrl?: string | null;
  // If `previewUrl` is provided the component becomes controlled for previewing
  // and will NOT update the visible preview when a new file is dropped. This
  // lets the parent show the existing image until it has been transformed and
  // saved.
  previewUrl?: string | null;
  rejectGif?: boolean;
  className?: string;
  placeholderTitle?: string;
  placeholderSubtitle?: string;
};

export default function ImageDropzone({
  onChange,
  initialPreviewUrl = null,
  previewUrl: previewUrlProp,
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
        // Only update the internal preview if the parent hasn't provided a
        // controlled preview URL. When the parent passes `previewUrl` we
        // expect it to decide when the displayed image should change (for
        // example after the TransformImageModal saves).
        if (!previewUrlProp) {
          const url = URL.createObjectURL(first);
          setPreviewUrl(url);
        }
        if (onChange) onChange(first);
      }
    },
    [onChange, previewUrlProp]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
    validator: fileValidator,
  });

  useEffect(() => {
    return () => {
      // Only revoke object URLs that we created internally and that are not
      // equal to the externally-controlled preview URL.
      if (
        previewUrl &&
        previewUrl !== initialPreviewUrl &&
        previewUrl !== previewUrlProp
      ) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch (e) {
          void e;
        }
      }
    };
  }, [previewUrl, initialPreviewUrl, previewUrlProp]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "w-full h-full rounded-xl overflow-hidden flex items-center justify-center cursor-pointer bg-fg-secondary/10",
        className
      )}
    >
      <input {...getInputProps()} />

      {previewUrlProp ?? previewUrl ? (
        <div className="w-full h-full relative">
          <CustomImage
            src={(previewUrlProp ?? previewUrl) as string}
            alt={file?.name ?? "preview"}
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
