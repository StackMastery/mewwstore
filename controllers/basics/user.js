"use server";

import dbConnect from "@/lib/mongoose";
import User from "@/models/user";
import { getServerSession } from "next-auth";

export const userIn = async () => {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return null;
  }
  await dbConnect();
  const res = await User?.findOne({ email: session?.user?.email })
    .select("-_id -password -__v")
    .lean();
  return res;
};

export async function updateUser(name, phone) {
  try {
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return {
        success: false,
        msg: "Invalid name. Minimum 2 characters required.",
      };
    }

    const phoneRegex = /^[0-9]{6,15}$/;
    if (!phone || !phoneRegex.test(phone)) {
      return {
        success: false,
        msg: "Invalid phone number format.",
      };
    }

    const user = await userIn();
    if (!user || !user.email) {
      return {
        success: false,
        msg: "User not authenticated.",
      };
    }

    await dbConnect();

    const result = await User.updateOne(
      { email: user.email },
      {
        $set: {
          name: name.trim(),
          phoneNumber: phone,
          progress: 100,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return {
        success: false,
        msg: "No changes were made.",
      };
    }

    return {
      success: true,
      msg: "User updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      msg: "Server error during update.",
    };
  }
}
