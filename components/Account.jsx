"use client";

import { useQueryParams } from "@/lib/useQueryParams";
import { CreditCard, Info, Loader2, LogOut, User, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useState } from "react";
import { AnimatedCircularProgressBar } from "./ui/animated-circular-progress-bar";
import { FaCircleCheck } from "react-icons/fa6";
import Input from "./ui/Input";
import { Button } from "./ui/button";
import { updateUser } from "@/controllers/basics/user";
import { useRouter } from "next/navigation";

function Account({ session }) {
  const { deleteQuery, hasQuery } = useQueryParams();
  const [tab, setTab] = useState("account");
  const [loader, setloader] = useState();
  const router = useRouter();
  const isOpen = hasQuery("account");

  const handleClose = () => {
    if (session?.progress < 100) {
      enqueueSnackbar({
        message: "Complete your profile first",
        action: <Info strokeWidth={2} className="mr-2" size={20} />,
      });
      return;
    }
    deleteQuery("account");
  };

  const handelUpdate = async (e) => {
    e.preventDefault();

    if (loader) {
      return;
    }

    const form = e.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email?.value?.trim(); // disabled but still available

    // Validation errors array
    const errors = [];

    if (!name) errors.push("Name is required.");
    else if (name.length < 3)
      errors.push("Name must be at least 3 characters.");

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phone) errors.push("Phone number is required.");
    else if (!phoneRegex.test(phone))
      errors.push("Phone number must be 10–15 digits.");

    if (errors.length > 0) {
      errors.forEach((msg) =>
        enqueueSnackbar({
          variant: "error",
          message: msg,
          action: <Info size={20} strokeWidth={1.5} />,
        })
      );
      return;
    }
    setloader(true);
    const res = await updateUser(name, phone);
    setloader(false);
    if (!res?.success) {
      enqueueSnackbar({
        variant: "error",
        message: res?.msg,
        action: <Info size={20} strokeWidth={1.5} />,
      });
      return;
    }
    router.refresh();
    enqueueSnackbar({
      variant: "success",
      message: res?.msg,
      action: <Info size={20} strokeWidth={1.5} />,
    });
  };

  const comp = (
    <section className="flex justify-center w-full items-center backdrop-blur-[8px] bg-black/20 h-screen fixed top-0 px-5 z-[99]">
      <div className="bg-white max-w-[700px] flex flex-col gap-7 p-7 w-full rounded-md">
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3 w-fit">
            <AnimatedCircularProgressBar
              max={100}
              min={0}
              value={session?.progress}
              gaugePrimaryColor="black"
              gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
            >
              <Image
                unoptimized
                src={`/api/og/avatar?q=${session?.email ?? "U"}`}
                width={29}
                height={29}
                alt="Avatar"
                className="rounded-full absolute  bg-black/10"
              />
              {session?.progress === 100 && (
                <FaCircleCheck
                  size={15}
                  className=" absolute text-sky-500 bg-white rounded-full translate-y-3 translate-x-3 z-20"
                />
              )}
            </AnimatedCircularProgressBar>
            <h2 className="text-xl font-semibold">Account</h2>
          </div>

          <button onClick={handleClose} className="cursor-pointer">
            <X size={25} />
          </button>
        </div>

        {/* Tabs */}
        <div>
          <ul className="gap-5 w-full flex flex-wrap">
            <button
              onClick={() => setTab("account")}
              className={`flex items-center text-sm gap-2 border rounded-md cursor-pointer py-2 px-5  grow ${
                tab === "account"
                  ? "text-black border-black/30 ring ring-offset-2"
                  : "text-black/50 hover:bg-black/5"
              }`}
            >
              <User size={20} /> Account
            </button>

            <button
              onClick={() => setTab("subscription")}
              className={`flex items-center text-sm gap-2 border rounded-md cursor-pointer py-2 px-5 grow ${
                tab === "subscription"
                  ? "text-black border-black/30 ring ring-offset-2"
                  : "text-black/50 hover:bg-black/5"
              }`}
            >
              <CreditCard size={20} /> Subscription
            </button>

            <button
              onClick={() => {
                enqueueSnackbar({
                  message: "Are you sure?",
                  action: (
                    <>
                      <button
                        onClick={() => {
                          signOut();
                        }}
                        className="px-5 border-r border-white/20 text-sky-600 cursor-pointer"
                      >
                        Logout
                      </button>
                      <button
                        onClick={() => {
                          closeSnackbar();
                        }}
                        className="px-5  text-red-600 cursor-pointer"
                      >
                        No
                      </button>
                    </>
                  ),
                });
              }}
              className="flex items-center text-sm gap-2 border rounded-md cursor-pointer py-2 px-5 text-black/50 hover:bg-black/5 grow"
            >
              <LogOut strokeWidth={1.5} size={20} /> Logout
            </button>
          </ul>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {tab === "account" && (
            <div>
              <fieldset className="rounded-md pt-4">
                <legend className="px-2 text-gray-700 font-medium">
                  Personal Details
                </legend>

                <form
                  onSubmit={handelUpdate}
                  className="grid grid-cols-2 w-full justify-between px-2 gap-5"
                >
                  <Input
                    defaultValue={session?.name}
                    placeholder="Name"
                    className="w-full"
                    name="name"
                    required
                    size="sm"
                  />
                  <Input
                    placeholder="Phone"
                    required
                    className="w-full"
                    defaultValue={session?.phoneNumber}
                    name="phone"
                    type="tel"
                    size="sm"
                  />
                  <Input
                    disabled
                    defaultValue={session?.email}
                    placeholder="Email"
                    className="w-full"
                    parentClassName="col-span-2"
                    size="sm"
                    required
                  />
                  <div className="w-full col-span-2 flex ">
                    <Button disabled={loader}>Save</Button>
                  </div>
                </form>
              </fieldset>
            </div>
          )}

          {tab === "subscription" && (
            <div className="text-black/70">
              <p>Your subscription details go here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  // Always show modal if user hasn't finished profile
  if (session?.progress < 100) return comp;

  return isOpen ? comp : null;
}

export default Account;
