/**
 * Write your code here
 * 💡Tip: you can use the `$` global variable to access goodies
 */
import { eq, and, or } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { _log, sendResponse } from '@/lib/helper'
import * as schema from "./schema";

type UserInsert = typeof schema.users.$inferInsert;
type User = typeof schema.users.$inferSelect;

type StoreInsert = typeof schema.stores.$inferInsert;
type Store = typeof schema.stores.$inferSelect;

type CustomerInsert = typeof schema.customers.$inferInsert;
type Customer = typeof schema.customers.$inferSelect;

type SupplierInsert = typeof schema.suppliers.$inferInsert;
type Supplier = typeof schema.suppliers.$inferSelect;

type SalesmanInsert = typeof schema.salesMans.$inferInsert;
type Salesman = typeof schema.salesMans.$inferSelect;

type ProductInsert = typeof schema.products.$inferInsert;
type Product = typeof schema.products.$inferSelect;

type ProductCategoryInsert = typeof schema.productCategories.$inferInsert;
type ProductCategory = typeof schema.productCategories.$inferSelect;

type SalesProductPaidBillInsert = typeof schema.salesPaidBills.$inferInsert;
type SalesProductPaidBill = typeof schema.salesPaidBills.$inferSelect;

type SalesInsert = typeof schema.sales.$inferInsert;
type Sales = typeof schema.sales.$inferSelect;

type PurchaseProductPaidBill = typeof schema.purchasePaidBills.$inferInsert;
type ProductPaidBill = typeof schema.purchasePaidBills.$inferSelect;

type LoggedUser = Pick<User, "id" | "email" | "role"> | null;
const currentUser = async (): Promise<LoggedUser> => {
  return {
    email: "email@mail.com",
    id: "userId",
    role: "OWNER",
  };
};

// Store queries

//get
const getStoreByUserId = async (userId: string) => {
  return await db.query.storesTable.findFirst({
    where: eq(schema.stores.userId, userId),
  });
};
const getStoreById = async (id: string) => {
  return await db.query.storesTable.findFirst({
    where: eq(schema.stores.id, id),
  });
};
const getStoreByIdAndUserId = async (id: string, userId: string) => {
  return await db.query.storesTable.findFirst({
    where: and(eq(schema.stores.id, id), eq(schema.stores.userId, userId)),
  });
};
const getStoreByStoreCode = async (storeCode: string) => {
  return await db.query.storesTable.findFirst({
    where: eq(schema.stores.storeCode, storeCode),
  });
};

//create
const createStore = async (formValue: StoreInsert) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");
    const [existStoreUnderUser, existStoreByStoreCode] = await Promise.all([
      getStoreByUserId(user.id),
      getStoreByStoreCode(formValue.storeCode),
    ]);

    if (existStoreUnderUser)
      return sendResponse(false, null, "You Have Already a Store!");
    if (existStoreByStoreCode)
      return sendResponse(false, null, "Store Already Exist By Store Code!");

    const [newStore] = await db
      .insert(schema.stores)
      .values(formValue)
      .returning();
    if (newStore) return sendResponse(false, null, "Failed to create store!");
    return sendResponse(true, newStore, "Store Created Successful!");
  } catch (e) {
    _log(e);
  }
};

// update
const updateStore = async (formValue: Partial<StoreInsert>) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const [existStoreUnderUser, existStoreByStoreCode] = await Promise.all([
      getStoreByUserId(user.id),
      getStoreByStoreCode(formValue.storeCode ?? ""),
    ]);

    if (!existStoreUnderUser || !existStoreByStoreCode)
      return sendResponse(false, null, "Store Not Found!");

    const [updatedStore] = await db
      .update(schema.stores)
      .set({
        name: formValue.name,
      })
      .returning();

    if (existStoreUnderUser.name === updatedStore?.name)
      return sendResponse(false, null, "Could not update the store!");

    return sendResponse(true, updatedStore, "Store Updated Success!");
  } catch (e) {
    _log(e);
  }
};

const deleteStore = async (storeId: string) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");
    const existStoreUnderUser = await getStoreByIdAndUserId(storeId, user.id);

    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const [deletedStore] = await db
      .delete(schema.stores)
      .where(
        and(
          eq(schema.stores.userId, user.id),
          eq(schema.stores.id, existStoreUnderUser.id),
        ),
      )
      .returning();
    if (deletedStore)
      return sendResponse(false, null, "Failed to delete store!");
    return sendResponse(true, deletedStore, "Store deleted Successful!");
  } catch (e) {
    _log(e);
  }
};

// Supplier Queries

