import ThreadCard from "@/components/cards/threadCard";
import Comment from "@/components/forms/comment";
import { fetchThread } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

 const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id);
  if (!userInfo?.onboarded) {
    redirect("/sign-in");
  }
  const thread = await fetchThread(params.id);
  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          currentUserId={userInfo?._id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.communityId}
          createdAt={thread.created}
          comments={thread.children}
        />
          </div>
          <div className="mt-7">
              <Comment
                  threadId={thread.id}
                  currentUserImage={userInfo.profile_photo}
                  currentUserId={JSON.stringify(userInfo._id)}
              />
          </div>
          <div className="mt-10">
              {thread.children.map((child :any) => {
                  return (
                      <ThreadCard
                      id={child._id}
                      currentUserId={userInfo?._id}
                      parentId={child.parentId}
                      content={child.text}
                      author={child.author}
                      community={child.communityId}
                      createdAt={child.created}
                      comments={child.children}
                      isComment={true}
                      />
                )
            })}
          </div>
    </section>
  );
 };

export default Page;
