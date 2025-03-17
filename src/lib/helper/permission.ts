
export type Actions = keyof typeof actions
export type Role = keyof typeof role
export type Resource = keyof typeof resourse
export type Permision = {
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

const permission: Permision = {
    admin: ['create:store', 'read:store', 'update:store', 'delete:store'],
    customer: ['read:sales'],
    owner: [],
    superAdmin: [],
    supplier: [],
    user: [],
}

export const hasPermission = (role: Role, actions: Actions, resourse: Resource) => {

    return permission[role].includes(`${actions}:${resourse}`)
}
