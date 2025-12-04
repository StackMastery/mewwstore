"use client";

import Link from "next/link";
import React, { useState } from "react";
import Input from "./ui/Input";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { ChevronRight, Loader2 } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";

function GetStarted() {
  return (
    <>
      <section className="flex justify-center w-full items-center backdrop-blur-[2px] bg-black/10 h-screen  z-[9999] fixed top-0 px-5">
        <div className="bg-white max-w-[450px] flex flex-col gap-7 p-7 w-full rounded-md">
          <div className="flex items-center w-full justify-between">
            <h2 className="text-2xl font-semibold">Sign In</h2>
            <Link
              href={"/"}
              className="text-black/50 font-medium underline underline-offset-4 decoration-2"
            >
              I don’t have an account
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <Input
              inputId="hello"
              type="email"
              placeholder={`Email`}
              required={true}
            />
            <Button className={`w-full h-12 mt-2 rounded-sm`} size={"lg"}>
              Continue
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm justify-between w-full">
            <span className="w-full h-[0.1] bg-black/10" />
            <Link
              href={"/"}
              className="text-black/50 font-medium underline w-full"
            >
              Forget Password
            </Link>
            <span className="w-full h-[0.1] bg-black/10" />
          </div>
          <SocialAuth />
          <div>
            <p className="text-xs text-black/50">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of ServiceOpens a new window apply.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default GetStarted;

export const SocialAuth = () => {
  const [authLoader, setauthLoader] = useState({
    google: false,
    fb: false,
    task: false,
  });
  return (
    <div className="flex flex-col gap-3">
      <Button
        variant={"outline"}
        className={`grow py-3 flex justify-between items-center text-md rounded-sm`}
        size={"lg"}
        disabled={authLoader?.task}
        onClick={() => {
          signIn("google");
          setauthLoader({ ...authLoader, google: true, task: true });
        }}
      >
        <FcGoogle size={25} />
        {authLoader?.google ? <Loader2 className="animate-spin" /> : "Google"}
        <span>
          <ChevronRight />
        </span>
      </Button>
      <Button
        variant={"outline"}
        className={`grow py-3 flex justify-between items-center text-md rounded-sm`}
        size={"lg"}
        disabled={authLoader?.task}
        onClick={() => {
          signIn("facebook");
          setauthLoader({ ...authLoader, fb: true, task: true });
        }}
      >
        <FaFacebook color="#1877F2" size={25} />
        {authLoader?.fb ? <Loader2 className="animate-spin" /> : "Facebook"}
        <span>
          <ChevronRight />
        </span>
      </Button>
    </div>
  );
};