//get
const getSupplierByStoreId = async (storeId: string) => {
  return await db.query.suppliersTable.findFirst({
    where: eq(schema.suppliers.storeId, storeId),
  });
};
const getSupplierById = async (id: string) => {
  return await db.query.suppliersTable.findFirst({
    where: eq(schema.suppliers.id, id),
  });
};
const getSupplierBySupplierCode = async (supplierCode: string) => {
  return await db.query.suppliersTable.findFirst({
    where: eq(schema.suppliers.supplierCode, supplierCode),
  });
};
const getSupplierBySupplierCodeAndStoreId = async (
  supplierCode: string,
  storeId: string,
) => {
  return await db.query.suppliersTable.findFirst({
    where: and(
      eq(schema.suppliers.supplierCode, supplierCode),
      eq(schema.suppliers.storeId, storeId),
    ),
  });
};
const getSupplierBySupplierNameAndStoreId = async (
  supplierName: string,
  storeId: string,
) => {
  return await db.query.suppliersTable.findFirst({
    where: and(
      eq(schema.suppliers.name, supplierName),
      eq(schema.suppliers.storeId, storeId),
    ),
  });
};
const getSupplierByIdAndStoreId = async (id: string, storeId: string) => {
  return await db.query.suppliersTable.findFirst({
    where: and(
      eq(schema.suppliers.id, id),
      eq(schema.suppliers.storeId, storeId),
    ),
  });
};

//create
const createSupplier = async (formValue: SupplierInsert) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByUserId(user.id);
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const [existSupplierBySupplierName, existSupplierBySupplierCodeAndStoreId] =
      await Promise.all([
        getSupplierBySupplierNameAndStoreId(
          formValue.name,
          existStoreUnderUser.id,
        ),
        getSupplierBySupplierCodeAndStoreId(
          formValue.supplierCode,
          existStoreUnderUser.id,
        ),
      ]);

    if (existSupplierBySupplierName)
      return sendResponse(false, null, "You Have Already a Supplier!");
    if (existSupplierBySupplierCodeAndStoreId)
      return sendResponse(
        false,
        null,
        "Supplier Already Exist By Supplier Code!",
      );

    const [newSupplier] = await db
      .insert(schema.suppliers)
      .values(formValue)
      .returning();
    if (newSupplier)
      return sendResponse(false, null, "Failed to create Supplier!");
    return sendResponse(true, newSupplier, "Supplier Created Successful!");
  } catch (e) {
    _log(e);
  }
};

//update
const updateSupplier = async (
  supplierId: string,
  formValue: Partial<SupplierInsert>,
) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByIdAndUserId(
      formValue.storeId ?? "",
      user.id,
    );
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existSupplierUnderStore = await getSupplierByIdAndStoreId(
      supplierId,
      existStoreUnderUser.id,
    );
    if (!existSupplierUnderStore)
      return sendResponse(
        false,
        null,
        "Supplier Not Found Under The Current Store!",
      );

    const [updatedSupplier] = await db
      .update(schema.suppliers)
      .set({
        name: formValue.name,
      })
      .where(
        and(
          eq(schema.suppliers.storeId, existStoreUnderUser.id),
          eq(schema.suppliers.id, existSupplierUnderStore.id),
        ),
      )
      .returning();

    if (existSupplierUnderStore.name === updatedSupplier?.name)
      return sendResponse(false, null, "Failed to update supplier!");
    return sendResponse(true, updatedSupplier, "Supplier Update Success!");
  } catch (e) {
    _log(e);
  }
};

//update
const deleteSupplier = async (supplierId: string, storeId: string) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByIdAndUserId(storeId, user.id);
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existSupplierUnderStore = await getSupplierByIdAndStoreId(
      supplierId,
      existStoreUnderUser.id,
    );
    if (!existSupplierUnderStore)
      return sendResponse(
        false,
        null,
        "Supplier Not Found Under The Current Store!",
      );

    const [deletedSupplier] = await db
      .delete(schema.suppliers)
      .where(
        and(
          eq(schema.suppliers.storeId, existStoreUnderUser.id),
          eq(schema.suppliers.id, existSupplierUnderStore.id),
        ),
      )
      .returning();

    return sendResponse(true, deletedSupplier, "Supplier Update Success!");
  } catch (e) {
    _log(e);
  }
};

// supplier's salesman

const getSalesmanByPhoneAndSupplierId = async (
  phone: string,
  supplierId: string,
) => {
  return await db.query.salesMansTable.findFirst({
    where: and(
      eq(schema.salesMans.phone, phone),
      eq(schema.salesMans.supplierId, supplierId),
    ),
  });
};

const createSalesman = async (formValue: SalesmanInsert) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByUserId(user.id);
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existSupplierUnderStore = await getSupplierByIdAndStoreId(
      formValue.supplierId,
      existStoreUnderUser.id,
    );
    if (!existSupplierUnderStore)
      return sendResponse(false, null, "Supplier not exist under store!");

    const existSalesmanUnderSupplier = await getSalesmanByPhoneAndSupplierId(
      formValue.phone,
      existSupplierUnderStore.id,
    );

    if (existSalesmanUnderSupplier)
      return sendResponse(
        false,
        null,
        "Salesman already registered under supplier!",
      );
    const [newSalesman] = await db
      .insert(schema.salesMans)
      .values(formValue)
      .returning();
    if (!newSalesman)
      return sendResponse(false, null, "Failed to create salesman");
    return sendResponse(true, newSalesman, "Salesman Created Successfull!");
  } catch (e) {
    _log(e);
  }
};

