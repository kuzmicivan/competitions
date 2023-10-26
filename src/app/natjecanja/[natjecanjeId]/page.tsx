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

export default function Page({ params }: { params: { natjecanjeId: string } }) {

  const [competition, setCompetition] = useState<CompetititonWithResultsAndCreator | null>(null);

  const getCompetitions = useCallback(async (natjecanjeId: string) => {
    axios
      .get(`/api/competitions/${natjecanjeId}`)
      .then((response) => {
        console.log("response", response)
        setCompetition(response.data);
      })
      .catch((error) => console.log("getCompetitions", error));
  }, []);

  useEffect(() => {
    if (params.natjecanjeId)
    getCompetitions(params.natjecanjeId);
  }, [getCompetitions, params.natjecanjeId]);

  return (
    <div className="flex justify-center w-full">
        {competition && <Competition competition={competition}/>}
    </div>
  )
}
