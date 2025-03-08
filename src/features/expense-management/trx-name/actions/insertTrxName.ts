'use server'
import { transactionNameFormSchema, TransactionNameFormValue } from "../schemas/transaction-name";
import { currentUser } from "@/services/auth";
import { getManagementSystemByUserId } from "@/features/expense-management/management-system/db/getManagementSystem";
import { getTrxNameByManagementIdTrxName } from "../db/getTrxName";
import { db } from "@/drizzle/db";
import { transactionNameDbTable } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";

export const insertTrxName = async (formValue: TransactionNameFormValue) => {

    const { success, data } = transactionNameFormSchema.safeParse(formValue)
    if (!success) return {}
    const { name, variantId: variant } = data


    const user = await currentUser()
    if (!user.userId) return {}

    const existManagementSystem = await getManagementSystemByUserId(user.userId)
    if (!existManagementSystem) return {}

    const existTrxName = await getTrxNameByManagementIdTrxName(existManagementSystem.id, name)
    if (existTrxName) return {}

    const [newTrxName] = await db.insert(transactionNameDbTable).values({
        name,
        variant,
        managementSystemId: existManagementSystem.id
    }).returning()

    if (!newTrxName) return {}

    revalidatePath(`/${existManagementSystem.id}/my-expense/trx-name`)
    return {}


}