//CRUD Operation for Customer

// get
const getCustomerByPhoneAndStoreId = async (phone: string, storeId: string) => {
  return await db.query.customersTable.findFirst({
    where: and(
      eq(schema.customers.phone, phone),
      eq(schema.customers.storeId, storeId),
    ),
  });
};
const getCustomerByNidAndStoreId = async (
  nid: string | null | undefined,
  storeId: string,
) => {
  return await db.query.customersTable.findFirst({
    where: and(
      eq(schema.customers.nid, nid ?? ""),
      eq(schema.customers.storeId, storeId),
    ),
  });
};

const getCustomerByIdAndStoreId = async (
  customerId: string,
  storeId: string,
) => {
  return await db.query.customersTable.findFirst({
    where: and(
      eq(schema.customers.id, customerId),
      eq(schema.customers.storeId, storeId),
    ),
  });
};

// create
const createCustomer = async (formValue: CustomerInsert) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByUserId(user.id);
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existCustomerUnderStore = await getCustomerByPhoneAndStoreId(
      formValue.phone,
      existStoreUnderUser.id,
    );

    if (existCustomerUnderStore)
      return sendResponse(
        false,
        null,
        "Customer already register on your store!",
      );

    const [newCustomer] = await db
      .insert(schema.customers)
      .values(formValue)
      .returning();
    if (!newCustomer)
      return sendResponse(false, null, "Failed to create customer!");
    return sendResponse(true, newCustomer, "Customer registered successful!");
  } catch (e) {
    _log(e);
  }
};

const updateCustomer = async (
  customerId: string,
  formValue: Partial<CustomerInsert>,
) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByUserId(user.id);
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existCustomerUnderStore = await getCustomerByIdAndStoreId(
      customerId,
      existStoreUnderUser.id,
    );

    if (!existCustomerUnderStore)
      return sendResponse(false, null, "Customer not registered on your store!");

    if (formValue.nid || formValue.phone) {
      if (
        formValue.phone &&
        formValue.phone !== existCustomerUnderStore.phone
      ) {
        const existCustomerByPhoneUnderStore =
          await getCustomerByPhoneAndStoreId(
            formValue.phone,
            existCustomerUnderStore.id,
          );

        if (existCustomerByPhoneUnderStore)
          return sendResponse(
            false,
            null,
            "Customer Already exist with new Phone number",
          );

        const [updatedCustomer] = await db
          .update(schema.customers)
          .set(formValue)
          .where(
            and(
              eq(schema.customers.id, customerId),
              eq(schema.customers.storeId, existStoreUnderUser.id),
            ),
          )
          .returning();

        return sendResponse(
          true,
          updatedCustomer,
          "Customer updated succesful!",
        );
      } else {
        const existCustomerByNidUnderStore = await getCustomerByNidAndStoreId(
          formValue.nid,
          existCustomerUnderStore.id,
        );

        if (existCustomerByNidUnderStore)
          return sendResponse(
            false,
            null,
            "Customer Already exist with new Nid number",
          );

        const [updatedCustomer] = await db
          .update(schema.customers)
          .set(formValue)
          .where(
            and(
              eq(schema.customers.id, customerId),
              eq(schema.customers.storeId, existStoreUnderUser.id),
            ),
          )
          .returning();

        return sendResponse(
          true,
          updatedCustomer,
          "Customer updated succesful!",
        );
      }
    } else {
      const [updatedCustomer] = await db
        .update(schema.customers)
        .set(formValue)
        .where(
          and(
            eq(schema.customers.id, customerId),
            eq(schema.customers.storeId, existStoreUnderUser.id),
          ),
        )
        .returning();

      return sendResponse(true, updatedCustomer, "Customer updated succesful!");
    }
  } catch (e) {
    _log(e);
  }
};

const deleteCustomer = async (customerId: string) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByUserId(user.id);
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existCustomerUnderStore = await getCustomerByIdAndStoreId(
      customerId,
      existStoreUnderUser.id,
    );

    if (!existCustomerUnderStore)
      return sendResponse(false, null, "Customer not registered on your store!");

    await db
      .delete(schema.customers)
      .where(
        and(
          eq(schema.customers.id, customerId),
          eq(schema.customers.storeId, existStoreUnderUser.id),
        ),
      );

    return sendResponse(true, null, "Customer Deleted Successfull!");
  } catch (e) {
    _log(e);
  }
};

// Product Category CRUD Operation

