"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: SITE.timezone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? "--:--:--"} WIB
    </span>
  );
}
