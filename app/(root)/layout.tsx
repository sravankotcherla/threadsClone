import BottomBar from "@/components/shared/bottomBar";
import LeftSideBar from "@/components/shared/leftSideBar";
import RightSideBar from "@/components/shared/rightSideBar";
import TopBar from "@/components/shared/topBar";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";
import "../globals.css"

export const metadata: Metadata = {
  title: 'Threads',
  description: 'A Nextjs 13 Threads Clone Application',
}

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} `}>
          <TopBar />
          <main className="flex flex-row">
            <LeftSideBar />
            <section className={"main-container"}>
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSideBar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
