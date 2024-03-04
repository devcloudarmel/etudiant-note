import EtudiantForm from "@/components/etudiant/form";
import prismadb from "@/lib/prismadb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Etudiant | modifier`
}

export default async function EtudiantId({ params } : { params: { id: string } }) {
    const etudiants = await prismadb.etudiant.findUnique({
        where: { 
            id: params.id
        }
    })
    
    return (
        <EtudiantForm
            initialData={etudiants}
        />
    )
}
