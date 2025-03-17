'use server'

import { auth } from "@clerk/nextjs/server";

import { db } from "@/drizzle/db";
import { storesTable } from "@/drizzle/schema";
import { _log, sendResponse } from "@/lib/helper"
import { getStoreByIdAndUserId, getStoreByStoreCode, } from "../db";
import { updateStoreFormSchema, UpdateStoreFormValue } from "../validation-schema";

export const updateStoreAction = async (storeId: string, formValue: UpdateStoreFormValue) => {
    try {
        const validation = updateStoreFormSchema.safeParse(formValue)
        if (!validation.success) return sendResponse(false, null, 'Invalid Form!')
        const { storeCode } = validation.data
    
        const {userId} = await auth();

        if (!userId) return sendResponse(false, null, "Unauthenticated User!");

        const existStoreUnderUser = await getStoreByIdAndUserId(storeId,userId)

        if (!existStoreUnderUser )
            return sendResponse(false, null, "Store Not Found!");

        if(storeCode && existStoreUnderUser.storeCode!==storeCode){
            const existStoreByStoreCode = await getStoreByStoreCode(storeCode)
            if(existStoreByStoreCode)return sendResponse(false,null,'Store Code already taken!')
        }

        const [updatedStore] = await db
            .update(storesTable)
            .set(formValue)
            .returning();

        return sendResponse(true, updatedStore, "Store Updated Success!");

    } catch (error) {
        _log(error)
        return sendResponse(false, null, 'Something went wrong!', error)
    }
}