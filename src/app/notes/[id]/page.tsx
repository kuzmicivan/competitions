"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import axios from "axios";
import Note from "@/app/components/note/Note";
import { Note as NotePrisma } from "@prisma/client";
import { useNote } from "@/app/hooks/useNote";

export interface NoteDto {
  id: number;
  title: string;
  body: string;
  photo: string;
  auth0ID: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const { note } = useNote(params.id);

  return (
    <div className="flex justify-center w-full">
      {note && <Note note={note} />}
    </div>
  );
}
