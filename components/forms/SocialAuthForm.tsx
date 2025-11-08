"use client";

import ROUTES from "@/constants/route";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";

const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      const res = await signIn(provider, {
        redirectTo: ROUTES.HOME,
        redirect: true,
      });

      // signIn with redirect: true will automatically redirect.
      // If you want to handle error messages for popup blocking or others,
      // you can check res?.error and display custom toast here
      // (requires toast lib, which isn't imported currently)
      // Example:
      // if (res?.error) {
      //   // Show some toast here if needed
      // }
    } catch (error) {
      // Optionally, handle error if signIn throws (rare for redirect flow)
      console.error(error);
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with GitHub</span>
      </Button>

      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image src="/icons/google.svg" alt="Google Logo" width={20} height={20} className="mr-2.5 object-contain" />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
