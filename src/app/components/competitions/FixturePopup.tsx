"use client";

import { RezultatiSNatjecateljima } from "@/app/natjecanja/[natjecanjeId]/page";
import React from "react";
import { guardResult } from "./Competition";
import { XCircleIcon } from "@heroicons/react/24/outline";

interface FixturePopupProps {
  result: RezultatiSNatjecateljima;
  onCloseFixtureDetails?: () => void;
}

export function FixturePopup(props: FixturePopupProps) {
  return (
    <div
      className="fixed inset-0 z-20 overflow-y-auto w-screen h-screen backdrop-blur-sm
     flex justify-center items-center"
    >
      <div className="flex flex-col items-center gap-2 w-96 rounded-lg p-4 bg-white text-blue-800">
        <div className="flex w-full justify-end hover:text-blue-600 cursor-pointer" onClick={props.onCloseFixtureDetails}>
            <XCircleIcon className="h-6 w-6"/>
        </div>
        <div className="font-bold">Kolo {props.result.Kolo}</div>
        <div className="w-full h-1 rounded bg-blue-800" />
        <div className="w-full px-2">
          <div className="text-left font-medium"></div>
          <div className="flex w-full justify-between text-blue-800">
              <div>{props.result.Natjecatelj1.ImeNatjecatelja}</div>
              <div>{guardResult(props.result.RezultatNatjecatelj1)}</div>
            </div>
            <div className="flex w-full justify-between">
              <div>{props.result.Natjecatelj2.ImeNatjecatelja}</div>
              <div>{guardResult(props.result.RezultatNatjecatelj2)}</div>
            </div>
          </div>
        </div>
      </div>
  );
}
