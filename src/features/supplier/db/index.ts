import { eq, and } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { suppliersTable } from "@/drizzle/schema";

export const getSupplierByStoreId = async (storeId: string) => {
    return await db.query.suppliersTable.findFirst({
        where: eq(suppliersTable.storeId, storeId),
    });
};
export const getSupplierById = async (id: string) => {
    return await db.query.suppliersTable.findFirst({
        where: eq(suppliersTable.id, id),
    });
};
export const getSupplierBySupplierCode = async (supplierCode: string) => {
    return await db.query.suppliersTable.findFirst({
        where: eq(suppliersTable.supplierCode, supplierCode),
    });
};
export const getSupplierBySupplierCodeAndStoreId = async (
    supplierCode: string,
    storeId: string,
) => {
    return await db.query.suppliersTable.findFirst({
        where: and(
            eq(suppliersTable.supplierCode, supplierCode),
            eq(suppliersTable.storeId, storeId),
            eq(suppliersTable.isDeleted, false),
        ),
    });
};
export const getSupplierBySupplierNameAndStoreId = async (
    supplierName: string,
    storeId: string,
) => {
    return await db.query.suppliersTable.findFirst({
        where: and(
            eq(suppliersTable.name, supplierName),
            eq(suppliersTable.storeId, storeId),
            eq(suppliersTable.isDeleted, false),
        ),
    });
};
export const getSupplierByIdAndStoreId = async (id: string, storeId: string) => {
    return await db.query.suppliersTable.findFirst({
        where: and(
            eq(suppliersTable.id, id),
            eq(suppliersTable.storeId, storeId),
            eq(suppliersTable.isDeleted, false),
        ),
    });
};
