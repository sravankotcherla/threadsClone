"use server";
import { fetchUserThreads } from "@/lib/actions/thread.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/threadCard";

interface ThreadsTabPropsInterace {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
async function ThreadsTab(props: ThreadsTabPropsInterace) {
  const { currentUserId, accountId, accountType } = props;
  const userThreads = await fetchUserThreads(accountId);
  if (!userThreads) {
    redirect("/");
  }
  return (
    <section className="mt-9 flex flex-col gap-10">
      {userThreads.threads.map((thread: any) => {
        return (
          <ThreadCard
            key={thread._id}
            currentUserId={currentUserId}
            id={thread._id}
            content={thread.text}
                author={accountType === "user" ? {
                    name: userThreads.name,
                    profile_photo: userThreads.profile_photo,
                    userId : userThreads.userId
            } : thread.author}
            community={thread.communityId}
            parentId={thread.parentId}
            comments={thread.children}
            createdAt={thread.created}
          />
        );
      })}
    </section>
  );
}

export default ThreadsTab;
