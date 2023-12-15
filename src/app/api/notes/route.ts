import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { user } = await getSession();

    const notes = await prisma.note.findMany({
      where: {
        auth0ID: user.sub,
      },
    });

    return Response.json(notes);
  } catch (error) {
    return Response.json({ error: `Failed to find user notes` });
  }
}

export async function POST(req: Request) {
  const { title, body, photo } = await req.json();

  if (!title || !body) {
    return Response.json({ error: "title and body are required." });
  }

  try {
    const { user } = await getSession();

    const note = await prisma.note.create({
      data: {
        title,
        body,
        auth0ID: user.sub,
        photo
      }
    });

    return Response.json(note);
  } catch (error) {
    return Response.json({ error: `Failed to add note, ${error}` });
  }
}
