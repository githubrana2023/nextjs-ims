import { db } from "@/drizzle/db";
import { productCategoriesTable } from "@/drizzle/schema";
import { and,eq } from "drizzle-orm";

export const getProductCategoryByNameAndStoreId = async (
  name: string,
  storeId: string,
) => {
  return await db.query.productCategoriesTable.findFirst({
    where: and(
      eq(productCategoriesTable.name, name),
      eq(productCategoriesTable.storeId, storeId),
    ),
  });
};

export const getProductCategoryByIdAndStoreId = async (
  id: string,
  storeId: string,
) => {
  return await db.query.productCategoriesTable.findFirst({
    where: and(
      eq(productCategoriesTable.id, id),
      eq(productCategoriesTable.storeId, storeId),
    ),
  });
};