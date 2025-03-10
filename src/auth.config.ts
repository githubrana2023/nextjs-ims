import type { NextAuthConfig } from "next-auth"
import { eq } from "drizzle-orm"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"


import { signInFormSchema, } from "./features/auth/schema"
import { db } from "./drizzle/db"
import { usersTable } from "@/drizzle/schema"

export default {
    providers: [
        Credentials({
            async authorize(credentials, request) {
                try {
                    const validation = signInFormSchema.safeParse(credentials)
                    if (!validation.success) return null
                    const { email, password } = validation.data
                    const existUser = await db.query.usersTable.findFirst({
                        where: eq(usersTable.email, email)
                    })

                    if (!existUser) return null

                    const isPwMatch = await bcrypt.compare(password, existUser.password)

                    if (!isPwMatch) return null

                    //TODO: isTwoFact Enabled & isEmail Verified

                    return existUser
                } catch (error) {
                    return null
                }
            },
            
        })]
} satisfies NextAuthConfig