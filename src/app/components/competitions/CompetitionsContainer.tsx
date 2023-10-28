"use client";

import { Natjecanja } from "@prisma/client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import CompetitionCard from "./CompetitonCard";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function CompetitionsContainer() {
  const [competitions, setCompetitions] = useState<Natjecanja[]>([]);

  const getCompetitions = useCallback(async () => {
    axios
      .get("/api/competitions")
      .then((response) => {
        setCompetitions(response.data);
      })
  }, []);

  useEffect(() => {
    getCompetitions();
  }, [getCompetitions]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold"> Natjecanja</div>
        <Link href="/natjecanja/dodaj">
          <div className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 hover:text-white text-slate-100 px-4 py-2 rounded-md">
            <PlusCircleIcon className="h-6 w-6" />
            Dodaj
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {competitions?.map((competition, id) => (
          <CompetitionCard key={id} competition={competition} />
        ))}
      </div>
    </div>
  );
}
