import ThreadCard from "@/components/cards/threadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser, UserButton } from "@clerk/nextjs";

export default async function Home() {
  const posts : any = await fetchThreads(1, 30);
  const user = await currentUser();
  return (
    <div>
      <section className="empty-9 flex flex-col gap-10">
        {posts?.threads.length === 0 ? (
          <p className="no-result">No Threads Found</p>
        ) : (
          <>
            {posts.threads.map((thread : any) => (
              <ThreadCard
                key={thread._id}
                currentUserId={user?.id || ""}
                id={thread._id}
                content={thread.text}
                author={thread.author}
                community={thread.communityId}
                parentId={thread.parentId}
                comments={thread.children}
                createdAt={thread.created}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
