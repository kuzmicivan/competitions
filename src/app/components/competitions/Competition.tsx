"use client";

import {
  CompetititonWithResultsAndCreator,
  RezultatiSNatjecateljima,
  NatjecateljSBodovima,
} from "@/app/natjecanja/[natjecanjeId]/page";
import { useCallback, useState } from "react";
import { FixturePopup } from "./FixturePopup";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

interface CompetitionProps {
  competition: CompetititonWithResultsAndCreator;
  results: NatjecateljSBodovima[];
  triggerUpdate: () => void;
}

export function guardResult(result: number | null) {
  return result ?? "-";
}

export default function Competition(props: CompetitionProps) {
  const [isFixtureDeatilsVisible, setIsFixtureDetailsVisible] = useState(false);
  const [selectedFixture, setSelectedFixture] =
    useState<RezultatiSNatjecateljima | null>(null);
  const { user } = useUser();

  const isCreator = user?.sub === props.competition.Stvaratelj.Auth0ID;

  function onFixtureSelected(fixture: RezultatiSNatjecateljima) {
    setSelectedFixture(fixture);
    setIsFixtureDetailsVisible(true);
  }

  function onCloseFixtureDetails() {
    setSelectedFixture(null);
    setIsFixtureDetailsVisible(false);
  }

  const updateFixtureResults = useCallback(
    async (competitor1Result: number, competitor2Result: number) => {
      axios
        .post(
          `/api/competitions/${props.competition.NatjecanjeID}/results/${selectedFixture?.RezultatID}}`,
          {
            competitor1Id: selectedFixture?.Natjecatelj1ID,
            competitor2Id: selectedFixture?.Natjecatelj2ID,
            competitor1Result,
            competitor2Result,
          }
        )
        .then(() => {
          props.triggerUpdate();
          setIsFixtureDetailsVisible(false);
          setSelectedFixture(null);
        })
    },
    [props.competition.NatjecanjeID, selectedFixture]
  );

  return (
    <>
      {isFixtureDeatilsVisible && selectedFixture && (
        <FixturePopup
          result={selectedFixture}
          onCloseFixtureDetails={onCloseFixtureDetails}
          updateFixtureResults={updateFixtureResults}
        />
      )}
      <div className="w-full">
        <div className="w-full flex justify-between">
          <div className="w-full">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-blue-800" />
              <div className="font-bold text-xl">
                {props.competition.NazivNatjecanja}
              </div>
            </div>

            <div className="mb-4 flex w-1/2 gap-20">
            <div>
              <div className="font-medium">Poredak</div>
            <div className="flex flex-col">
              {props.results.map((result, id) => (
                <div key={id} className="flex font-extralight text-white justify-between items-center">
                  <div className="flex gap-3 pr-20 items-center">
                  <div className="font-light text-base">
                    {id + 1}
                  </div>
                  <div className="text-sm">{result.ImeNatjecatelja}</div>
                  </div>
                  <div className=" text-sm">{result.totalPoints}</div>
                </div>
              ))}
            </div>

            </div>
              <div>
              <div className="font-medium">Sustav bodovanja</div>
              <div className="font-extralight text-sm">
                {props.competition.SustavBodovanja}
              </div>
              </div>
            </div>
            <div className="mb-4 font-medium">Susreti</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {props.competition.Rezultati.slice()
            .sort((a, b) => a.Kolo - b.Kolo)
            .map((result, id) => (
              <div
                key={id}
                className={`${
                  isCreator &&
                  "hover:bg-white hover:text-blue-600 cursor-pointer"
                } bg-slate-100 text-blue-800 p-4 rounded-md`}
                onClick={() => {
                  if (isCreator) {
                    onFixtureSelected(result);
                  }
                }}
              >
                <div className="flex font-bold">{`Susret ${result.Kolo}`}</div>
                <div className="flex w-full justify-between">
                  <div>{result.Natjecatelj1.ImeNatjecatelja}</div>
                  <div>{guardResult(result.RezultatNatjecatelj1)}</div>
                </div>
                <div className="flex w-full justify-between">
                  <div>{result.Natjecatelj2.ImeNatjecatelja}</div>
                  <div>{guardResult(result.RezultatNatjecatelj2)}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
