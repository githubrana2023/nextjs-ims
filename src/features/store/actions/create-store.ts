'use server'

import { db } from "@/drizzle/db"
import { storesTable } from "@/drizzle/schema"
import { _log, sendResponse } from "@/lib/helper"
import { getStoreByStoreCode, getStoreByUserId } from "../db"
import { createStoreFormSchema} from "../validation-schema"
import { withAuthCreateAction } from "@/data/with-auth-action"


export const createStoreActionWithAuth = withAuthCreateAction(createStoreFormSchema,
    async (payload,userId) => {
        try {
            const { storeCode } = payload

            const [existStoreUnderUser, existStoreByStoreCode] = await Promise.all([
                getStoreByUserId(userId),
                getStoreByStoreCode(storeCode),
            ]);

            if (existStoreUnderUser)
                return sendResponse(false, null, "You Have Already a Store!");
            if (existStoreByStoreCode)
                return sendResponse(false, null, "Store Already Exist By Store Code!");

            const [newStore] = await db
                .insert(storesTable)
                .values({
                    ...payload,
                    clerkUserId: userId
                })
                .returning();
            if (!newStore) return sendResponse(false, null, "Failed to create store!");
            return sendResponse(true, newStore, "Store Created Successful!");

        } catch (error) {
            _log(error)
            return sendResponse(false, null, 'Something went wrong!', error)
        }
    }
)