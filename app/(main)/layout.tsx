import Navbar from '@/components/main/navbar'
import React from 'react'

export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}
