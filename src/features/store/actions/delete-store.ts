'use server'

import { and, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { getStoreByIdAndUserId, } from "../db";
import { storesTable } from "@/drizzle/schema";
import { _log, sendResponse } from "@/lib/helper"
import { withAuthDeleteAction } from "@/data/with-auth-action";

export const deleteStoreActionWithAuth = withAuthDeleteAction(
  async (id, currentStoreId, userId) => {
    try {

      const existStoreUnderUser = await getStoreByIdAndUserId(id || currentStoreId, userId);

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
      if (!deletedStore)
        return sendResponse(false, null, "Failed to delete store!");
      return sendResponse(true, deletedStore, "Store deleted Successful!");

    } catch (error) {
      _log(error)
      return sendResponse(false, null, 'Something went wrong!', error)
    }
  }
)