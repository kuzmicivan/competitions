import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { predefinedSchedules } from "@/types/predefinedSchedules";
import { getSession } from "@auth0/nextjs-auth0";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    let natjecanja = await prisma.natjecanja.findMany();

    return Response.json(natjecanja);
  } catch (error) {
    return Response.json({ error: `Failed to create competition. ${error}` });
  }
}

export async function POST(req: Request) {
  const session = await getSession();

  const { competitionName, participants, scoringSystem } = await req.json();

  if (!competitionName || !participants || !scoringSystem) {
    return Response.json({ error: "All fields are required." });
  }

  if (participants.length < 4 || participants.length > 8) {
    return Response.json({ error: "Natjecatelja smije biti između 4 i 8!" });
  }

  try {
    let stvaratelj = await prisma.korisnici.findUnique({
      where: {
        Auth0ID: session?.user.sub,
      },
    });

    if (!stvaratelj) {
      stvaratelj = await prisma.korisnici.create({
        data: {
          ImeKorisnika: session?.user.name,
          EmailKorisnika: session?.user.email,
          Auth0ID: session?.user.sub,
        },
      });
    }

    const natjecanje = await prisma.natjecanja.create({
      data: {
        Stvaratelj: {
          connect: {
            Auth0ID: session?.user.sub,
          },
        },
        NazivNatjecanja: competitionName,
        SustavBodovanja: scoringSystem,
        Natjecatelji: {
          create: participants.map((participantName: string) => ({
            ImeNatjecatelja: participantName,
          })),
        },
        PoveznicaNatjecanja: generateUniqueLink(),
      },
      include: {
        Natjecatelji: true,
      },
    });

    const natjecateljiIds = natjecanje.Natjecatelji.map((n) => n.NatjecateljID);
    const schedule = predefinedSchedules[natjecateljiIds.length];

    const rezultatiPromises = [];

    for (let kolo = 0; kolo < schedule.length; kolo++) {
      const matchup = schedule[kolo];
      rezultatiPromises.push(
        prisma.rezultati.create({
          data: {
            Kolo: kolo + 1, // jer počinjemo od 1, ne od 0
            NatjecanjeID: natjecanje.NatjecanjeID,
            Natjecatelj1ID: natjecateljiIds[matchup[0] - 1],
            Natjecatelj2ID: natjecateljiIds[matchup[1] - 1],
          },
        })
      );
    }

    try {
      const rezultati = await prisma.$transaction(rezultatiPromises);
      return Response.json(rezultati);
    } catch (error) {
      console.error("Pogreška prilikom kreiranja rezultata:", error);
      return Response.json({
        error: `Pogreška prilikom kreiranja rezultata: ${error}`,
      });
    }
  } catch (error) {
    return Response.json({ error: `Failed to create competition. ${error}` });
  }
}

function generateUniqueLink(): string {
  // Implementirajte logiku za generiranje jedinstvene poveznice.
  // Primjer:
  return Math.random().toString(36).substr(2, 9);
}
