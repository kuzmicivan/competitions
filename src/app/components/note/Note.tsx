'use client';

import { NoteDto } from "@/app/notes/[id]/page";


interface NoteProps {
    note: NoteDto;
}

export default function Note(props: NoteProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 max-w-lg hover:bg-white bg-slate-100 hover:text-blue-600 text-blue-800 rounded-lg p-4">
            <div className="font-bold w-full text-3xl">
                {props.note.title}
            </div>
            <div className="overflow-auto w-full max-h-[10em] break-words">
                {props.note.body}
            </div>
            {props.note.photo && <img
                className="w-90 h-48"
                src={props.note.photo}
                alt={`captured-photo`}
              />}
        </div>
    )
}