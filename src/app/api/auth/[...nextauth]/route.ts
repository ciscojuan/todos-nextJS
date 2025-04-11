import prisma from "@/lib/pisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers

  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { accounts: true },
        });

        if (existingUser) {
          // Si el usuario existe pero no tiene una cuenta de GitHub vinculada
          const hasGithubAccount = existingUser.accounts.some(
            (acc) => acc.provider === "github"
          );

          if (!hasGithubAccount) {
            // Vincular la cuenta de GitHub al usuario existente
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            });
          }
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  async signIn({ user, account, profile, email, credentials }) {
    return true;
  },
  async jwt({ token, user, account, profile }) {
    const dbUser = await prisma.user.findUnique({
      where: {
        email: token.email ?? "no email",
      },
    });

    token.roles = dbUser?.roles ?? ["no-roles"];
    token.id = dbUser?.id ?? ["no-uuid"];

    return token;
  },

  async session({ session, token, user }) {
    if (session && session.user) {
      session.user.roles = token.roles;
      session.user.id = token.id;
    }
    return session;
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
