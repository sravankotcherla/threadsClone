import ProfileHeader from "@/components/shared/profileHeader";
import ThreadsTab from "@/components/shared/threadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants/index";
import { fetchUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() { 
    const user: User | null = await currentUser();
    if (!user) return null;
    const userInfo: any = await fetchUser(user.id);

    if (!userInfo) {
      redirect("/sign-up");
    } else if (!userInfo.onboarded) {
      redirect("/onboarding");
    }
    return <section>
        <h1 className="head-text mb-10">Search</h1>
    </section>
}