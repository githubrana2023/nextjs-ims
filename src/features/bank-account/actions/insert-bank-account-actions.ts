'use server'
import { bankAccountFormSchema, BankAccountFormValue } from "../schemas/bank-account-schema";
import { currentUser } from "@/services/clerk";
import { getUserById } from "@/features/users/db/user";
import { getManagementSystemByUserId } from "@/features/management-system/db/getManagementSystem";
import { getBankAccountByManagementSystemIdAndName } from "../db/getBankAccount";
import { db } from "@/drizzle/db";
import { bankAccountDbTable } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";

export const insertBankAccount = async (formValue: BankAccountFormValue) => {
    const { success, data } = bankAccountFormSchema.safeParse(formValue)

    if (!success) return {}
    const { balance, name, } = data


    const user = await currentUser()
    if (!user.userId) return {}
    const existUser = await getUserById(user.userId)
    if (!existUser) return {}

    const existManagementSystem = await getManagementSystemByUserId(existUser.id)
    if (!existManagementSystem) return {}

    const existBankAccount = await getBankAccountByManagementSystemIdAndName(existManagementSystem.id, name)

    if (existBankAccount) return {}

    if (balance < 0) return {}

    const [newBankAccount] = await db.insert(bankAccountDbTable).values({
        ...formValue,
        balance: balance.toString(),
        managementSystemId: existManagementSystem.id
    }).returning()

    if (!newBankAccount) return {}


    revalidatePath(`/${existManagementSystem.id}/my-expense/bank`)

    return {}
}