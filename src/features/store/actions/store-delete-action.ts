'use server'

import { sendRespose } from "@/lib/helper/send-response";
import { currentUser } from "@/services/auth";
import { getStoreByIdAndUserId } from "../db";
import { db } from "@/drizzle/db";

const deleteStore = async (storeId: string) => {
    try {
      const user = await currentUser();
  
      if (!user) return sendRespose(false, null, "Unauthenticated User!");
  
      if (user.role !== "OWNER")
        return sendRespose(false, null, "Forbidden Access!");
    const existUser = await db.query.usersTable.
      const existStoreUnderUser = await getStoreByIdAndUserId(storeId, user.id);
  
      if (!existStoreUnderUser)
        return sendRespose(false, null, "Unauthorized Access!");
  
      const [deletedStore] = await db
        .delete(schema.stores)
        .where(
          and(
            eq(schema.stores.userId, user.id),
            eq(schema.stores.id, existStoreUnderUser.id),
          ),
        )
        .returning();
      if (deletedStore)
        return sendRespose(false, null, "Failed to delete store!");
      return sendRespose(true, deletedStore, "Store deleted Successful!");
    } catch (e) {
      _log(e);
    }
  };