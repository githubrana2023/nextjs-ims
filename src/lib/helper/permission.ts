
export type Actions = keyof typeof actions
export type Role = keyof typeof role
export type Resource = keyof typeof resourse
export type Permission = {
    [R in Role]: `${Actions}:${Resource}`[]
}

const role = {
    user: 'user',
    admin: 'admin',
    superAdmin: 'superAdmin',
    owner: 'owner',
    customer: 'customer',
    supplier: 'supplier',
} as const


const actions = {
    create: 'create',
    read: 'read',
    update: 'update',
    delete: 'delete',
} as const

const resourse = {
    store: 'store',
    customer: 'customer',
    supplier: 'supplier',
    salesMan: 'salesMan',
    productCategory: 'productCategory',
    product: 'product',
    purchase: 'purchase',
    purchaseProduct: 'purchaseProduct',
    purchaseDueBillPaid: 'purchaseDueBillPaid',
    sales: 'sales',
    salesProduct: 'salesProduct',
    salesDueBillCollect: 'salesDueBillCollect',
    assignPacking: 'assignPacking',
    packing: 'packing',
    expenseCategory: 'expenseCategory',
    expense: 'expense',
} as const

export const permissions: Permission = {
    user: [
      "read:store", "read:customer", "read:supplier", "read:salesMan", 
      "read:productCategory", "read:product", "read:purchase", "read:purchaseProduct",
      "read:purchaseDueBillPaid", "read:sales", "read:salesProduct", 
      "read:salesDueBillCollect", "read:assignPacking", "read:packing",
      "read:expenseCategory", "read:expense"
    ],
  
    admin: [
      "create:store", "read:store", "update:store", "delete:store",
      "create:customer", "read:customer", "update:customer", "delete:customer",
      "create:supplier", "read:supplier", "update:supplier", "delete:supplier",
      "create:salesMan", "read:salesMan", "update:salesMan", "delete:salesMan",
      "create:productCategory", "read:productCategory", "update:productCategory", "delete:productCategory",
      "create:product", "read:product", "update:product", "delete:product",
      "create:purchase", "read:purchase", "update:purchase", "delete:purchase",
      "create:purchaseProduct", "read:purchaseProduct", "update:purchaseProduct", "delete:purchaseProduct",
      "create:purchaseDueBillPaid", "read:purchaseDueBillPaid", "update:purchaseDueBillPaid", "delete:purchaseDueBillPaid",
      "create:sales", "read:sales", "update:sales", "delete:sales",
      "create:salesProduct", "read:salesProduct", "update:salesProduct", "delete:salesProduct",
      "create:salesDueBillCollect", "read:salesDueBillCollect", "update:salesDueBillCollect", "delete:salesDueBillCollect",
      "create:assignPacking", "read:assignPacking", "update:assignPacking", "delete:assignPacking",
      "create:packing", "read:packing", "update:packing", "delete:packing",
      "create:expenseCategory", "read:expenseCategory", "update:expenseCategory", "delete:expenseCategory",
      "create:expense", "read:expense", "update:expense", "delete:expense"
    ],
  
    superAdmin: [
      "create:store", "read:store", "update:store", "delete:store",
      "create:customer", "read:customer", "update:customer", "delete:customer",
      "create:supplier", "read:supplier", "update:supplier", "delete:supplier",
      "create:salesMan", "read:salesMan", "update:salesMan", "delete:salesMan",
      "create:productCategory", "read:productCategory", "update:productCategory", "delete:productCategory",
      "create:product", "read:product", "update:product", "delete:product",
      "create:purchase", "read:purchase", "update:purchase", "delete:purchase",
      "create:purchaseProduct", "read:purchaseProduct", "update:purchaseProduct", "delete:purchaseProduct",
      "create:purchaseDueBillPaid", "read:purchaseDueBillPaid", "update:purchaseDueBillPaid", "delete:purchaseDueBillPaid",
      "create:sales", "read:sales", "update:sales", "delete:sales",
      "create:salesProduct", "read:salesProduct", "update:salesProduct", "delete:salesProduct",
      "create:salesDueBillCollect", "read:salesDueBillCollect", "update:salesDueBillCollect", "delete:salesDueBillCollect",
      "create:assignPacking", "read:assignPacking", "update:assignPacking", "delete:assignPacking",
      "create:packing", "read:packing", "update:packing", "delete:packing",
      "create:expenseCategory", "read:expenseCategory", "update:expenseCategory", "delete:expenseCategory",
      "create:expense", "read:expense", "update:expense", "delete:expense"
    ],
  
    owner: [
      "create:store", "read:store", "update:store",
      "create:customer", "read:customer", "update:customer",
      "create:supplier", "read:supplier", "update:supplier",
      "create:salesMan", "read:salesMan", "update:salesMan",
      "create:productCategory", "read:productCategory", "update:productCategory",
      "create:product", "read:product", "update:product",
      "create:purchase", "read:purchase", "update:purchase",
      "create:purchaseProduct", "read:purchaseProduct", "update:purchaseProduct",
      "create:purchaseDueBillPaid", "read:purchaseDueBillPaid", "update:purchaseDueBillPaid",
      "create:sales", "read:sales", "update:sales",
      "create:salesProduct", "read:salesProduct", "update:salesProduct",
      "create:salesDueBillCollect", "read:salesDueBillCollect", "update:salesDueBillCollect",
      "create:assignPacking", "read:assignPacking", "update:assignPacking",
      "create:packing", "read:packing", "update:packing",
      "create:expenseCategory", "read:expenseCategory", "update:expenseCategory",
      "create:expense", "read:expense", "update:expense"
    ],
  
    customer: [
      "read:store", "read:product", "read:sales", "read:salesProduct",
      "read:salesDueBillCollect", "read:expense"
    ],
  
    supplier: [
      "read:store", "read:product", "read:purchase", "read:purchaseProduct",
      "read:purchaseDueBillPaid", "read:expense"
    ],
  };
  

export const hasPermission = (role: Role, actions: Actions, resourse: Resource) => {

    return permissions[role].includes(`${actions}:${resourse}`)
}
