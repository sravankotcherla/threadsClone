"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentValidation } from "@/lib/validations/thread";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface CommentFormPropsInterface {
  threadId: string;
  currentUserId: string;
  currentUserImage: string;
}

function Comment(props: CommentFormPropsInterface) {
  const { threadId, currentUserId, currentUserImage } = props;

  const pathname = usePathname();
  const form = useForm({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentValidation>) => {
    try {
      const newComment = await addCommentToThread(
        threadId,
        values.thread,
        JSON.parse(currentUserId),
        pathname
      );
        form.reset();
    } catch (err) {
      console.log("Failed to update/create user", err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImage}
                  alt="profile"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
