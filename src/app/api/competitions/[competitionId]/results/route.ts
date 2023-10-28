import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { competitionId: string } }
) {
  const competitionId = params.competitionId as string;
  if (!competitionId) {
    return Response.json({ error: "competitionId is required." });
  }

  try {
    const natjecanje = await prisma.natjecanja.findUnique({
      where: {
        NatjecanjeID: Number.parseInt(competitionId)
      },
    });

    if (!natjecanje) {
      return Response.json({ error: "Natjecanje not found." });
    }

    const [winPoints, drawPoints, losePoints] = natjecanje.SustavBodovanja.split("/").map(Number);

    let natjecatelji = await prisma.natjecatelji.findMany({
      where: {
        NatjecanjeID: Number.parseInt(competitionId)
      },
      include: {
        Rezultati1: true,
        Rezultati2: true,

      }
    });

    const natjecateljiWithScores = natjecatelji.map(natjecatelj => ({
      ...natjecatelj,
      totalPoints: 0
    }));
    

    for (let natjecatelj of natjecateljiWithScores) {
      let totalPoints = 0;
      
      for (const rezultat of natjecatelj.Rezultati1) {
        if (rezultat.RezultatNatjecatelj1 === null || rezultat.RezultatNatjecatelj2 === null) {
          continue;
        }
        if (rezultat.RezultatNatjecatelj1 > rezultat.RezultatNatjecatelj2) {
          totalPoints += winPoints;
        } else if (rezultat.RezultatNatjecatelj1 === rezultat.RezultatNatjecatelj2) {
          totalPoints += drawPoints;
        } else {
          totalPoints += losePoints;
        }
      }
      
      for (const rezultat of natjecatelj.Rezultati2) {
        if (rezultat.RezultatNatjecatelj1 === null || rezultat.RezultatNatjecatelj2 === null) {
          continue;
        }
        if (rezultat.RezultatNatjecatelj2 > rezultat.RezultatNatjecatelj1) {
          totalPoints += winPoints;
        } else if (rezultat.RezultatNatjecatelj2 === rezultat.RezultatNatjecatelj1) {
          totalPoints += drawPoints;
        } else {
          totalPoints += losePoints;
        }
      }

      natjecatelj.totalPoints = totalPoints;
    }

    natjecateljiWithScores.sort((a, b) => b.totalPoints - a.totalPoints);

    return Response.json(natjecateljiWithScores);
  } catch (error) {
    return Response.json({ error: `Failed to find competition. ${error}` });
  }
}
