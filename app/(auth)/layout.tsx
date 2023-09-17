import { ClerkProvider } from "@clerk/nextjs"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import '../globals.css'

export const metadata: Metadata = {
  title: 'Threads',
  description: 'A Nextjs 13 Threads Clone Application',
}

const inter = Inter({subsets:["latin"]})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}  bg-dark-1`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
