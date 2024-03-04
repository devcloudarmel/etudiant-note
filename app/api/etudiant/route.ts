import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { numEt, nom, note_math, note_phys } = body;

        if (!numEt || !nom || !note_math || !note_phys) {
            return new NextResponse("Missing required fields", { status: 400 });
        };

        const etudiant = await prismadb.etudiant.create({
            data: {
                numEt,
                nom,
                note_math,
                note_phys
            }
        });

        return NextResponse.json(etudiant);
    } catch (error) {
        console.log("[ETUDIANT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};