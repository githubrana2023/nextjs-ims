import { db } from "@/drizzle/db"
import { familyMemberDbTable } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"

// !get family member
export const getFamilyMemberById = async (id: string) => {
    return await db.query.familyMemberDbTable.findFirst({
        where: eq(familyMemberDbTable.id, id),
    })
}
export const getFamilyMemberByPhone = async (phone: string) => {
    return await db.query.familyMemberDbTable.findFirst({
        where: eq(familyMemberDbTable.phone, phone),
    })
}

export const getFamilyMemberByFields = async (phone: string, managementSystemId: string, familyExpenseSystemId: string) => {
    return await db.query.familyMemberDbTable.findFirst({
        where: and(
            eq(familyMemberDbTable.phone, phone),
            eq(familyMemberDbTable.managementSystemId, managementSystemId),
            eq(familyMemberDbTable.familyExpenseSystemId, familyExpenseSystemId),
        )
    })
}


// !get family members
export const getFamilyMembersByManagementSystemIdAndFamilyExpenseSystemId = async (managementSystemId: string, familyExpenseSystemId: string) => {

    return await db.query.familyMemberDbTable.findMany({
        where: and(
            eq(familyMemberDbTable.managementSystemId, managementSystemId),
            eq(familyMemberDbTable.familyExpenseSystemId, familyExpenseSystemId)
        )
    })
}