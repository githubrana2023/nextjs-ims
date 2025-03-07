'use server'
import { updateBankAccountFormSchema, UpdateBankAccountFormValue } from "../schemas/bank-account-schema";
import { currentUser } from "@/services/clerk";
import { getUserById } from "@/features/expense-management/users/db/user";
import { getManagementSystemByUserId } from "@/features/expense-management/management-system/db/getManagementSystem";
import { getBankAccountByIdAndManagementSystemId, } from "../db/getBankAccount";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateBankAccount } from "../db/updateBankAccount";
import { Id } from "@/data/types";


export const updateBankAccountAction = async (formValue: UpdateBankAccountFormValue, bankId: Id, managementSystemId: Id) => {

    const user = await currentUser()

    if (!user.userId) return {}
    const existUser = await getUserById(user.userId)
    if (!existUser) return {}

    const existManagementSystem = await getManagementSystemByUserId(existUser.id)
    if (!existManagementSystem) return {}

    if (existManagementSystem.id !== managementSystemId) return redirect('/')

    const { success, data } = updateBankAccountFormSchema.safeParse(formValue)

    if (!success) return {}

    if (!bankId) return redirect(`/${existManagementSystem.id}/my-expense/bank`)

    const existBankAccount = await getBankAccountByIdAndManagementSystemId((bankId as string), existManagementSystem.id)

    if (!existBankAccount) return redirect(`/${existManagementSystem.id}/my-expense/bank`)



    const updatedBankAccount = await updateBankAccount(data, existManagementSystem, existBankAccount)

    if (!updatedBankAccount) return {}


    revalidatePath(`/${existManagementSystem.id}/my-expense/bank`)

    return {}
}