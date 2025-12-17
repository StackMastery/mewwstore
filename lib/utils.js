import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getDiscountedPrice(price, discountPercent) {
  if (typeof price !== "number" || typeof discountPercent !== "number") {
    throw new TypeError("price and discountPercent must be numbers");
  }

  if (price < 0 || discountPercent < 0) {
    throw new RangeError("price and discountPercent must be >= 0");
  }

  const discounted =
    Math.round((price - (price * discountPercent) / 100) * 100) / 100;

  return discounted;
}
