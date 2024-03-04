'use client';

import * as z from 'zod';
import { LayoutPanelLeft, Pencil, Trash2, UserPlus, Wand2 } from 'lucide-react'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Etudiant } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import { toast } from 'sonner';
import { Input } from '../ui/input';

const formSchema = z.object({
    nom: z.string().min(1, {
        message: 'Nom est requis'
    }),
    numEt: z.string().min(1, {
        message: 'Requis'
    }),
    note_math: z.string().transform(value => /^\d+(\.\d+)?$/.test(value) ? Number(value) : value),
    note_phys: z.string().transform(value => /^\d+(\.\d+)?$/.test(value) ? Number(value) : value)
});


interface Props {
    initialData: Etudiant | null
}

export default function EtudiantForm({
    initialData
} : Props) {
    const router = useRouter();

    const defaultValues = initialData ? {
        numEt: initialData.numEt || '',
        nom: initialData.nom || '',
        note_math: initialData.note_math !== null && initialData.note_math !== undefined ? initialData.note_math.toString() : '',
        note_phys: initialData.note_phys !== null && initialData.note_phys !== undefined ? initialData.note_phys.toString() : '',
    } : {
        numEt: '',
        nom: '',
        note_math: '',
        note_phys: '',
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });
    

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                await axios.patch(`/api/etudiant/${initialData.id}`, values);
            } else {
                await axios.post("/api/etudiant", values);
            }
        
            toast.success('Operation avec succès');
        
            router.refresh();
            router.push("/");
        } catch (error) {
            toast.error('Erreur: Veiller ressayer plus tard')
        }
    };

    const onDelete = async () => {
        try {
            await axios.delete(`/api/etudiant/${initialData?.id}`);
            toast.success('Succes')
            router.refresh();
          router.push("/");
        } catch (error) {
          toast.error('Error')
        }
    }

    return (
        <div className='m-auto px-10 my-5 space-y-5'>
            <div className="flex flex-col gap-4">
                {initialData ? (
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-4xl font-semibold flex items-center'>
                                <LayoutPanelLeft className='h-8 w-8 mr-1' />
                                E-School
                            </h1>
                            <p className="text-muted-foreground text-sm">Modification de l&apos;étudiant</p>
                        </div>
                        <Button variant='destructive' onClick={onDelete} size='icon'>
                            <Trash2 className='h-4 w-4' />
                        </Button>
                    </div>
                ) : (
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-4xl font-semibold flex items-center'>
                                <LayoutPanelLeft className='h-8 w-8 mr-1' />
                                E-School
                            </h1>
                            <p className="text-muted-foreground text-sm">Ajout de l&apos;étudiant</p>
                        </div>
                    </div>
                )}
                <div className="space-y-6 border rounded-lg p-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=''>
                            <FormField
                                name="numEt"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Numéro de l&apos;étudiant</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="nom"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Nom de l&apos;étudiant</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="note_math"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Mathématique </FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="..." {...field} type='' />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="note_phys"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Physique </FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="..." {...field} type='number' />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='mt-4'>
                                <Button type='submit' disabled={isLoading} size='sm' className='bg-blue-600 hover:bg-blue-600'>
                                    { initialData ? 'Valider' : 'Ajouter' }
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}