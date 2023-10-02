'use client'
import Image from "next/image"
import Link from "next/link"
import { sidebarLinks } from "../../constants/index";
import {usePathname, useRouter} from "next/navigation"
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

export default function TopBar() {
    const pathname = usePathname();
    const router = useRouter()
    const user:any = useAuth();
    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map(link => {
                    const isActive= pathname===link.route ? true: false
                    if (link.route === "/profile") {
                        link.route = `/profile/${user.userId}`;
                    }
                    return (
                        <Link href={link.route} key={link.label} className={`${"leftsidebar_link"} ${isActive  && "bg-primary-500"}`}>
                            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                            <p className="text-light-1 max-lg:hidden">{link.label}</p>
                        </Link>
                    )
                })}
            </div>
            <div className="mt-10 px-6">
            <SignedIn>
                        <SignOutButton signOutCallback={()=>router.push("./sign-in")}>
                            <div className="flex cursor-pointer gap-4 p-4">
                                <Image src="/assets/logout.svg" alt="logo" width={24} height={24}></Image>
                                <p className="text-light-2 max-lg:hidden">Logout</p>
                            </div>
                        </SignOutButton>
                    </SignedIn>
            </div>
        </section>
    )
}