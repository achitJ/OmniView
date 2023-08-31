import BaseLayout from '@/components/BaseLayout'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'OmniView',
    description: 'Admin Dashboard for Data Management',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <BaseLayout>
                    {children}
                </BaseLayout>
            </body>
        </html>
    )
}
