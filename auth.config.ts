import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    scope: "read:user user:email repo"
                }
            },
        })
    ],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, account }: any) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = account.providerAccountId;
            }
            return token;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, token }: any) {
            session.accessToken = token.accessToken as string;
            if (session.user) {
                session.user.id = token.sub || (token.id as string);
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
} satisfies NextAuthConfig
