"use client";
import { forwardRef, ImgHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE_URL =
  "https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, className, onError, ...props }, ref) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(src as string | undefined);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setImgSrc(FALLBACK_IMAGE_URL);
      onError?.(e);
    };

    if (!src) {
      return <div ref={ref as React.Ref<HTMLDivElement>} data-empty-image className={cn(className)} {...(props as any)} />;
    }

    return (
      <img
        ref={ref}
        src={imgSrc || src}
        alt={alt ?? ""}
        className={cn("w-full h-full object-cover", className)}
        onError={handleError}
        {...props}
      />
    );
  }
);
Image.displayName = "Image";
