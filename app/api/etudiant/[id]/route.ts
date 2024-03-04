import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { numEt, nom, note_math, note_phys } = body;

    if (!params.id) {
        return new NextResponse("Etudiant Id required", { status: 400 });
    }

    if (!numEt || !nom || !note_math || !note_phys) {
        return new NextResponse("Missing required fields", { status: 400 });
    };

    const etudiant = await prismadb.etudiant.update({
        where: {
            id: params.id,
        },
        data: {
            numEt,
            nom,
            note_math,
            note_phys
        }
    });

    return NextResponse.json(etudiant);
    } catch (error) {
        console.log("[ETUDIANT_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
  try {

    const etudiant = await prismadb.etudiant.delete({
        where: {
            id: params.id
        }
    });

    return NextResponse.json(etudiant);
  } catch (error) {
    console.log("[ETUDIANT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};