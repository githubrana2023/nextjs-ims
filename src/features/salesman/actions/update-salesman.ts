'use server'

import { and, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { _log, sendResponse } from "@/lib/helper";
import { salesMansTable } from "@/drizzle/schema";
import { getStoreByIdAndUserId } from "@/features/store/db";
import { withAuthUpdateAction } from "@/data/with-auth-action";
import { updateSalesmanFormSchema } from "../validation-schema";
import { getSupplierByIdAndStoreId } from "@/features/supplier/db";
import {
    getSalesmanByEmailAndSupplierId,
    getSalesmanByPhoneAndSupplierId,
    getSalesmanByNidAndSupplierId,
    getSalesmanByIdAndSupplierId
} from "../db";


export const createSalesmanActionWithAuth = withAuthUpdateAction(updateSalesmanFormSchema,
    async ({ id, currentStoreId, userId, payload }) => {
        try {
            const { phone, email, nid, supplierId } = payload

            const existStoreUnderUser = await getStoreByIdAndUserId(currentStoreId, userId)

            if (!existStoreUnderUser) return sendResponse(false, null, "Forbidden Access!");

            const existSupplierUnderStore = await getSupplierByIdAndStoreId(supplierId, existStoreUnderUser.id);

            if (!existSupplierUnderStore) return sendResponse(false, null, "Supplier not exist!");

            const existSalesmanUnderSupplier = await getSalesmanByIdAndSupplierId(id, existSupplierUnderStore.id)

            if (!existSalesmanUnderSupplier) return sendResponse(false, null, 'Salesman not register under current supplier!')


            if (phone && existSalesmanUnderSupplier.phone !== phone) {
                const existSalesmanByPhone = await getSalesmanByPhoneAndSupplierId(phone, existSupplierUnderStore.id)
                if (existSalesmanByPhone) return sendResponse(false, null, 'Salesman phone number already registered with current supplier!')
            }


            if (email && existSalesmanUnderSupplier.email !== email) {
                const existSalesmanByEmail = await getSalesmanByEmailAndSupplierId(email, existSupplierUnderStore.id)
                if (existSalesmanByEmail) return sendResponse(false, null, 'Salesman email already registered with current supplier!')
            }


            if (nid && existSalesmanUnderSupplier.nid !== nid) {
                const existSalesmanByNid = await getSalesmanByNidAndSupplierId(nid, existSupplierUnderStore.id)
                if (existSalesmanByNid) return sendResponse(false, null, 'Salesman nid number already registered with current supplier!')
            }

            const [updatedSalesman] = await db
                .update(salesMansTable)
                .set(payload)
                .where(
                    and(
                        eq(salesMansTable.id, existSalesmanUnderSupplier.id),
                        eq(salesMansTable.supplierId, existSalesmanUnderSupplier.supplierId),
                    )
                )
                .returning();
            if (!updatedSalesman)
                return sendResponse(false, null, "Failed to update salesman");
            return sendResponse(true, updatedSalesman, "Salesman updated Successfull!");
        } catch (e) {
            _log(e);
            return sendResponse(false, null, 'Something went wrong!')
        }
    }
)