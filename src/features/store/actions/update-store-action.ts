'use server'
import { currentUser } from "@/services/auth";
import { storeUpdateFormSchema, StoreUpdateFormValue } from "../schema";
import { _log, sendRespose } from "@/lib/helper/send-response";
import { getStoreByIdAndUserId } from "../db";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { storesTable, usersTable } from "@/drizzle/schema";


// update
export const updateStore = async (storeId: string, formValue: StoreUpdateFormValue) => {
    try {

        const validation = storeUpdateFormSchema.safeParse(formValue)

        if(!validation.success)return sendRespose(false,null,'Invalid Fields!')

        const user = await currentUser();

        if (!user) return sendRespose(false, null, "Unauthenticated User!");

        if (user.role !== "OWNER")
            return sendRespose(false, null, "Forbidden Access!");

        const existUser = await db.query.usersTable.findFirst({ where: eq(usersTable.id, user.id) })
        if (!existUser)
            return sendRespose(false, null, "User not Register in our Database!");

        const existStoreUnderUser = await getStoreByIdAndUserId(storeId, existUser.id)

        if (!existStoreUnderUser)
            return sendRespose(false, null, "Store Not Found!");

        const [updatedStore] = await db
            .update(storesTable)
            .set({
                name: validation.data.name,
            })
            .returning();

        if (existStoreUnderUser.name === updatedStore.name)
            return sendRespose(false, null, "Could not update the store!");

        return sendRespose(true, updatedStore, "Store Updated Success!");
    } catch (e) {
        _log(e);
        return sendRespose(false, null, "Something went wrong!");
    }
};