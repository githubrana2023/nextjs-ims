import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"

export const productReturnType = ['Expired','Damage','Good'] as const

// User Table
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 50 }).default("OWNER"),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// Store Table relation 
export const usersRelation = relations(users, ({
    many
}) => ({
    stores: many(stores),
}))



// Store Table
export const stores = pgTable("stores", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    storeCode: varchar("store_code", { length: 50 }).notNull().unique(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
    isDeleted:boolean('is_deleted').notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Store Table relation 
export const storesRelation = relations(stores, ({
    one,
    many
}) => ({
    store: one(users, {
        fields: [stores.userId],
        references:[users.id]
    }),
    suppliers:many(suppliers),
    customers:many(customers),
    products:many(products),
    productCategories:many(productCategories),
    sales:many(sales),
    purchases:many(purchases),
}))


// Customer Table
export const customers = pgTable("customers", {
    id: uuid("id").primaryKey().defaultRandom(),
    storeId: uuid("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull().unique(),
    nid: varchar("nid", { length: 50 }).unique(),
    totalDue: numeric("total_due", { precision: 10, scale: 2 }).notNull(),
    isDeleted: boolean('is_deleted').notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Store Table relation 
export const customersRelation = relations(customers, ({
    one,
    many
}) => ({
    store: one(stores, {
        fields: [customers.storeId],
        references: [stores.id]
    }),
    purchases: many(sales),
}))


// Supplier Table
export const suppliers = pgTable("suppliers", {
    id: uuid("id").primaryKey().defaultRandom(),
    storeId: uuid("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull().unique(),
    supplierCode: varchar("supplier_code", { length: 50 }).notNull().unique(),
    totalDue: numeric("total_due", { precision: 10, scale: 2 }).notNull(),
    isDeleted: boolean('is_deleted').notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Supplier Table relation 
export const suppliersRelation = relations(suppliers, ({
    one,
    many
}) => ({
    store: one(stores, {
        fields: [suppliers.storeId],
        references: [stores.id]
    }),
    sales: many(purchases),
    salesMans: many(salesMans),
}))

// SalesMan Table
export const salesMans = pgTable("sales_mans", {
    id: uuid("id").primaryKey().defaultRandom(),
    supplierId: uuid("supplier_id").notNull().references(() => suppliers.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull().unique(),
    nid: varchar("nid", { length: 50 }).unique(),
    email: varchar("email", { length: 255 }).unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// SalesMan Table relation 
export const salesMansRelation = relations(salesMans, ({
    one,
    many
}) => ({
    supplier: one(suppliers, {
        fields: [salesMans.supplierId],
        references: [suppliers.id]
    }),
}))

// Product Category Table
export const productCategories = pgTable("product_categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    storeId: uuid("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull().unique(),
    description: varchar("description", { length: 500 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// SalesMan Table relation 
export const productCategoriesRelation = relations(productCategories, ({
    one,
    many
}) => ({
    store:one(stores,{
        fields:[productCategories.storeId],
        references:[stores.id],
    }),
    products:many(products)
}))

// Product Table
export const products = pgTable("products", {
    id: uuid("id").primaryKey().defaultRandom(),
    supplierId: uuid("supplier_id").notNull().references(() => suppliers.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id").notNull().references(() => productCategories.id, { onDelete: "cascade" }),
    sku: varchar("sku", { length: 50 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 }),
    quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Product Table relation 
export const productsRelation = relations(products, ({
    one,
    many
}) => ({
    supplier: one(suppliers, {
        fields: [products.supplierId],
        references: [suppliers.id]
    }),
    store: one(stores, {
        fields: [products.storeId],
        references: [stores.id]
    }),
    productCategory: one(productCategories, {
        fields: [products.categoryId],
        references: [productCategories.id]
    }),
    salesProducts:many(salesProducts),
    purchaseProducts:many(purchaseProducts),
    assignProductPackings:many(assignProductPackings)
}))

// Assign Product Packing Table
export const assignProductPackings = pgTable("assign_product_packings", {
    id: uuid("id").primaryKey().defaultRandom(),
    productPakingId: uuid("product_paking_id").notNull().references(() => productPackings.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Product Table relation 
export const assignProductPackingsRelation = relations(assignProductPackings, ({
    one,
    many
}) => ({
   productPacking:one(productPackings,{
    fields:[assignProductPackings.productPakingId],
    references:[productPackings.id]
   }),
   product:one(products,{
       fields: [assignProductPackings.productId],
    references:[products.id]
   }),

}))


// Product Packing Table
export const productPackings = pgTable("product_packings", {
    id: uuid("id").primaryKey().defaultRandom(),
    unit: varchar("unit", { length: 50 }).notNull(),
    packing: numeric("packing", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// Product Table relation 
export const productPackingsRelation = relations(productPackings, ({
    one,
    many
}) => ({
    assignProductPackings:many(assignProductPackings)
}))

// Purchase Table
export const purchases = pgTable("purchases", {
    id: uuid("id").primaryKey().defaultRandom(),
    supplierId: uuid("supplier_id").notNull().references(() => suppliers.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
    purchaseReferenceId: text('purchase_reference_id').notNull().unique(),
    purchaseDate: timestamp("purchase_date").notNull(),
    total: numeric("total", { precision: 10, scale: 2 }).notNull(),
    paid: numeric("paid", { precision: 10, scale: 2 }).notNull(),
    due: numeric("due", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Purchase Table Relation
export const purchasesRelation = relations(purchases,({one,many})=>({
    purchaseProducts : many(purchaseProducts)
}))


// Purchase Product Table
export const purchaseProducts = pgTable("purchase_products", {
    id: uuid("id").primaryKey().defaultRandom(),
    purchaseId: uuid("purchase_id").notNull().references(() => purchases.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
    purchasePrice: numeric("purchase_price", { precision: 10, scale: 2 }).notNull(),
    isReturned: boolean('is_returned').notNull().default(false),
    returnDate: timestamp('return_date'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Purchase Paid Bill Table
export const purchasePaidBills = pgTable("purchase_paid_bills", {
    id: uuid("id").primaryKey().defaultRandom(),
    supplierId: uuid("supplier_id").notNull().references(() => suppliers.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
    paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).notNull(),
    dateOfPaid: timestamp("date_of_paid").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



// Sales Table
export const sales = pgTable("sales", {
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
    salesReferenceId: text('sales_reference_id').notNull().unique(),
    salesDate: timestamp("sales_date").notNull(),
    total: numeric("total", { precision: 10, scale: 2 }).notNull(),
    paid: numeric("paid", { precision: 10, scale: 2 }).notNull(),
    due: numeric("due", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const salesRelations = relations(sales,({one,many})=>({
    salesProducts: many(salesProducts)
}))

// Sales Product Table
export const salesProducts = pgTable("sales_products", {
    id: uuid("id").primaryKey().defaultRandom(),
    storeId: uuid("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
    salesId: uuid("sales_id").notNull().references(() => sales.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    salesQuantity: numeric("sales_quantity", { precision: 10, scale: 2 }).notNull(),
    salesPrice: numeric("sales_price", { precision: 10, scale: 2 }).notNull(),
    isReturned:boolean('is_returned').notNull().default(false),
    returnDate:timestamp('return_date'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Sales Paid Bill Table
export const salesPaidBills = pgTable("sales_paid_bills", {
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
    paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).notNull(),
    dateOfPaid: timestamp("date_of_paid").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const salesReturn = pgTable('sales_return',{
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
    salesReferenceId:text('sales_reference_id').notNull(),
    dateOfReturn: timestamp('date_of_return').notNull(),
    returnReferenceId:text('return_reference_id').notNull().unique(),
    createdAt:timestamp('create_at').notNull().defaultNow(),
    updatedAt:timestamp('updated_at').notNull().$defaultFn(()=>new Date()),
})



export const salesReturnProducts = pgTable('sales_return_products',{
    id: uuid("id").primaryKey().defaultRandom(),
    salesReturnId:uuid('sales_return_id').notNull(),
    salesProductId:uuid('salesProductId').notNull(),
    returnQuantity: numeric("return_quantity", { precision: 10, scale: 2 }).notNull(),
    productCondition:text('product_condition',{enum:productReturnType}).notNull(),
    createdAt:timestamp('create_at').notNull().defaultNow(),
    updatedAt:timestamp('updated_at').notNull().$defaultFn(()=>new Date()),
})



// Expense Table
export const expenses = pgTable("expenses", {
    id: uuid("id").primaryKey().defaultRandom(),
    expenseCategoryId: uuid("expense_category_id").notNull().references(() => expenseCategories.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 }),
    expenseDate: timestamp("expense_date").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Expense Category Table
export const expenseCategories = pgTable("expense_categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    storeId: uuid("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull().unique(),
    description: varchar("description", { length: 500 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User Role Enum
export const UserRole = {
    ADMIN: "ADMIN",
    OWNER: "OWNER",
} as const;

