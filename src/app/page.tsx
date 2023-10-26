"use client";

import CompetitionsContainer from "./components/competitions/CompetitionsContainer";
export default function Home() {
  return (
    <main className="flex w-full h-full items-center justify-between">
      <CompetitionsContainer />
    </main>
  );
}
