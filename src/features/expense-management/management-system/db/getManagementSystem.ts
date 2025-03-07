'use server'

import { db } from "@/drizzle/db"
import { managementSystemDbTable, } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"

export const getManagementSystemByUserId = async (userId: string) => {
    return await db.query.managementSystemDbTable.findFirst({
        where: eq(managementSystemDbTable.userId, userId)
    })
}

export const getManagementSystemByIdAndUserId = async (managementSystemId: string, userId: string) => {
    return await db.query.managementSystemDbTable.findFirst({
        where: and(
            eq(managementSystemDbTable.userId, userId),
            eq(managementSystemDbTable.id, managementSystemId),
        )
    })
}

export const getManagementSystemById = async (id: string) => {
    return await db.query.managementSystemDbTable.findFirst({
        where: eq(managementSystemDbTable.id, id)
    })
}