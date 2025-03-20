'use server'

import { withAuthDeleteAction } from "@/data/with-auth-action";
import { getStoreByIdAndUserId } from "@/features/store/db";
import { _log, sendResponse } from "@/lib/helper";
import { getProductCategoryByIdAndStoreId } from "../db";
import { db } from "@/drizzle/db";
import { productCategoriesTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";


export const deleteProductCategoryAction = withAuthDeleteAction(
    async ({ id, currentStoreId, userId }) => {
        try {
            const existStoreUnderUser = await getStoreByIdAndUserId(currentStoreId, userId)

            if (!existStoreUnderUser) return sendResponse(false, null, 'Forbidden Access!')

            const existProductCategoryUnderNewStore = await getProductCategoryByIdAndStoreId(id,existStoreUnderUser.id)

            if(!existProductCategoryUnderNewStore)return sendResponse(false,null,'Product Category not found!')


            const [newProductCategory] = await db
                .delete(productCategoriesTable)
                .where(
                    and(
                        eq(productCategoriesTable.id, id),
                        eq(productCategoriesTable.storeId, existStoreUnderUser.id),
                    )
                )
                .returning();

            if (!newProductCategory) return sendResponse(false, null, "Failed to create product category");
            return sendResponse(true, newProductCategory, "Product Category created successful!",);
        } catch (error) {
            _log(error)
            return sendResponse(false, null, "Failed to create product category", error);
        }
    }
)