import PostThread from "@/components/forms/postThread";
import { fetchUser } from "@/lib/actions/user";
import UserInterface from "@/lib/interfaces";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";




async function Page() {
    const user :User|null = await currentUser();
    if (!user)
        return null;
    const userInfo : any = await fetchUser(user.id);
    if (!userInfo) {
        redirect('/sign-up')
    } else if (!userInfo.onboarded) {
        redirect('/onboarding')
    }
    return <>
        <PostThread userId={userInfo._id || ""} />
    </>
}

export default Page;