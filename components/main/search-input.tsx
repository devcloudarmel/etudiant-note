'use client';

import { Search } from 'lucide-react'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import qs from "query-string";
import { Input } from '../ui/input';
import { useDebounce } from '@/hooks/use-debounce';

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const nom = searchParams.get('nom');

    const [value, setValue] = useState(nom || "");
    const debouncedValue = useDebounce<string>(value, 500);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
    const query = { 
        nom: debouncedValue, 
    };

    const url = qs.stringifyUrl({
        url: window.location.href,
        query
    }, { skipNull: true, skipEmptyString: true });
        router.push(url);
    }, [debouncedValue, router])

    return (
        <div className='w-full relative'>
            <Search 
                className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4'
            />
            <Input 
                onChange={onChange}
                value={value}
                className='w-full max-w-[516px] pl-9'
                placeholder='Etudiant à rechercher...'
            />
        </div>
    )
}