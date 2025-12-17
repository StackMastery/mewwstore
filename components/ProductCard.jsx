"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { getDiscountedPrice } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

function ProductCard({
  thumb,
  name,
  slug,
  price,
  discount,
  variant = "column",
}) {
  const to = `/product/${slug?.current}`;
  const isRow = variant === "row";

  const imgRef = useRef(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const handleLoad = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let i = 0; i < data.length; i += 40) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);

      setBgColor(`rgb(${r}, ${g}, ${b})`);

      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      setTextColor(brightness < 128 ? "#fff" : "#000");
    };

    if (img.complete) handleLoad();
    else img.addEventListener("load", handleLoad);

    return () => img.removeEventListener("load", handleLoad);
  }, []);

  return (
    <article
      className={clsx(
        "group relative overflow-hidden w-full rounded-md transition-all",
        isRow ? "flex items-center gap-3 pr-5 " : "flex flex-col"
      )}
      style={{
        background: `linear-gradient(135deg, ${bgColor}, ${bgColor}, #ffffff)`,
        border: `1px solid ${bgColor}`,
        color: textColor,
      }}
    >
      <div className="absolute inset-[-2px] backdrop-blur-3xl" />

      <Link
        href={to}
        className={clsx(
          "relative z-10 shrink-0",
          isRow ? "w-20 h-20" : "w-full aspect-square"
        )}
      >
        <div className="relative w-full h-full overflow-hidden rounded-md">
          {discount ? (
            <span className="absolute right-1 top-1 z-10 rounded bg-red-500 px-1 text-[10px] text-white">
              {discount}%
            </span>
          ) : null}

          <Image
            ref={imgRef}
            src={thumb}
            alt={name}
            fill
            crossOrigin="anonymous"
            className="object-cover"
          />
        </div>
      </Link>

      <div
        className={`relative z-10 flex flex-col justify-center flex-1 min-w-0 ${isRow ? " " : "p-4"}`}
      >
        <Link href={to}>
          <h3 className="font-bold text-base line-clamp-2">{name}</h3>
        </Link>

        <div className="mt-1 flex items-center gap-2 text-xs">
          {discount ? (
            <span className="line-through opacity-60">
              {getDiscountedPrice(price, discount)} $
            </span>
          ) : null}

          <span className="font-extrabold">{price} $</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

export function ProductCardSkeleton({ variant = "column", className }) {
  const isRow = variant === "row";

  return (
    <article
      className={clsx(
        "rounded-md border p-3",
        isRow ? "flex gap-3" : "flex flex-col space-y-3",
        className
      )}
    >
      <Skeleton
        className={clsx(
          "rounded-md",
          isRow ? "w-28 aspect-square" : "w-full aspect-square"
        )}
      />

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </article>
  );
}
