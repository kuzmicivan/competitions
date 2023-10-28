import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { competitionId: string, fixtureId: string } }) {

  const competitionId = params.competitionId as string;
  const fixtureId = params.fixtureId as string;

  if (!competitionId) {
    return Response.json({ error: "competitionId required" });
  } else if (!fixtureId) {
    return Response.json({ error: "fixtureId required" });
  }

  const { competitor1Id, competitor2Id, competitor1Result,  competitor2Result } = await req.json();

  if (!competitor1Id) {
    return Response.json({ error: "competitor1Id required." });
  } else 
  if (!competitor2Id) {
    return Response.json({ error: "competitor2Id required." });
  }
  if (!competitor1Result) {
    return Response.json({ error: "competitor1Result required." });
  }
  if (!competitor2Result) {
    return Response.json({ error: "competitor2Result required." });
  }

  try {
    const competition = await prisma.natjecanja.findUnique({
        where: {
          NatjecanjeID: Number.parseInt(competitionId)
        },
      });

      if (!competition) {
        return Response.json({ error: `Competition ${competition} doesn't exist.` }); 
    }

    const fixture = await prisma.rezultati.findUnique({
      where: {
        RezultatID: Number.parseInt(fixtureId)
      },
    });

    if (!fixture) {
        return Response.json({ error: `Fixture ${fixtureId} doesn't exist.` }); 
    }

    const updateResponse = await prisma.rezultati.update({
        where: { RezultatID: Number.parseInt(fixtureId) },
        data: {
          RezultatNatjecatelj1: competitor1Result,
          RezultatNatjecatelj2: competitor2Result,
        },
      });

      return Response.json({updateResponse});

    

  } catch (error) {
    return Response.json({ error: `Failed to create competition. ${error}` });
  }
}

function generateUniqueLink(): string {
  // Implementirajte logiku za generiranje jedinstvene poveznice.
  // Primjer:
  return Math.random().toString(36).substr(2, 9);
}