const getProductCategoryByNameAndStoreId = async (
  name: string,
  storeId: string,
) => {
  return await db.query.productCategoriesTable.findFirst({
    where: and(
      eq(schema.productCategories.name, name),
      eq(schema.productCategories.storeId, storeId),
    ),
  });
};

const getProductCategoryByIdAndStoreId = async (
  id: string,
  storeId: string,
) => {
  return await db.query.productCategoriesTable.findFirst({
    where: and(
      eq(schema.productCategories.id, id),
      eq(schema.productCategories.storeId, storeId),
    ),
  });
};

const createProductCategory = async (formValue: ProductCategoryInsert) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByIdAndUserId(
      formValue.storeId,
      user.id,
    );
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existCategory = await getProductCategoryByNameAndStoreId(
      formValue.name,
      existStoreUnderUser.id,
    );
    if (existCategory)
      return sendResponse(
        false,
        null,
        "Product Category Already Exist In Your Store!",
      );

    const [newProductCategory] = await db
      .insert(schema.productCategories)
      .values(formValue)
      .returning();

    if (!newProductCategory)
      return sendResponse(false, null, "Failed to create product category");
    return sendResponse(
      true,
      newProductCategory,
      "Product Category created successful!",
    );
  } catch (e) {
    _log(e);
  }
};

const updateProductCategory = async (
  productCategoryId: string,
  formValue: Partial<ProductCategoryInsert>,
) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByIdAndUserId(
      formValue.storeId ?? "",
      user.id,
    );
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existCategoryByIdAndStoreId = await getProductCategoryByIdAndStoreId(
      productCategoryId,
      existStoreUnderUser.id,
    );
    if (!existCategoryByIdAndStoreId)
      return sendResponse(false, null, "Product Category Not Found!");

    const existCategory = await getProductCategoryByNameAndStoreId(
      formValue.name ?? "",
      existStoreUnderUser.id,
    );
    if (existCategory)
      return sendResponse(
        false,
        null,
        "Product Category Already Exist In Your Store!",
      );

    const [updatedProductCategory] = await db
      .update(schema.productCategories)
      .set(formValue)
      .returning();

    if (!updatedProductCategory)
      return sendResponse(false, null, "Failed to create product category");
    return sendResponse(
      true,
      updatedProductCategory,
      "Product Category updated successful!",
    );
  } catch (e) {
    _log(e);
  }
};

const deleteProductCategory = async (
  productCategoryId: string,
  storeId: string,
) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByIdAndUserId(storeId, user.id);
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existCategoryByIdAndStoreId = await getProductCategoryByIdAndStoreId(
      productCategoryId,
      existStoreUnderUser.id,
    );
    if (!existCategoryByIdAndStoreId)
      return sendResponse(false, null, "Product Category Not Found!");

    const [deletedProductCategory] = await db
      .delete(schema.productCategories)
      .where(
        and(
          eq(schema.productCategories.id, existCategoryByIdAndStoreId.id),
          eq(
            schema.productCategories.storeId,
            existCategoryByIdAndStoreId.storeId,
          ),
        ),
      )
      .returning();

    if (!deletedProductCategory)
      return sendResponse(false, null, "Failed to create product category");
    return sendResponse(true, null, "Product Category deleted successful!");
  } catch (e) {
    _log(e);
  }
};

// Product CRUD Operation

//get
const getProductByIdAndStoreIdAndSupplierId = async (
  id: string,
  storeId: string,
  supplierId: string,
) => {
  return await db.query.productsTable.findFirst({
    where: and(
      eq(schema.products.id, id),
      eq(schema.products.storeId, storeId),
      eq(schema.products.supplierId, supplierId),
      eq(schema.products.isActive, true),
    ),
  });
};

const getProductByIdAndStoreId = async (id: string, storeId: string) => {
  return await db.query.productsTable.findFirst({
    where: and(
      eq(schema.products.id, id),
      eq(schema.products.storeId, storeId),
      eq(schema.products.isActive, true),
    ),
  });
};

const getPurchaseProductsByPurchaseReference = async (
  purchaseReferenceId: string,
  storeId: string,
  supplierId: string,
) => {
  return await db.query.purchasesTable.findFirst({
    where: and(
      eq(schema.purchases.purchaseReferenceId, purchaseReferenceId),
      eq(schema.purchases.storeId, storeId),
      eq(schema.purchases.supplierId, supplierId),
    ),
    with: {
      purchaseProducts: true,
    },
  });
};
const getSalesProductsBySalesReference = async (
  salesReferenceId: string,
  storeId: string,
  customerId: string,
) => {
  return await db.query.salesTable.findFirst({
    where: and(
      eq(schema.sales.salesReferenceId, salesReferenceId),
      eq(schema.sales.storeId, storeId),
      eq(schema.sales.customerId, customerId),
    ),
    with: {
      salesProducts: true,
    },
  });
};

