"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { threadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import * as z from "zod";
import { userInfo } from "os";
import { redirect } from "next/navigation";
import Router from "next/router";

interface Props {
  user: {
    id: string;
    objectId: string;
    name: string;
    username: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

function PostThread(props: { userId: string }) {
  const { userId } = props;
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

    const onSubmit = async(values : z.infer<typeof threadValidation>) => {
        try {
            const createdThread = await createThread({text: values.thread, author: userId});
          router.push("/");
        } catch (err) {
            console.log(err);
      }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                      <Textarea
                  rows={15}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
