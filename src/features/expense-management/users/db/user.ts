'use server'

import { db } from "@/drizzle/db"
import { userDbTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const insertUser = async (userFormData: typeof userDbTable.$inferInsert) => {
    try {
        const [newUser] = await db
            .insert(userDbTable)
            .values(userFormData)
            .returning()
            .onConflictDoUpdate(
                {
                    target: [userDbTable.clerkUserId],
                    set: userFormData
                }
            )

        if (!newUser) throw new Error('Failed to Create User!')

        return newUser

    } catch (error) {
        console.log(error, 'Failed to Create User')
    }
}

export const updateUser = async (clerkUserId: string, userFormData: Partial<typeof userDbTable.$inferInsert>) => {
    try {
        const [updatedUser] = await db
            .update(userDbTable)
            .set(userFormData)
            .where(eq(userDbTable.clerkUserId, clerkUserId))
            .returning()

        if (!updatedUser) throw new Error('Failed to Create User!')

    } catch (error) {
        console.log(error, 'Failed to Create User')
    }
}

// export const deleteUser = async (clerkUserId: string) => {
//     try {
//         const [updatedUser] = await db
//             .update(userDbTable)
//             .set(userFormData)
//             .where(eq(userDbTable.clerkUserId, clerkUserId))
//             .returning()

//         if (!updatedUser) throw new Error('Failed to Create User!')

//     } catch (error) {
//         console.log(error, 'Failed to Create User')
//     }
// }

export const getUserById = async (userId: string) => {
    return await db.query.userDbTable.findFirst({
        where: eq(userDbTable.id, userId)
    })
}

export const getUserByClerkId = async (clerkUserId: string) => {
    return await db.query.userDbTable.findFirst({
        where: eq(userDbTable.clerkUserId, clerkUserId)
    })
}