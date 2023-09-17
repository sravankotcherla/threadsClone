"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validations/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import * as z from "zod";
import { ChangeEvent, useState } from "react";
import { updateUser } from "@/lib/actions/user";
import { useRouter } from "next/navigation";

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
const AccountProfile = (props: Props) => {
    const { user, btnTitle } = props;
    const [files, setFiles] = useState<File[]>([]);
    const router = useRouter();
  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      name: user?.name || "",
      profile_photo: user?.image || "",
      username: user?.username || "", 
      bio: user?.bio || "",
    },
  });

    const handleImage = (event: ChangeEvent<HTMLInputElement>, onChange: (value: string)=>void) => {
      event.preventDefault();
      const fileReader = new FileReader();
      if (event.target.files && event.target.files.length>0) {
          const file = event.target.files[0];
          setFiles(Array.from(event.target.files))
          let imageDataUrl = "";
          if (!file.type.includes("image")) return;
          fileReader.readAsDataURL(file);
          fileReader.onload = async (e) => {
              imageDataUrl = e.target?.result?.toString() || "";
            onChange(imageDataUrl);
          }
      }

  };

  const onSubmit = async (values: z.infer<typeof userValidation>) => {
      try {
          const onboardedUser = await updateUser({...values, userId: user.id});
          console.log(onboardedUser);
          router.push("/");
      } catch (err) {
          console.log("Failed to update/create user", err);
      }
      

  };
    debugger;
    
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    width={96}
                    height={96}
                    alt="profile_pic"
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    width={96}
                    height={96}
                    alt="profile_pic"
                    priority
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  placeholder="Upload a photo"
                  className="account-form_image-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl className="text-base-semibold text-light-2">
                <Input
                  className="account-form_input no-foces"
                          type="text"
                      
                          {...field}
                          value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl className="text-base-semibold text-light-2">
                <Input
                  className="account-form_input no-foces"
                  type="text"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl className="text-base-semibold text-light-2">
                <Textarea
                  rows={10}
                  className="account-form_input no-foces"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">Submit</Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
