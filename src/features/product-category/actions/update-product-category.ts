'use server'

import { withAuthUpdateAction } from "@/data/with-auth-action";
import { updateProductCategoryFormSchema } from "../validation-schema";
import { getStoreByIdAndUserId } from "@/features/store/db";
import { _log, sendResponse } from "@/lib/helper";
import { getProductCategoryByNameAndStoreId } from "../db";
import { db } from "@/drizzle/db";
import { productCategoriesTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";


export const updateProductCategoryAction = withAuthUpdateAction(updateProductCategoryFormSchema,
    async ({ id, currentStoreId, payload, userId }) => {
        try {
            const { name, storeId } = payload

            const existStoreUnderUser = await getStoreByIdAndUserId(currentStoreId, userId)

            if (!existStoreUnderUser) return sendResponse(false, null, 'Forbidden Access!')

            let existNewStoreUnderUser: Awaited<ReturnType<typeof getStoreByIdAndUserId>>

            if (storeId && existStoreUnderUser.id !== storeId) {
                const existStore = await getStoreByIdAndUserId(storeId, userId)
                if (!existStore) return sendResponse(false, null, 'New Store not found under you!')
                existNewStoreUnderUser = existStore
            }

            if (name && existStoreUnderUser.name !== name && existNewStoreUnderUser) {
                const existProductCategoryUnderNewStore = await getProductCategoryByNameAndStoreId(name, existNewStoreUnderUser.id)
                if (existProductCategoryUnderNewStore) return sendResponse(false, null, 'Product Category already exist to new selected store!')
            }



            const [newProductCategory] = await db
                .update(productCategoriesTable)
                .set(payload)
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