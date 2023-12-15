"use client";

import NotesContainer from "./components/notesContainer/NotesContainer";


export default function Home() {
  return (
    <main className="flex w-full h-full items-center justify-between">
      <NotesContainer />
    </main>
  );
}
