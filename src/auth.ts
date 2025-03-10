import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import authConfig from "./auth.config"
import { db } from "@/drizzle/db"
import { getUserById } from "./features/user/db"

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
    pages: {
        signIn: '/auth/sign-in'
    },
    callbacks: {
        async signIn(params) {
            return true
        },
        async jwt({ token}) {
            if (!token || !token.sub) return token;

            const existUser = await getUserById(token.sub)
            if (!existUser) return token;

            token.id = token.sub
            token.email = existUser.email
            token.role = existUser.role

            return token
        },
        async session({ token, session }) {

            if (session.user) {
                session.user.email = token.email
                session.user.role = token.role
                session.user.id = token.id
            }

            return session
        },
    }
})