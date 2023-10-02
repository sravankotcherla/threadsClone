'use client'
import { sidebarLinks } from "@/constants/index"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image"
import { useAuth } from "@clerk/nextjs";

export default function TopBar() {
    const pathname = usePathname();
    const router = useRouter()
    const user: any = useAuth();
    return (
        <section className="bottombar">
            <div className="bottombar_container">
            {sidebarLinks.map(link => {
                const isActive = pathname === link.route ? true : false
                if (link.route === "/profile") {
                    link.route = `/profile/${user.userId}`;
                }
                    return (
                        <Link href={link.route} key={link.label.split(" ")[0]} className={`${"bottombar_link"} ${isActive  && "bg-primary-500"}`}>
                            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                            <p className="text-subtle-medium text-light-1 max-sm:hidden">{link.label}</p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}