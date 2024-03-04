import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { UserButton } from '@clerk/nextjs'
import { PlusCircleIcon, PlusIcon, User, UserPlus2 } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
    return (
        <header className='px-10 shadow-sm'>
            <nav className='m-auto flex flex-row items-center justify-between py-2'>
                <Link href='/' className='flex items-center'>
                    <Image 
                        src='/students.png'
                        alt='logo'
                        width={50}
                        height={50}
                    />
                </Link>
                <div className='flex items-center gap-3'>
                    <Button variant='outline' asChild> 
                        <Link href='/etudiant/new'>
                            Ajouter
                            <UserPlus2 className='h-4 w-4 ml-1' />
                        </Link>
                    </Button>
                    <UserButton afterSignOutUrl='/' />
                </div>
            </nav>
        </header>
    )
}
