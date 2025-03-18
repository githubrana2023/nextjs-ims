'use server'

import { createSupplierFormSchema } from '../validation-schema'
import { sendResponse, _log } from '@/lib/helper';
import { getStoreByIdAndUserId } from '@/features/store/db';
import { getSupplierBySupplierCodeAndStoreId, getSupplierBySupplierNameAndStoreId } from '../db';
import { suppliersTable } from '@/drizzle/schema'
import { db } from '@/drizzle/db'
import { withAuthCreateAction } from '@/data/with-auth-action';


export const createSupplierActionWithAuth = withAuthCreateAction(
  async (formValue, userId) => {
    try {
      const validation = createSupplierFormSchema.safeParse(formValue)
      if (!validation.success) return sendResponse(false, null, 'Invalid Fields!')
      const { name, storeId, supplierCode } = validation.data


      const existStoreUnderUser = await getStoreByIdAndUserId(storeId, userId);
      if (!existStoreUnderUser)
        return sendResponse(false, null, "Unauthorized Access!");

      const [existSupplierBySupplierName, existSupplierBySupplierCodeAndStoreId] =
        await Promise.all([
          getSupplierBySupplierNameAndStoreId(
            name,
            existStoreUnderUser.id,
          ),
          getSupplierBySupplierCodeAndStoreId(
            supplierCode,
            existStoreUnderUser.id,
          ),
        ]);

      if (existSupplierBySupplierName)
        return sendResponse(false, null, "You Have Already a Supplier!");
      if (existSupplierBySupplierCodeAndStoreId)
        return sendResponse(
          false,
          null,
          "Supplier Code already taken!",
        );

      const [newSupplier] = await db
        .insert(suppliersTable)
        .values(validation.data)
        .returning();
      if (!newSupplier)
        return sendResponse(false, null, "Failed to create Supplier!");
      return sendResponse(true, newSupplier, "Supplier Created Successful!");

    } catch (error) {
      _log(error)
      return sendResponse(false, null, 'Something went wrong!')
    }
  }
)