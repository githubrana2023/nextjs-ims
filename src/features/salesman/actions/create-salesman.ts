import { withAuthCreateAction } from "@/data/with-auth-action";
import { createSalesmanFormSchema } from "../validation-schema";
import { _log, sendResponse } from "@/lib/helper";
import { getStoreByIdAndUserId } from "@/features/store/db";
import { getSupplierById } from "@/features/supplier/db";
import { getSalesmanByEmailAndSupplierId, getSalesmanByPhoneAndSupplierId, getSalesmanByNidAndSupplierId, } from "../db";
import { db } from "@/drizzle/db";
import { salesMansTable } from "@/drizzle/schema";


export const createSalesmanActionWithAuth = withAuthCreateAction(createSalesmanFormSchema,
    async (payload, userId) => {
        try {
            const { phone, supplierId, email, nid } = payload

            const existSupplier = await getSupplierById(supplierId);

            if (!existSupplier) return sendResponse(false, null, "Supplier not exist!");

            const existStoreUnderUser = await getStoreByIdAndUserId(existSupplier.storeId, userId)

            if (!existStoreUnderUser) return sendResponse(false, null, "Store not found!!");

            const existSalesmanByPhone = await getSalesmanByPhoneAndSupplierId(phone, existSupplier.id)

            if (existSalesmanByPhone) return sendResponse(false, null, 'Salesmane phone number already taken!')

            if (email && await getSalesmanByEmailAndSupplierId(email, existSupplier.id)) return sendResponse(false, null, 'Salesmane email already taken!')
                
            if (nid && await getSalesmanByNidAndSupplierId(nid, existSupplier.id)) return sendResponse(false, null, 'Salesmane nid already taken!')




            const [newSalesman] = await db
                .insert(salesMansTable)
                .values(payload)
                .returning();
            if (!newSalesman)
                return sendResponse(false, null, "Failed to create salesman");
            return sendResponse(true, newSalesman, "Salesman Created Successfull!");
        } catch (e) {
            _log(e);
            return sendResponse(false, null, 'Something went wrong!')
        }
    }
)