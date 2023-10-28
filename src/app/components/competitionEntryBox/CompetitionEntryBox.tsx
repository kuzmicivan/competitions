"use client";

import { CompetitionEntryFormData } from "@/types/competitionEntry";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const CompetitionEntryBox: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CompetitionEntryFormData>({
    competitionName: "",
    participants: "",
    scoringSystem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidScoringSystem = (score: string) => {
    const regex = /^\d+\/\d+\/\d+$/;
    return regex.test(score);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const createCompetition = useCallback(() => {
    const splitParticipants = formData.participants
      .split(/,\s*|\n/)
      .map((name) => name.trim())
      .filter(Boolean);

      if (
        !isValidScoringSystem(formData.scoringSystem) 
      ) {
        alert("Krivi unos sustava bodovanja.");
        return;
      }

      if (
        splitParticipants.length < 4 
      ) {
        alert("Premali broj natjecatelja");
        return;
      }

      if (
        splitParticipants.length > 8
      ) {
        alert("Preveliki broj natjecatelja");
        return;
      }

    const postData = {
      competitionName: formData.competitionName,
      participants: splitParticipants,
      scoringSystem: formData.scoringSystem,
    };

    

    axios.post("/api/competitions", postData).then((res) => router.push("/"));
  }, [formData]);

  return (
    <div>
      <div className="text-3xl font-bold mb-2">Dodaj natjecanje</div>
      <form onSubmit={handleSubmit}>
        <div className="bg-slate-200 px-8 py-8 rounded text-blue-800 w-[500px] flex flex-col justify-center gap-8">
          <div className="flex flex-col justify-between">
            <h1></h1>
            <label htmlFor="competitionName" className="font-semibold">
              Naziv natjecanja
            </label>
            <input
              type="text"
              id="competitionName"
              name="competitionName"
              placeholder="e.g. svjetsko prvenstvo u kuglanju"
              className="w-full rounded px-2 py-1 focus:outline-none placeholder:text-slate-300 placeholder:font-thin" 
              value={formData.competitionName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col justify-between">
            <label htmlFor="participants" className="font-semibold">
              Natjecatelji
            </label>
            <textarea
              id="participants"
              name="participants"
              placeholder="Odvojeni zarezom ili novim novim redom (4-8 natjecatelja)"
              className="w-full rounded px-2 py-1 focus:outline-none placeholder:text-slate-300 placeholder:font-thin"
              value={formData.participants}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col justify-between">
            <label htmlFor="scoringSystem" className="font-semibold">
              Sustav bodovanja
            </label>
            <input
              type="text"
              id="scoringSystem"
              name="scoringSystem"
              placeholder="e.g. 2/1/0"
              className="w-full rounded px-2 py-1 focus:outline-none placeholder:text-slate-300 placeholder:font-thin" 
              value={formData.scoringSystem}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            onClick={createCompetition}
            disabled={!formData.competitionName || !formData.participants || !formData.scoringSystem}
            className={`w-full ${
              !formData.competitionName || !formData.participants || !formData.scoringSystem
                ? "bg-opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700 hover:text-white"
            } p-2 rounded-lg bg-blue-800 text-slate-200`}
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompetitionEntryBox;
