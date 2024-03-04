import React from 'react'

export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <div className='h-full flex items-center justify-center bg-blue-50'>
            {children}
        </div>
    )
}
