import type { NextAuthConfig } from "next-auth"
import { eq } from "drizzle-orm"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"


import { signInFormSchema,} from "./features/auth/schema"
import { db } from "./drizzle/db"

export default { providers: [Credentials({
    async authorize(credentials, request) {
        try {
            const validation = signInFormSchema.safeParse(credentials)
            if(!validation.success) return null
            const {email,password} = validation.data
            const existUser = await db.query.userDbTable.findFirst({
                where:eq(userDbTable.email,email)
            })

            if(!existUser) return null

            const pwMatch = await bcrypt.compare(password,existUser.password)

            return existUser
        } catch (error) {
            return null
        }
    },
})] } satisfies NextAuthConfig