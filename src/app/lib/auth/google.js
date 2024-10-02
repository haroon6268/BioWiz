"use server";
import { signIn } from "@/auth";
import { signOut } from "@/auth";

export const SignIn = async () => {
  signIn("google");
};

export const SignOut = async () => {
  signOut();
};
