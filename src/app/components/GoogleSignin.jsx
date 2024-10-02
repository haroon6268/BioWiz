"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";

export default function SignIn() {
  const { data } = useSession();
  return (
    <form
      action={async () => {
        {
          data
            ? await signOut({ redirectTo: "/" })
            : await signIn("google", { redirectTo: "/" });
        }
      }}
    >
      <Button type="submit">{data ? "Sign Out" : "Sign In"}</Button>
    </form>
  );
}
