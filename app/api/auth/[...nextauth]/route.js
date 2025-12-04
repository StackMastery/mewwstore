import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import User from "@/models/user";
import dbConnect from "@/lib/mongoose";
import { createSecurePassword } from "@/lib/password";
import { getIPv4 } from "@/lib/ip";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) {
        throw new Error("Need Required Values");
      }

      const ip = getIPv4();

      await dbConnect();

      const userExist = await User.findOne({ email: user.email });

      if (userExist) {
        await User.updateOne(
          { email: user.email },
          { $addToSet: { ipAddresses: ip } }
        );
        return true;
      }

      const password = await createSecurePassword();

      const userM = new User({
        name: user.name,
        avatar: user.image,
        email: user.email,
        isVerified: true,
        password: password.hashedPassword,
        ipAddresses: [ip],
      });

      await userM.save();

      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