const createProduct = async (formValue: ProductInsert) => {
  try {
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    if (Number(formValue.quantity) < 0)
      return sendResponse(false, null, "Quantity can not be less than 0!");

    const existStoreUnderUser = await getStoreByIdAndUserId(
      formValue.storeId,
      user.id,
    );
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existProductBySkuUnderStore = await db.query.productsTable.findFirst({
      where: and(
        eq(schema.products.sku, formValue.sku),
        eq(schema.products.storeId, formValue.storeId),
      ),
    });
    if (existProductBySkuUnderStore)
      return sendResponse(
        false,
        null,
        "Product sku already taken under your current store!",
      );

    const existProduct = await db.query.productsTable.findFirst({
      where: and(
        eq(schema.products.sku, formValue.sku),
        eq(schema.products.storeId, formValue.storeId),
        eq(schema.products.supplierId, formValue.supplierId),
      ),
    });

    if (existProduct) return sendResponse(false, null, "Product already exist!");

    const [newProduct] = await db
      .insert(schema.products)
      .values(formValue)
      .returning();
    if (!newProduct)
      return sendResponse(false, null, "Failed to create product!");
    return sendResponse(true, newProduct, "Product created successfull!");
  } catch (e) {
    _log(e);
  }
};

//PURCHASE OPERATION

const createPurchase = async (formValue: {
  supplierId: string;
  storeId: string;
  purchaseDate: Date;
  total: string;
  paid: string;
  due: string;
  items: {
    productId: string;
    quantity: string;
    purchasePrice: string;
  }[];
}) => {
  try {
    const { items, total, paid, due, purchaseDate, storeId, supplierId } =
      formValue;
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByIdAndUserId(storeId, user.id);
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existSupplierUnderStore = await getSupplierByIdAndStoreId(
      supplierId,
      existStoreUnderUser.id,
    );

    if (!existSupplierUnderStore)
      return sendResponse(false, null, "Supplier not found under your store!");

    const currentDate = new Date().setHours(23, 59, 59);

    const isEarlyPurchase = new Date(purchaseDate).getTime() > currentDate;

    if (isEarlyPurchase)
      return sendResponse(
        false,
        null,
        "Purchase date should be today or before today!",
      );

    const totalPaid = paid ?? "0";

    if (Number(total) < Number(totalPaid))
      return sendResponse(false, null, "Paid amount is more than total amount");

    return await db.transaction(async (trx) => {
      //Create Purchase
      const [newPurchase] = await trx
        .insert(schema.purchases)
        .values({
          due,
          total,
          purchaseDate,
          purchaseReferenceId: "",
          storeId: existStoreUnderUser.id,
          supplierId: existSupplierUnderStore.id,
          paid: totalPaid,
        })
        .returning();

      if (!newPurchase)
        return sendResponse(false, null, "Failed to create Purchase!");

      for (const { productId, purchasePrice, quantity } of items) {
        const existProductUnderStoreAndSupplier =
          await getProductByIdAndStoreIdAndSupplierId(
            productId,
            existStoreUnderUser.id,
            existSupplierUnderStore.id,
          );

        if (!existProductUnderStoreAndSupplier)
          return sendResponse(
            false,
            null,
            "Product Not Found Under Your Store supplier",
          );

        const [newPurchaseProduct] = await trx
          .insert(schema.purchaseProducts)
          .values({
            productId: existProductUnderStoreAndSupplier.id,
            purchaseId: newPurchase.id,
            purchasePrice,
            quantity,
          })
          .returning();

        if (!newPurchaseProduct) {
          trx.rollback();
          return sendResponse(false, null, "Failed to insert Purchase Product");
        }

        const [updatedProductQuantity] = await trx
          .update(schema.products)
          .set({
            quantity: (
              Number(existProductUnderStoreAndSupplier.quantity) +
              Number(quantity)
            ).toString(),
          })
          .where(
            and(
              eq(schema.products.id, existProductUnderStoreAndSupplier.id),
              eq(schema.products.supplierId, existSupplierUnderStore.id),
              eq(schema.customers.storeId, existStoreUnderUser.id),
            ),
          )
          .returning();

        if (!updatedProductQuantity) {
          trx.rollback();
          return sendResponse(false, null, "Failed to Update Product Quantity");
        }
      }

      //Supplier's total due bil update
      if (Number(due) > 0) {
        const [updatedSupplierTotalDue] = await trx
          .update(schema.suppliers)
          .set({
            totalDue: (
              Number(existSupplierUnderStore.totalDue) + Number(due)
            ).toString(),
          })
          .where(
            and(
              eq(schema.suppliers.id, existSupplierUnderStore.id),
              eq(schema.suppliers.storeId, existStoreUnderUser.id),
            ),
          )
          .returning();

        if (!updatedSupplierTotalDue) {
          trx.rollback();
          return sendResponse(
            false,
            null,
            "Failed to update Supplier total due!",
          );
        }
      }

      return sendResponse(true, newPurchase, "Product Purchase Successfull!");
    });
  } catch (e) {
    _log(e);
    return sendResponse(false, null, "Failed to purchase products", e);
  }
};

