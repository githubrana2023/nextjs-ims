'use server'

import { withAuthCreateAction } from "@/data/with-auth-action";
import { createProductCategoryFormSchema } from "../validation-schema";
import { getStoreByIdAndUserId } from "@/features/store/db";
import { _log, sendResponse } from "@/lib/helper";
import { getProductCategoryByNameAndStoreId } from "../db";
import { db } from "@/drizzle/db";
import { productCategoriesTable } from "@/drizzle/schema";


export const createProductCategoryAction = withAuthCreateAction(createProductCategoryFormSchema,
    async (payload, userId) => {
        try {
            const { name, storeId } = payload

            const existStoreUnderUser = await getStoreByIdAndUserId(storeId, userId)

            if (!existStoreUnderUser) return sendResponse(false, null, 'Forbidden Access!')

            const existProductCategoryByName = await getProductCategoryByNameAndStoreId(name, existStoreUnderUser.id)

            if (existProductCategoryByName) return sendResponse(false, null, "Product Category Already Exist In Your Store!",);

            const [newProductCategory] = await db
                .insert(productCategoriesTable)
                .values(payload)
                .returning();

            if (!newProductCategory) return sendResponse(false, null, "Failed to create product category");
            return sendResponse(true, newProductCategory, "Product Category created successful!",);
        } catch (error) {
            _log(error)
            return sendResponse(false, null, "Failed to create product category", error);
        }
    }
)