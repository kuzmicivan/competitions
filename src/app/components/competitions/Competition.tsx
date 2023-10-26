"use client";

import {
  CompetititonWithResultsAndCreator,
  RezultatiSNatjecateljima,
} from "@/app/natjecanja/[natjecanjeId]/page";
import { useState } from "react";
import { FixturePopup } from "./FixturePopup";
import { useUser } from "@auth0/nextjs-auth0/client";

interface CompetitionProps {
  competition: CompetititonWithResultsAndCreator;
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

  console.log("isCreator", isCreator);

  function onFixtureSelected(fixture: RezultatiSNatjecateljima) {
    setSelectedFixture(fixture);
    setIsFixtureDetailsVisible(true);
  }

  function onCloseFixtureDetails() {
    setSelectedFixture(null);
    setIsFixtureDetailsVisible(false);
  }
  return (
    <>
      {isFixtureDeatilsVisible && selectedFixture && (
        <FixturePopup
          result={selectedFixture}
          onCloseFixtureDetails={onCloseFixtureDetails}
        />
      )}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-blue-800" />
          <div className="font-bold text-xl">
            {props.competition.NazivNatjecanja}
          </div>
        </div>

        <div className="mb-4">
          <div className="font-medium">Sustav bodovanja</div>
          <div className="font-extralight text-sm">
            {props.competition.SustavBodovanja}
          </div>
        </div>
        <div className="mb-4 font-medium">Kola</div>
        <div className="grid grid-cols-3 gap-4">
          {props.competition.Rezultati.map((result, id) => (
            <div
              key={id}
              className={`${isCreator && "hover:bg-white hover:text-blue-600 cursor-pointer"} bg-slate-100 text-blue-800 p-4 rounded-md`}
              onClick={() => {
                if (isCreator) {
                  onFixtureSelected(result);
                }
              }}
            >
              <div className="flex font-bold">{`Kolo ${result.Kolo}`}</div>
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
