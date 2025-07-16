import NextAuth from "next-auth";
import Creadentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    //tambahin import google credential ataupun lainnya di sini
    Creadentials({
      async authorize(user) {
        if (user) return user;
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn() {
      //dan tambahkan di signIn
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: any) {
      if (token.user) session.user = token.user;
      return session;
    },
  },
});
