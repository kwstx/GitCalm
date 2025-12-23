import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            console.log("DEBUG: Using Client ID:", process.env.GITHUB_ID);
            return baseUrl + "/dashboard";
        }
    },
    pages: {
        signIn: "/login",
    },
})