// TODO: RETURN PURCHASE

// Purchase Payment
const createPaidPurchaseBill = async (formValue: PurchaseProductPaidBill) => {
  try {
    const { storeId, supplierId, paidAmount, dateOfPaid } = formValue;
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByIdAndUserId(storeId, user.id);
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existSupplierUnderStore = await getSupplierByIdAndStoreId(
      supplierId,
      existStoreUnderUser.id,
    );

    if (!existSupplierUnderStore)
      return sendResponse(false, null, "Supplier not found under your store!");
    if (Number(existSupplierUnderStore.totalDue) < Number(paidAmount))
      return sendResponse(
        false,
        null,
        `Your paid amount is more than Supplier's total due amount!`,
      );

    const currentDate = new Date().setHours(23, 59, 59);

    const isEarlyPurchase = new Date(dateOfPaid).getTime() > currentDate;

    if (isEarlyPurchase)
      return sendResponse(
        false,
        null,
        "Purchase payment date should be today or before current time!",
      );

    return await db.transaction(async (trx) => {
      const [newPurchasePaidBill] = await trx
        .insert(schema.purchasePaidBills)
        .values({
          storeId: existStoreUnderUser.id,
          supplierId: existSupplierUnderStore.id,
          dateOfPaid,
          paidAmount,
        })
        .returning();

      if (!newPurchasePaidBill) {
        trx.rollback();
        return sendResponse(
          false,
          null,
          "Failed to create Purchase Payment bill!",
        );
      }

      // update supplier total due bill

      const [updatedSupplierTotalDue] = await trx
        .update(schema.suppliers)
        .set({
          totalDue: (
            Number(existSupplierUnderStore.totalDue) - Number(paidAmount)
          ).toString(),
        })
        .returning();

      if (!updatedSupplierTotalDue) {
        trx.rollback();
        return sendResponse(false, null, "Failed to reduce supplier total due!");
      }

      return sendResponse(
        true,
        newPurchasePaidBill,
        "Purchase payment created!",
      );
    });
  } catch (e) {
    _log(e);
    return sendResponse(
      false,
      null,
      "Failed to create Purchase Payment bill!",
      e,
    );
  }
};

// SALES OPERATION

const getSalesBySalesReferenceIdAndStoreAndCustomer = async (
  salesReferenceId: string,
  storeId: string,
  customerId: string,
) => {
  return await db.query.salesTable.findFirst({
    where: and(
      eq(schema.sales.salesReferenceId, salesReferenceId),
      eq(schema.sales.storeId, storeId),
      eq(schema.sales.customerId, customerId),
    ),
    with: {
      salesProducts: true,
    },
  });
};

const createSales = async ({
  items,
  salesInfo,
}: {
  salesInfo: SalesInsert;
  items: {
    productId: string;
    quantity: string;
    salesPrice: string;
  }[];
}) => {
  try {
    const { total, paid, due, salesDate, storeId, customerId } = salesInfo;
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByIdAndUserId(storeId, user.id);
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existCustomerUnderStore = await getCustomerByIdAndStoreId(
      customerId,
      existStoreUnderUser.id,
    );

    if (!existCustomerUnderStore)
      return sendResponse(false, null, "Supplier not found under your store!");

    const currentDate = new Date().setHours(23, 59, 59);

    const isEarlyPurchase = new Date(salesDate).getTime() > currentDate;

    if (isEarlyPurchase)
      return sendResponse(
        false,
        null,
        "Sales date should be today or before Current date!",
      );

    const totalPaid = paid ?? "0";

    if (Number(total) < Number(totalPaid))
      return sendResponse(false, null, "Paid amount is more than total amount");

    return await db.transaction(async (trx) => {
      //Create Purchase
      const [newSales] = await trx
        .insert(schema.sales)
        .values({
          due,
          total,
          salesDate,
          salesReferenceId: "",
          storeId: existStoreUnderUser.id,
          customerId: existCustomerUnderStore.id,
          paid: totalPaid,
        })
        .returning();

      if (!newSales) return sendResponse(false, null, "Failed to create Sales!");

      for (const { productId, salesPrice, quantity } of items) {
        const existProductUnderStore = await getProductByIdAndStoreId(
          productId,
          existStoreUnderUser.id,
        );

        if (!existProductUnderStore)
          return sendResponse(
            false,
            null,
            "Product Not Found Under Your Store!",
          );

        const [newSalesProduct] = await trx
          .insert(schema.salesProducts)
          .values({
            productId: existProductUnderStore.id,
            salesQuantity: quantity,
            salesId: newSales.id,
            salesPrice,
            quantity,
            storeId:"",
          })
          .returning();

        if (!newSalesProduct) {
          trx.rollback();
          return sendResponse(false, null, "Failed to insert Purchase Product");
        }

        const [updatedProductQuantity] = await trx
          .update(schema.products)
          .set({
            quantity: (
              Number(existProductUnderStore.quantity) - Number(quantity)
            ).toString(),
          })
          .returning();

        if (!updatedProductQuantity) {
          trx.rollback();
          return sendResponse(false, null, "Failed to Update Product Quantity");
        }
      }

      //Customer's total due bil update
      if (Number(due) > 0) {
        const [updatedCustomerTotalDue] = await trx
          .update(schema.customers)
          .set({
            totalDue: (
              Number(existCustomerUnderStore.totalDue) + Number(due)
            ).toString(),
          })
          .where(
            and(
              eq(schema.customers.id, existCustomerUnderStore.id),
              eq(schema.customers.storeId, existStoreUnderUser.id),
            ),
          )
          .returning();

        if (!updatedCustomerTotalDue) {
          trx.rollback();
          return sendResponse(
            false,
            null,
            "Failed to update Customer total due!",
          );
        }
      }

      return sendResponse(true, newSales, "Product sales Successfull!");
    });
  } catch (e) {
    _log(e);
    return sendResponse(false, null, "Failed to sales products", e);
  }
};

