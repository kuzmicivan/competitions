'use client';

import { Natjecanja } from "@prisma/client";
import Link from "next/link";

interface CompetitionProps {
    competition: Natjecanja;
}

export default function Competition(props: CompetitionProps) {

    return (
        <Link href={`/natjecanja/${props.competition.NatjecanjeID}}`}>
        <div className="flex flex-col items-center justify-center gap-2 max-w-lg hover:bg-white bg-slate-100 hover:text-blue-600 text-blue-800 rounded-lg p-4">
            <div className="font-bold">
                {props.competition.NazivNatjecanja}
            </div>
            <div className="w-full h-1 rounded bg-blue-800"/>
            <div className="w-full px-2">
                <div className="text-left font-medium">
                    Sustav bodovanja
                </div>
                <div className="text-right font-extralight">
                    {props.competition.SustavBodovanja}
                </div>
                
            </div>
        </div>
        </Link>
    )
}