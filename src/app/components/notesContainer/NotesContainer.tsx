"use client";

import axios from "axios";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import CompetitionCard from "./Note";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Note } from "@prisma/client";
import { useNotes } from "@/app/hooks/useNotes";

export default function NotesContainer() {
  const { notes } = useNotes();

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold"> Notes</div>
        <Link href="/notes/add">
          <div className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 hover:text-white text-slate-100 px-4 py-2 rounded-md">
            <PlusCircleIcon className="h-6 w-6" />
            Add
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {notes?.length > 0 &&
          notes?.map((note) => <CompetitionCard key={note.id} note={note} />)}
      </div>
    </div>
  );
}
