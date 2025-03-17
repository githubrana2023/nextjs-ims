'use server'

import { _log,sendResponse } from "@/lib/helper"
import { auth } from "@clerk/nextjs/server";
import { getStoreByIdAndUserId, getStoreByUserId } from "../db";
import { db } from "@/drizzle/db";
import { storesTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export const deleteStoreAction = async (storeId:string)=>{
    try {
        const {userId} = await auth()

    if (!userId) return sendResponse(false, null, "Unauthenticated User!");

    const existStoreUnderUser = await getStoreByIdAndUserId(storeId, userId);

    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const [deletedStore] = await db
      .delete(storesTable)
      .where(
        and(
          eq(storesTable.clerkUserId, userId),
          eq(storesTable.id, existStoreUnderUser.id),
        ),
      )
      .returning();
    if (deletedStore)
      return sendResponse(false, null, "Failed to delete store!");
    return sendResponse(true, deletedStore, "Store deleted Successful!");
        
    } catch (error) {
        _log(error)
        return sendResponse(false,null,'Something went wrong!',error)
    }
}