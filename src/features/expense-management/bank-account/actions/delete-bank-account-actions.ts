
'use server'
import { Id } from "@/data/types";
import { getManagementSystemByUserId } from "@/features/expense-management/management-system/db/getManagementSystem";
import { getUserById } from "@/features/expense-management/users/db/user";
import { currentUser } from "@/services/auth";
import { redirect } from "next/navigation";
import { getBankAccountByIdAndManagementSystemId } from "../db/getBankAccount";
import { revalidatePath } from "next/cache";
import { deleteBankAccount } from "../db/deleteBankAccount";

export const deleteBankAccountAction = async (bankAccountId: Id, managementSystemId: Id) => {
    const user = await currentUser()

    if (!user.userId) return {}
    const existUser = await getUserById(user.userId)
    if (!existUser) return {}

    const existManagementSystem = await getManagementSystemByUserId(existUser.id)
    if (!existManagementSystem) return {}

    if (existManagementSystem.id !== managementSystemId) return redirect('/')

    if (!bankAccountId) return redirect(`/${existManagementSystem.id}/my-expense/bank`)

    const existBankAccount = await getBankAccountByIdAndManagementSystemId((bankAccountId as string), existManagementSystem.id)

    if (!existBankAccount) return redirect(`/${existManagementSystem.id}/my-expense/bank`)



    const deletedBankAccount = await deleteBankAccount({ existManagementSystem, existBankAccount })

    if (!deletedBankAccount) return {}


    revalidatePath(`/${existManagementSystem.id}/my-expense/bank`)
    return {}
}