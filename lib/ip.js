import { headers } from "next/headers";

export function getIPv4() {
  const h = headers();
  let ip =
    h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "0.0.0.0";

  if (ip.includes(":")) {
    ip = ip.split(":").pop();
  }

  return ip;
}
