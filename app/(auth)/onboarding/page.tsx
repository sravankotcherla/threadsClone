import AccountProfile from "@/components/forms/accountProfile";
import { fetchUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  const user = await currentUser();
  const userInfo = await fetchUser(user?.id || "");
    const userData = {
        id: user?.id,
        objectId: userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName,
        bio: userInfo?.bio,
        image: userInfo?.profile_photo || user?.imageUrl
    }
    debugger;
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 style={{ color: "white", fontSize: "24px" }}>On Boarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
              <AccountProfile user={userData} btnTitle="Continue"/>
      </section>
    </main>
  );
}

export default Page;
