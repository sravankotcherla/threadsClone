import ProfileHeader from "@/components/shared/profileHeader";
import ThreadsTab from "@/components/shared/threadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants/index";
import { fetchUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const user: User | null = await currentUser();
  if (!user) return null;
  const userInfo: any = await fetchUser(params.id);
  debugger;
  if (!userInfo) {
    redirect("/sign-up");
  } else if (!userInfo.onboarded) {
    redirect("/onboarding");
  }
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.profile_photo}
        bio={userInfo.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => {
              return (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    height={24}
                    width={24}
                    className="object-contain"
                  />
                  <p className="max-sm:hidden">{tab.label}</p>
                  {tab.label === "Threads" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                      {userInfo.threads.length}
                    </p>
                  )}
                </TabsTrigger>
              );
            })}
                  </TabsList>
                  {profileTabs.map(tab => {
                      return (
                          <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1">
                              <ThreadsTab
                                currentUserId={user.id}
                                accountId={userInfo.userId}
                                accountType="user"
                              />
                          </TabsContent>
                      )
                  })}
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
