import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { ROUTES } from "@src/constants/routes";
import type { User } from "@prisma/client";

const authPath = ROUTES.AUTH.get();

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.userType = (user as User).userType;
      }
      return session;
    },
  },
  pages: {
    signIn: authPath,
    error: authPath,
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // ...add more providers here
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_SECRET,
    })
  ],
};

export default NextAuth(authOptions);
