import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" }, // Keep JWT for performance, but sync user to DB
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
                token.id = account.providerAccountId;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client
            session.accessToken = token.accessToken as string;
            if (session.user) {
                // When using adapter, id comes from DB user id, but token.sub is also valid
                session.user.id = token.sub || (token.id as string);
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl + "/dashboard";
        }
    },
    pages: {
        signIn: "/login",
    },
})
