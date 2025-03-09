'use server'

import { _log, sendRespose } from "@/lib/helper/send-response";
import { currentUser } from "@/services/auth";
import { getStoreByIdAndUserId } from "../db";
import { db } from "@/drizzle/db";
import { storesTable, usersTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

const deleteStore = async (storeId: string) => {
  try {
    const user = await currentUser();

    if (!user) return sendRespose(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendRespose(false, null, "Forbidden Access!");
    const existUser = await db.query.usersTable.findFirst({ where: eq(usersTable.id, user.id) })
    if (!existUser) return sendRespose(false, null, 'User not register with our Database!')

    const existStoreUnderUser = await getStoreByIdAndUserId(storeId, existUser.id);

    if (!existStoreUnderUser)
      return sendRespose(false, null, "Unauthorized Access!");

    const [deletedStore] = await db
      .delete(storesTable)
      .where(
        and(
          eq(storesTable.userId, user.id),
          eq(storesTable.id, existStoreUnderUser.id),
        ),
      )
      .returning();
    if (deletedStore)
      return sendRespose(false, null, "Failed to delete store!");
    return sendRespose(true, deletedStore, "Store deleted Successful!");
  } catch (e) {
    _log(e);
    return sendRespose(false, null, "Something went wrong!", e);
  }
};