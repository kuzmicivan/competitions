'use client';

import { Note as NotePrisma } from "@prisma/client";
import Link from "next/link";

interface NoteProps {
    note: NotePrisma;
}

export default function Note(props: NoteProps) {

    return (
        <Link href={`/notes/${props.note.id}}`}>
        <div className="flex flex-col items-center justify-center gap-2 max-w-lg hover:bg-white bg-slate-100 hover:text-blue-600 text-blue-800 rounded-lg p-4">
            <div className="font-bold text-xl overflow-auto w-full max-h-[10em] break-words">
                {props.note.title}
            </div>
            <div className="overflow-auto w-full max-h-[10em] break-words">
                {props.note.body}
            </div>
        </div>
        </Link>
    )
}