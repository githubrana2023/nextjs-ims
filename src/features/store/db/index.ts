import { db } from "@/drizzle/db";
import { storesTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export const getStoreByUserId = async (userId: string) => {
    return await db.query.storesTable.findFirst({
        where: eq(storesTable.clerkUserId, userId),
    });
};
export const getStoreById = async (id: string) => {
    return await db.query.storesTable.findFirst({
        where: eq(storesTable.id, id),
    });
};
export const getStoreByIdAndUserId = async (id: string, userId: string) => {
    return await db.query.storesTable.findFirst({
        where: and(
            eq(storesTable.id, id),
             eq(storesTable.clerkUserId, userId),
             eq(storesTable.isDeleted, false),
            ),
    });
};
export const getStoreByStoreCode = async (storeCode: string) => {
    return await db.query.storesTable.findFirst({
        where: eq(storesTable.storeCode, storeCode),
    });
};