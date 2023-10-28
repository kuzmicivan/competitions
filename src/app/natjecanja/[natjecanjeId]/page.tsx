'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { Korisnici, Natjecanja, Natjecatelji, Rezultati } from '@prisma/client';
import axios from 'axios';
import Competition from '@/app/components/competitions/Competition';

export interface CompetititonWithResultsAndCreator extends Natjecanja {
  Rezultati: RezultatiSNatjecateljima[];
  Stvaratelj: Korisnici;
}

export interface RezultatiSNatjecateljima extends Rezultati {
  Natjecatelj1: Natjecatelji;
  Natjecatelj2: Natjecatelji;
}

export interface NatjecateljSBodovima extends Natjecatelji {
  totalPoints: number;
}

export default function Page({ params }: { params: { natjecanjeId: string } }) {

  const [competition, setCompetition] = useState<CompetititonWithResultsAndCreator | null>(null);
  const [results, setResults] = useState<NatjecateljSBodovima[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);


  const getCompetition = useCallback(async (natjecanjeId: string) => {
    axios
      .get(`/api/competitions/${natjecanjeId}`)
      .then((response) => {
        setCompetition(response.data);
      })
  }, []);

  const getResults = useCallback(async (natjecanjeId: string) => {
    axios
      .get(`/api/competitions/${natjecanjeId}/results`)
      .then((response) => {
        setResults(response.data);
      })
  }, []);

  useEffect(() => {
    if (params.natjecanjeId){
    getCompetition(params.natjecanjeId);
    getResults(params.natjecanjeId);
  }
  }, [getCompetition, getResults, params.natjecanjeId, updateTrigger]);

  return (
    <div className="flex justify-center w-full">
        {competition && <Competition competition={competition} results={results}  triggerUpdate={() => setUpdateTrigger(updateTrigger + 1)}/>}
    </div>
  )
}
