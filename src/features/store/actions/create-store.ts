'use server'

import { auth } from "@clerk/nextjs/server"

import { db } from "@/drizzle/db"
import { storesTable } from "@/drizzle/schema"
import { _log, sendResponse } from "@/lib/helper"
import { getStoreByStoreCode, getStoreByUserId } from "../db"
import { createStoreFormSchema, CreateStoreFormValue } from "../validation-schema"

export const createStoreAction = async (formValue: CreateStoreFormValue) => {
    try {
        const validation = createStoreFormSchema.safeParse(formValue)
        if (!validation.success) return sendResponse(false, null, 'Invalid Form!')
        const { storeCode } = validation.data

        const { userId } = await auth()
        if (!userId) return sendResponse(false, null, 'Unauthenticated Access!')

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
                ...validation.data,
                clerkUserId: userId
            })
            .returning();
        if (newStore) return sendResponse(false, null, "Failed to create store!");
        return sendResponse(true, newStore, "Store Created Successful!");

    } catch (error) {
        _log(error)
        return sendResponse(false, null, 'Something went wrong!', error)
    }
}