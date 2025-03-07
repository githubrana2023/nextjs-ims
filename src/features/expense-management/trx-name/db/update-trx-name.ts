import { db } from "@/drizzle/db";
import { UpdateTrxNameFormValue } from "../schemas/transaction-name";
import { transactionNameDbTable } from "@/drizzle/schema";

export const updateTrxName = async (formValue: UpdateTrxNameFormValue) => {
    const [updatedTrxName] = await db.update(transactionNameDbTable).set(formValue).returning()

    return updatedTrxName
}

export const updateToSource = async () => {

}