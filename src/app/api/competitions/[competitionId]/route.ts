import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { competitionId: string } }) {
    const competitionId = params.competitionId as string;
  try {
    let competition = await prisma.natjecanja.findUnique({
        where: {
            NatjecanjeID: Number.parseInt(competitionId)
        },
        include: {
            Rezultati: {
              include: {
                Natjecatelj1: true,
                Natjecatelj2: true
              }
            },
            Stvaratelj: true
        }
    });

    return Response.json(competition);
  } catch (error) {
    return Response.json({ error: `Failed to find competition. ${error}` });
  }
}