'use client';

import { CompetitionEntryFormData } from "@/types/competitionEntry";
import axios from "axios";
import React, { useCallback, useState } from "react";

const CompetitionEntryBox: React.FC = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("FormData:", formData);
  };

  const createCompetition = useCallback(() => {
    const splitParticipants = formData.participants
        .split(/,\s*|\n/)
        .map(name => name.trim())
        .filter(Boolean)

    const postData = {
        competitionName: formData.competitionName,
        participants: splitParticipants,
        scoringSystem: formData.scoringSystem
    }

    console.log("postData", postData)

    axios.post("/api/competitions", postData).then((res) => console.log("res", res));
  }, [formData])


  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-blue-900 px-16 py-8 rounded text-white w-[500px] flex flex-col justify-center gap-8">
        <div className="flex flex-col justify-between">
          <h1></h1>
          <label htmlFor="competitionName" className="whitespace-nowrap">
            Naziv natjecanja
          </label>
          <input
            type="text"
            id="competitionName"
            name="competitionName"
            className="text-black w-full rounded px-2 py-1 focus:outline-none"
            value={formData.competitionName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col justify-between">
          <label htmlFor="participants">Natjecatelji</label>
          <textarea
            id="participants"
            name="participants"
            className="text-black w-full rounded px-2 py-1 focus:outline-none"
            value={formData.participants}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col justify-between">
          <label htmlFor="scoringSystem">Sustav bodovanja</label>
          <input
            type="text"
            id="scoringSystem"
            name="scoringSystem"
            className="text-black w-full rounded px-2 py-1 focus:outline-none"
            value={formData.scoringSystem}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          onClick={createCompetition}
          className="w-full bg-gray-900 text-white hover p-2 rounded-lg hover:bg-gray-800"
        >
          Stvori Natjecanje
        </button>
      </div>
    </form>
  );
};

export default CompetitionEntryBox;
