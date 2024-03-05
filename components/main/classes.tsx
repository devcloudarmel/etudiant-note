import React from 'react';

interface Etudiant {
  note_math: number;
  note_phys: number;
}

interface Props {
  etudiant: Etudiant[];
}

const Classes: React.FC<Props> = ({ etudiant }) => {
    // Calcul de la moyenne minimale, maximale et des statistiques
    const moyennes = etudiant.length > 0
    ? etudiant.map((etudiant) => (etudiant.note_math + etudiant.note_phys) / 2)
    : [0]; // Valeur par défaut si le tableau est vide
    const moyenneMin = Math.min(...moyennes);
    const moyenneMax = Math.max(...moyennes);
    const admis = etudiant.filter((etudiant) => (etudiant.note_math + etudiant.note_phys) / 2 >= 10).length;
    const redoublants = etudiant.filter((etudiant) => (etudiant.note_math + etudiant.note_phys) / 2 < 10).length;

    return (
        <div className='space-y-2'>
            <div className='flex flex-row space-x-2'>
                <article className="flex gap-3 border rounded-lg p-2 bg-slate-600 hover:bg-slate-500 text-white text-xs">
                    <div className="flex-grow space-y-3">
                        <p>Moyenne min: {moyenneMin}</p>
                    </div>
                </article>
                <article className="flex gap-3 border rounded-lg p-2 bg-slate-600 hover:bg-slate-500 text-white text-xs">
                    <div className="flex-grow space-y-3">
                        <p>Moyenne max: {moyenneMax}</p>
                    </div>
                </article>
                <article className="flex gap-3 border rounded-lg p-2 bg-green-600 hover:bg-green-500 text-white text-xs">
                    <div className="flex-grow space-y-3">
                        <p>Admis: {admis}</p>
                    </div>
                </article>
                <article className="flex gap-3 border rounded-lg p-2 bg-rose-600 hover:bg-rose-500 text-white text-xs">
                    <div className="flex-grow space-y-3">
                        <p>Redoublants: {redoublants}</p>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default Classes;
