import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "sonner";

const inter = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "E-School",
    description: "Gestion des notes des étudiants",
    icons: {
        icon: [{
            url:  '/students.png',
            href: '/students.png'
        }]
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body className={inter.className}>
                    <Toaster />
                    {children}
                </body>
            </ClerkProvider>
        </html>
    );
}
