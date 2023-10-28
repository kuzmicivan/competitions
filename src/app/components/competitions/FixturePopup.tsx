"use client";

import { RezultatiSNatjecateljima } from "@/app/natjecanja/[natjecanjeId]/page";
import React, { useState } from "react";
import { guardResult } from "./Competition";
import { XCircleIcon } from "@heroicons/react/24/outline";

interface FixturePopupProps {
  result: RezultatiSNatjecateljima;
  onCloseFixtureDetails: () => void;
  updateFixtureResults: (competitor1Result: number, competitor2Result: number) => void;
}

export function FixturePopup(props: FixturePopupProps) {
  const [competitot1Result, setCompetitot1Result] = useState(
    props.result.RezultatNatjecatelj1
  );

  const [competitot2Result, setCompetitot2Result] = useState(
    props.result.RezultatNatjecatelj2
  );

  const [fixtureResultChanged, setFixtureResultChanged] = useState(false);

  const onCompetitot1ResultChange = (result: number | null) => {
    setFixtureResultChanged(result !== props.result.RezultatNatjecatelj1);
    setCompetitot1Result(result);
  }

  const onCompetitot2ResultChange = (result: number | null) => {
    setFixtureResultChanged(result !== props.result.RezultatNatjecatelj2);
    setCompetitot2Result(result);
  }

  return (
    <div
      className="fixed inset-0 z-20 overflow-y-auto w-screen h-screen backdrop-blur-sm
     flex justify-center items-center"
    >
      <div className="flex flex-col items-center gap-2 w-96 rounded-lg p-4 bg-white text-blue-800">
        <div className="flex w-full justify-end ">
          <XCircleIcon
            className="h-6 w-6 cursor-pointer hover:text-blue-400 "
            onClick={() => {
              props.onCloseFixtureDetails();
              setFixtureResultChanged(false);
            }}
          />
        </div>
        <div className="font-bold">Susret {props.result.Kolo}</div>
        <div className="w-full h-1 rounded bg-blue-800" />
        <div className="w-full px-2 flex flex-col gap-2">
          <div className="flex w-full justify-between items-center text-blue-800">
            <label>{props.result.Natjecatelj1.ImeNatjecatelja}</label>
            <input
              type="number"
              placeholder="-"
              value={competitot1Result?.toString()}
              onChange={(e) =>
                onCompetitot1ResultChange(e.target.value ? Number.parseInt(e.target.value) : null)
              }
              className=" text-right px-2 py-1 hover:outline outline-blue-200 focus:outline-blue-800 rounded outline-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className="flex w-full justify-between items-center text-blue-800">
            <label>{props.result.Natjecatelj2.ImeNatjecatelja}</label>
            <input
              type="number"
              placeholder="-"
              value={competitot2Result?.toString()}
              onChange={(e) =>
                onCompetitot2ResultChange(e.target.value ? Number.parseInt(e.target.value) : null)
              }
              className=" text-right px-2 py-1 hover:outline outline-blue-200 focus:outline-blue-800 rounded outline-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
        <button
          className={`w-full ${!fixtureResultChanged || !competitot1Result || !competitot2Result  ? "bg-opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:text-white"} bg-blue-800 py-1 text-slate-200 rounded-lg`}
          disabled={!fixtureResultChanged || !competitot1Result || !competitot2Result}
          onClick={() => {
            if (competitot1Result && competitot2Result) {
              props.updateFixtureResults(competitot1Result, competitot2Result)
            }
          }}
        >
          Spremi
        </button>
      </div>
    </div>
  );
}