// sales Payment
const createPaidSalesBill = async (formValue: SalesProductPaidBillInsert) => {
  try {
    const { storeId, customerId, paidAmount, dateOfPaid } = formValue;
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByIdAndUserId(storeId, user.id);
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existCustomerUnderStore = await getCustomerByIdAndStoreId(
      customerId,
      existStoreUnderUser.id,
    );

    if (!existCustomerUnderStore)
      return sendResponse(false, null, "Customer not found under your store!");
    if (Number(existCustomerUnderStore.totalDue) < Number(paidAmount))
      return sendResponse(
        false,
        null,
        `Your paid amount is more than Customer's total due amount!`,
      );

    const currentDate = new Date().setHours(23, 59, 59);

    const isEarlyPurchase = new Date(dateOfPaid).getTime() > currentDate;

    if (isEarlyPurchase)
      return sendResponse(
        false,
        null,
        "Sales payment date should be today or before current time!",
      );

    return await db.transaction(async (trx) => {
      const [newSalesPaidBill] = await trx
        .insert(schema.salesPaidBills)
        .values({
          storeId: existStoreUnderUser.id,
          customerId: existCustomerUnderStore.id,
          dateOfPaid,
          paidAmount,
        })
        .returning();

      if (!newSalesPaidBill) {
        trx.rollback();
        return sendResponse(false, null, "Failed to create Sales Payment bill!");
      }

      // update supplier total due bill

      const [updatedCustomerTotalDue] = await trx
        .update(schema.customers)
        .set({
          totalDue: (
            Number(existCustomerUnderStore.totalDue) - Number(paidAmount)
          ).toString(),
        })
        .returning();

      if (!updatedCustomerTotalDue) {
        trx.rollback();
        return sendResponse(false, null, "Failed to Add customer total due!");
      }

      return sendResponse(true, newSalesPaidBill, "Sales payment created!");
    });
  } catch (e) {
    _log(e);
    return sendResponse(false, null, "Failed to create Sales Payment bill!", e);
  }
};

// RETURN SALES

