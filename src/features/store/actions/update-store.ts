'use server'

import { db } from "@/drizzle/db";
import { storesTable } from "@/drizzle/schema";
import { _log, sendResponse } from "@/lib/helper"
import { getStoreByIdAndUserId, getStoreByStoreCode, } from "../db";
import { updateStoreFormSchema } from "../validation-schema";
import { withAuthUpdateAction } from "@/data/with-auth-action";

export const updateStoreActionWithAuth = withAuthUpdateAction(updateStoreFormSchema,
    async ({
        id,
        currentStoreId,
        userId,
        payload: { 
            storeCode,name
         }
    }) => {
        try {
            
            const existStoreUnderUser = await getStoreByIdAndUserId(id || currentStoreId, userId)

            if (!existStoreUnderUser)
                return sendResponse(false, null, "Forbidden Access!");

            if (storeCode && existStoreUnderUser.storeCode !== storeCode) {
                const existStoreByStoreCode = await getStoreByStoreCode(storeCode)
                if (existStoreByStoreCode) return sendResponse(false, null, 'Store Code already taken!')
            }

            const [updatedStore] = await db
                .update(storesTable)
                .set({
                    name,
                    storeCode
                })
                .returning();

            if(!updatedStore)return sendResponse(false,null, "Failed to update store!");
            return sendResponse(true, updatedStore, "Store Updated Success!");

        } catch (error) {
            _log(error)
            return sendResponse(false, null, 'Something went wrong!', error)
        }
    }
)