'use server'

import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/drizzle/db";
import { _log, sendResponse } from "@/lib/helper";
import { salesMansTable } from "@/drizzle/schema";
import { getStoreByIdAndUserId } from "@/features/store/db";
import { getSupplierByIdAndStoreId } from "@/features/supplier/db";
import {getSalesmanByIdAndSupplierId} from "../db";


export const deleteSalesmanAction = async (salesmanId:string,supplierId:string,currentStoreId:string) => {
    try {
        const {userId} = await auth()
        if(!userId) return sendResponse(false,null,'Unauthenticated Access!')
        const existStoreUnderUser = await getStoreByIdAndUserId(currentStoreId, userId)

        if (!existStoreUnderUser) return sendResponse(false, null, "Forbidden Access!");

        const existSupplierUnderStore = await getSupplierByIdAndStoreId(supplierId, existStoreUnderUser.id);

        if (!existSupplierUnderStore) return sendResponse(false, null, "Supplier not exist!");

        const existSalesmanUnderSupplier = await getSalesmanByIdAndSupplierId(salesmanId, existSupplierUnderStore.id)

        if (!existSalesmanUnderSupplier) return sendResponse(false, null, 'Salesman not register under current supplier!')

        const [deletedSalesman] = await db
            .delete(salesMansTable)
            .where(
                and(
                    eq(salesMansTable.id, existSalesmanUnderSupplier.id),
                    eq(salesMansTable.supplierId, existSalesmanUnderSupplier.supplierId),
                )
            )
            .returning();
        if (!deletedSalesman)
            return sendResponse(false, null, "Failed to delete salesman");
        return sendResponse(true, deletedSalesman, "Salesman deleted Successfull!");
    } catch (e) {
        _log(e);
        return sendResponse(false, null, 'Something went wrong!')
    }
}
