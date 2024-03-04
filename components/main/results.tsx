import { Etudiant } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { Badge } from '../ui/badge';
import { Clock } from 'lucide-react';
import { formattedDate } from '@/lib/utils';

interface Props {
    etudiant: Etudiant,
}

export default function Resultats({
    etudiant: {
        numEt,
        nom,
        note_math,
        note_phys,
        created_at
    }
}: Props) {
    const moyenne = (note_math + note_phys) / 2;
    return (
        <article className='flex gap-5 border rounded-lg p-2 hover:bg-muted'>
            <Image 
                src='/students.png'
                alt="logo"
                height={50}
                width={50}
                className="rounded-lg self-center"
            />
            <div className='flex-grow space-y-2'>
                <div>
                    <h2 className="text-sm font-medium">{nom}</h2>
                    <p className="text-muted-foreground text-xs">Numéro: {numEt}</p>
                </div>
                <div className="text-muted-foreground">
                    <p className="flex items-center gap-1.5 text-xs">
                        Mathématique: 
                        {note_math}
                    </p>
                    <p className="flex items-center gap-1.5 text-xs">
                        Physique: 
                        {note_phys}
                    </p>
                    <p className="flex items-center gap-1.5 text-xs underline font-bold text-green-600">
                        Moyenne: 
                        {moyenne}
                    </p>
                </div>
            </div>
            <div className="flex flex-col shrink-0 items-end justify-between text-xs">
                {moyenne >=10 ? (
                    <Badge variant="success">
                        Admis
                    </Badge>
                ) : (
                    <Badge variant='destructive'>
                        Redoublant
                    </Badge>
                )}
                <span className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock className="h-3 w-3" />
                    {formattedDate(created_at)}
                </span>
            </div>
        </article>
    )
}