const createSalesReturn = async (formValue: {
  customerId: string;
  storeId: string;
  salesReferenceId: string;
  dateOfReturn: Date;
  returnItems: {
    salesProductId: string;
    returnQuantity: string;
    productCondition: (typeof schema.productReturnType)[number];
  }[];
}) => {
  try {
    const { storeId, customerId, dateOfReturn, returnItems, salesReferenceId } =
      formValue;
    const user = await currentUser();

    if (!user) return sendResponse(false, null, "Unauthenticated User!");

    if (user.role !== "OWNER")
      return sendResponse(false, null, "Forbidden Access!");

    const existStoreUnderUser = await getStoreByIdAndUserId(storeId, user.id);
    if (!existStoreUnderUser)
      return sendResponse(false, null, "Unauthorized Access!");

    const existCustomerUnderStore = await getCustomerByIdAndStoreId(
      customerId,
      existStoreUnderUser.id,
    );

    if (!existCustomerUnderStore)
      return sendResponse(false, null, "Customer not found under your store!");

    const currentDate = new Date().setHours(23, 59, 59);

    const isEarlyReturn = new Date(dateOfReturn).getTime() > currentDate;

    if (isEarlyReturn)
      return sendResponse(
        false,
        null,
        "Sales Return payment date should be today or before current time!",
      );

    // check did store owner actually sales or not to that customer by sales reference ( invoice number)

    const existSalesUnderStoreToCustomer =
      await getSalesBySalesReferenceIdAndStoreAndCustomer(
        salesReferenceId,
        existStoreUnderUser.id,
        existCustomerUnderStore.id,
      );

    if (!existSalesUnderStoreToCustomer)
      return sendResponse(
        false,
        null,
        "Wrong Sales Reference (Invoice Number)!",
      );

    const s = await db.transaction(async (trx) => {
      // TODO: CREATE SALES RETURN
      const [newSalesReturn] = await trx
        .insert(schema.salesReturn)
        .values({
          storeId: existStoreUnderUser.id,
          customerId: existCustomerUnderStore.id,
          salesReferenceId: existSalesUnderStoreToCustomer.id,
          returnReferenceId: "",
          dateOfReturn,
        })
        .returning();

      if (!newSalesReturn) {
        trx.rollback();
        return sendResponse(false, null, "Failed to create sales return");
      }

      let returnCash = undefined;
      for (const {
        productCondition,
        returnQuantity,
        salesProductId,
      } of returnItems) {
        const existSalesProduct = await db.query.salesProductsTable.findFirst({
          where: and(
            eq(schema.salesProducts.id, salesProductId),
            eq(schema.salesProducts.salesId, existSalesUnderStoreToCustomer.id),
          ),
        });

        if (!existSalesProduct) {
          trx.rollback();
          return sendResponse(false, null, "Sales Product not found!");
        }

        if (Number(returnQuantity) > Number(existSalesProduct.salesQuantity)) {
          trx.rollback();
          return sendResponse(
            false,
            null,
            "Return quantity is more than sales quantity",
          );
        }

        const existProduct = await getProductByIdAndStoreId(
          existSalesProduct.productId,
          existStoreUnderUser.id,
        );

        if (!existProduct) {
          trx.rollback();
          return sendResponse(
            false,
            null,
            "Return product not founD in your store",
          );
        }

        // TODO: CREATE SALES RETURN PRODUCTS
        const [newSalesReturnProduct] = await trx
          .insert(schema.salesReturnProducts)
          .values({
            salesReturnId: newSalesReturn.id,
            salesProductId: existSalesProduct.id,
            productCondition,
            returnQuantity,
          })
          .returning();

        if (!newSalesReturnProduct) {
          trx.rollback();
          return sendResponse(
            false,
            null,
            "Failed to create sales return products",
          );
        }
        const totalReturnAmount =
          Number(returnQuantity) * Number(existSalesProduct.salesPrice);
        // TODO: UPDATE CUSTOMER TOTAL DUE

        if (Number(existCustomerUnderStore.totalDue) > 0) {
          const isLowCustomerTotalDue =
            Number(existCustomerUnderStore.totalDue) < totalReturnAmount;

          if (isLowCustomerTotalDue) {
            returnCash = returnCash
              ? returnCash +
                (totalReturnAmount - Number(existCustomerUnderStore.totalDue))
              : totalReturnAmount - Number(existCustomerUnderStore.totalDue);
          }

          const [updatedCustomerTotalDue] = await trx
            .update(schema.customers)
            .set({
              totalDue: (isLowCustomerTotalDue
                ? "0"
                : Number(existCustomerUnderStore.totalDue) - totalReturnAmount
              ).toString(),
            })
            .where(
              and(
                eq(schema.customers.id, existCustomerUnderStore.id),
                eq(schema.customers.storeId, existStoreUnderUser.id),
              ),
            )
            .returning();

          if (!updatedCustomerTotalDue) {
            trx.rollback();
            return sendResponse(
              false,
              null,
              "Failed to update customer total due",
            );
          }

          // CREATE SALES PAYMENT
          const [newSalesPaidBill] = await trx
            .insert(schema.salesPaidBills)
            .values({
              customerId: existCustomerUnderStore.id,
              storeId: existStoreUnderUser.id,
              dateOfPaid: dateOfReturn,
              paidAmount: isLowCustomerTotalDue
                ? existCustomerUnderStore.totalDue
                : totalReturnAmount.toString(),
            })
            .returning();
            
          if (!newSalesPaidBill) {
            trx.rollback();
            return sendResponse(
              false,
              null,
              "Failed to create sales payment during return items!",
            );
          }
        }

        // TODO: UPDATE PRODUCT QUANTITY
        const [updatedProductQuantity] = await trx
          .update(schema.products)
          .set({
            quantity: (
              Number(existProduct.quantity) + Number(returnQuantity)
            ).toString(),
          })
          .where(
            and(
              eq(schema.products.id, existProduct.id),
              eq(schema.products.storeId, existStoreUnderUser.id),
            ),
          )
          .returning();

        if (!updatedProductQuantity) {
          trx.rollback();
          return sendResponse(
            false,
            null,
            "Failed to update product return product quantity!",
          );
        }
      }

      return sendResponse(
        false,
        {
          newSalesReturn,
          returnCash,
        },
        "Product Sales Return Complete!",
      );
    });
  } catch (e) {
    _log(e);
    return sendResponse(false, null, "Failed to create customer sales return");
  }
};

