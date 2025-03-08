'use server'
import { _log, sendRespose } from "@/lib/helper/send-response";
import { currentUser } from "@/services/auth";
import { storeFormSchema, StoreFormValue } from "../schema";
import { getStoreByStoreCode, getStoreByUserId } from "@/features/store/db";
import { db } from "@/drizzle/db";
import { storesTable, usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

//create
export const createStore = async (formValue: StoreFormValue) => {
    try {
        const validation = storeFormSchema.safeParse(formValue)
        if (!validation.success) return sendRespose(false, null, 'Invalid Fields!')
        const { name, storeCode } = validation.data

        const user = await currentUser();

        if (!user?.id) return sendRespose(false, null, "Unauthenticated User!");

        const existUser = await db.query.usersTable.findFirst({
            where: eq(usersTable.email, user.email)
        })

        if (!existUser) return sendRespose(false, null, 'User not Register in our database!')

        if (user.role !== "OWNER")
            return sendRespose(false, null, "Forbidden Access!");


        const [existStoreUnderUser, existStoreByStoreCode] = await Promise.all([
            getStoreByUserId(existUser.id),
            getStoreByStoreCode(storeCode),
        ]);

        if (existStoreUnderUser)
            return sendRespose(false, null, "You Have Already a Store!");
        if (existStoreByStoreCode)
            return sendRespose(false, null, "Store Already Exist By Store Code!");

        const [newStore] = await db
            .insert(storesTable)
            .values({
                name,
                storeCode,
                userId: existUser.id
            })
            .returning();
        if (newStore) return sendRespose(false, null, "Failed to create store!");
        return sendRespose(true, newStore, "Store Created Successful!");
    } catch (e) {
        _log(e);
        return sendRespose(false, null, 'Something went wrong!', e)
    }
};