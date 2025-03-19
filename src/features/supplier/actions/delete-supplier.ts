import { withAuthDeleteAction, WithAuthDeleteActionType } from "@/data/with-auth-action";
import { getStoreByIdAndUserId } from "@/features/store/db";
import { _log, sendResponse } from "@/lib/helper";
import { getSupplierByIdAndStoreId } from "../db";
import { db } from "@/drizzle/db";
import { suppliersTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

const fn: WithAuthDeleteActionType = async (supplierId, currentStoreId, userId) => {
    try {
        const existStoreUnderUser = await getStoreByIdAndUserId(currentStoreId, userId);

        if (!existStoreUnderUser) return sendResponse(false, null, 'Forbidden Access!')

        const existSupplierUnderStore = await getSupplierByIdAndStoreId(supplierId, existStoreUnderUser.id)

        if (!existSupplierUnderStore) return sendResponse(false, null, 'Supplier does not exist under your store!')

        const [deletedSupplier] = await db.update(suppliersTable).set({
            isDeleted: true
        }).where(
            and(
                eq(suppliersTable.id, existSupplierUnderStore.id),
                eq(suppliersTable.storeId, existStoreUnderUser.id),
                eq(suppliersTable.isDeleted, false),
            )
        ).returning()

        if (!deletedSupplier) return sendResponse(false, null, 'Failed to delete supplier!')
        return sendResponse(true, deletedSupplier, 'Supplier deleted successfully!')

    } catch (error) {
        _log(error)
        return sendResponse(false, null, 'Something went wrong!')
    }

}

export const deleteSupplierActionWithAuth = withAuthDeleteAction(fn)