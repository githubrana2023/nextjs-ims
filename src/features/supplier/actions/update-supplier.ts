import { withAuthUpdateAction } from "@/data/with-auth-action"
import { _log, sendResponse } from "@/lib/helper"
import { updateSupplierFormSchema } from "../validation-schema"
import { getSupplierByIdAndStoreId, getSupplierBySupplierCodeAndStoreId } from "../db"
import { getStoreByIdAndUserId } from "@/features/store/db"
import { db } from "@/drizzle/db"
import { suppliersTable } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"



export const updateSupplierActionWithAuth = withAuthUpdateAction(updateSupplierFormSchema,
    async ({ id, currentStoreId, userId, payload }) => {
        try {
            const { supplierCode } = payload

            const existStoreUnderUser = await getStoreByIdAndUserId(currentStoreId, userId);

            if (!existStoreUnderUser) return sendResponse(false, null, 'Forbidden Access!')

            const existSupplierUnderStore = await getSupplierByIdAndStoreId(id, existStoreUnderUser.id)

            if (!existSupplierUnderStore) return sendResponse(false, null, 'Store does not have supplier!')

            if (supplierCode && existSupplierUnderStore.supplierCode !== supplierCode) {
                const existSupplierBySupplierCodeUnderStore = await getSupplierBySupplierCodeAndStoreId(supplierCode, existStoreUnderUser.id)
                if (existSupplierBySupplierCodeUnderStore) return sendResponse(false, null, 'Supplier Code already taken!')
            }

            const [updatedSupplier] = await db.update(suppliersTable).set(payload).where(
                and(
                    eq(suppliersTable.id, existSupplierUnderStore.id),
                    eq(suppliersTable.storeId, existStoreUnderUser.id),
                    eq(suppliersTable.isDeleted, false),
                )
            ).returning()
            if (!updatedSupplier) return sendResponse(false, null, 'Failed to update supplier!')

            return sendResponse(true, updatedSupplier, 'Supplier updated!')
        } catch (error) {
            _log(error)
            return sendResponse(false, null, 'Something went wrong!')
        }
    }
)