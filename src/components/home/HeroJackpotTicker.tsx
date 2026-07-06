"use client";

import dynamic from "next/dynamic";

const JackpotTicker = dynamic(() => import("./JackpotTicker"), { ssr: false });

export default function HeroJackpotTicker() {
  return <JackpotTicker />;
}
