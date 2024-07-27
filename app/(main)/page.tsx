import EtudiantsFromDB from "@/components/main/etudiant-from-db";
import prismadb from "@/lib/prismadb";
import { LayoutPanelLeft } from "lucide-react";
import Link from "next/link";

interface Props {
	searchParams: {
		nom: string,
	}
}

export default async function Home({ searchParams }: Props) {
	const etudiant = await prismadb.etudiant.findMany({
		where: {
			nom: {
				contains: searchParams.nom
			}
		},

		orderBy: { created_at: 'desc' }
	});

	return (
		<main className="m-auto space-y-5 px-10 my-5">
			<div className="flex flex-col">
				<Link href='/'>
					<h1 className='text-4xl font-semibold flex items-center'>
						<LayoutPanelLeft className='h-8 w-8 mr-1' />
						E-School
					</h1>
				</Link>
				<p className="text-muted-foreground text-sm">Liste des étudiants</p>
			</div>
			<section className="flex flex-col gap-3">
				<EtudiantsFromDB etudiant={etudiant} />
			</section>
		</main>
	);
}
