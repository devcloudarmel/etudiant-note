import { Etudiant } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Resultats from '@/components/main/results'
import Classes from './classes'
import SearchInput from './search-input'

interface Props {
    etudiant: Etudiant[]
}

export default function EtudiantsFromDB({
    etudiant
} : Props) {
    return (
        <div className='space-y-3 grow'>
            <div>
                <p className='font-bold text-xl'>Recherche:</p>
                <SearchInput />
            </div>
            {etudiant.map((etudiant) => (
                <Link href={`/etudiant/${etudiant.id}`} key={etudiant.id} className='block'>
                    <Resultats etudiant={etudiant} />
                </Link>
            ))}
            {etudiant.length === 0 && (
                <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="relative w-60 h-60">
                        <Image
                            fill
                            src="/empty.png"
                            alt="Empty"
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">Warning: FlatList vide, veiller ajouter....</p>
                </div>
            )}
            <Classes etudiant={etudiant} />
        </div>
    )
}
