import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id as string;
  if (!id) {
    return Response.json({ error: "id is required." });
  }

  try {
    const note = await prisma.note.findUnique({
      where: {
        id: Number.parseInt(id)
      },
    });

    if (!note) {
      return Response.json({ error: "note not found." });
    }

    return Response.json(note);
  } catch (error) {
    return Response.error();
  }
}
