import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: "cb642951cbe097a4c1ce",
      clientSecret: "e03bc69e8e87eddf6b0512fdf92b495df3c34182",
    }),
  ],
});
