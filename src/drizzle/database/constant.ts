import { assignReceiveBankToTransactionNameDbTable, assignSourceBankToTransactionNameDbTable, bankAccountDbTable, transactionNameDbTable } from "../schema";

const expenseId = "1767e3d3-856f-45e5-8735-49f7b6314105"
const depositId = "233e4036-fc97-4fc5-9356-e92eec32c9ff"
const transferId = "28ce2f18-b933-4bdf-9ce4-233f5048f7ab"
const incomeId = "69fa0e81-8ed8-4fa9-bb05-b2fb558ce444"
const exchangeId = "a164d66a-9c17-4603-9818-c78d32444406"
const withdrawalId = "a31679ff-17c5-4147-b578-e80d3189595e"


const alrajhiId = "7e0b37c6-4562-40a8-9cdb-c2842b3cee75"
const cashId = "48790ae0-e08f-4731-baf4-ce1de0b501bc"
const stcpayId = "c1ae7bf1-e2ab-425d-8e62-eaa7da233727"
const mobilyPayId = "e1b3e884-d715-4c83-92a9-ae08ec71162f"





export const transactionNamesMock: Omit<typeof transactionNameDbTable.$inferInsert, 'managementSystemId'>[] = [
    {
        name: "INCOME",
        variant: "RECEIVE",
    },
    {
        name: "EXPENSE",
        variant: "SOURCE",
    },
    {
        name: "WITHDRAWAL",
        variant: "BOTH",
    },
    {
        name: "DEPOSIT",
        variant: "BOTH",
    },
    {
        name: "TRANSFER",
        variant: "BOTH",
    },
    {
        name: "EXCHANGE",
        variant: "BOTH",
    },
]

export const bankAccountsMock: Omit<typeof bankAccountDbTable.$inferInsert, 'managementSystemId'>[] = [
    {
        name: 'AL-RAJHI',
        balance: '1845'
    },
    {
        name: 'STC-PAY',
        balance: '80'
    },
    {
        name: 'MOBILE-PAY',
        balance: '2994'
    },
    {
        name: 'CASH',
        balance: '250'
    },
]

export const assignSourceMock: typeof assignSourceBankToTransactionNameDbTable.$inferInsert[] = [
    {
        transactionNameId: expenseId,
        sourceBankAccountId: alrajhiId
    },
    {
        transactionNameId: expenseId,
        sourceBankAccountId: stcpayId
    },
    {
        transactionNameId: expenseId,
        sourceBankAccountId: mobilyPayId
    },
    {
        transactionNameId: expenseId,
        sourceBankAccountId: cashId
    },
    {
        transactionNameId: depositId,
        sourceBankAccountId: cashId
    },
    {
        transactionNameId: withdrawalId,
        sourceBankAccountId: alrajhiId
    },
    {
        transactionNameId: withdrawalId,
        sourceBankAccountId: stcpayId
    },
    {
        transactionNameId: exchangeId,
        sourceBankAccountId: cashId
    },
    {
        transactionNameId: exchangeId,
        sourceBankAccountId: alrajhiId
    },
    {
        transactionNameId: exchangeId,
        sourceBankAccountId: stcpayId
    },
    {
        transactionNameId: exchangeId,
        sourceBankAccountId: mobilyPayId
    },
    {
        transactionNameId: transferId,
        sourceBankAccountId: mobilyPayId
    },
    {
        transactionNameId: transferId,
        sourceBankAccountId: stcpayId
    },
    {
        transactionNameId: transferId,
        sourceBankAccountId: alrajhiId
    },



]

export const assignReceiveMock: typeof assignReceiveBankToTransactionNameDbTable.$inferInsert[] = [
    {
        transactionNameId: incomeId,
        receiveBankAccountId: alrajhiId
    },
    {
        transactionNameId: incomeId,
        receiveBankAccountId: cashId
    },


    {
        transactionNameId: withdrawalId,
        receiveBankAccountId: cashId
    },


    {
        transactionNameId: depositId,
        receiveBankAccountId: alrajhiId
    },
    {
        transactionNameId: depositId,
        receiveBankAccountId: mobilyPayId
    },
    {
        transactionNameId: depositId,
        receiveBankAccountId: stcpayId
    },


    {
        transactionNameId: transferId,
        receiveBankAccountId: stcpayId
    },
    {
        transactionNameId: transferId,
        receiveBankAccountId: mobilyPayId
    },
    {
        transactionNameId: transferId,
        receiveBankAccountId: alrajhiId
    },



    {
        transactionNameId: exchangeId,
        receiveBankAccountId: cashId
    },
    {
        transactionNameId: exchangeId,
        receiveBankAccountId: alrajhiId
    },
    {
        transactionNameId: exchangeId,
        receiveBankAccountId: stcpayId
    },
    {
        transactionNameId: exchangeId,
        receiveBankAccountId: mobilyPayId
    },
]

export const transactionsMock = [
    {
        amount: 150.75,
        date: new Date("2025-02-01T10:00:00Z"),
        managementSystemId: "e0d5ecbc-8906-4c4a-9b79-e4335030e404",
        transactionNameId: "7e0b37c6-4562-40a8-9cdb-c2842b3cee75",
        title: "Office Supplies Purchase",
        description: "Bought printer ink and paper",
    },
    {
        amount: 2200.0,
        date: new Date("2025-02-02T12:30:00Z"),
        managementSystemId: "e0d5ecbc-8906-4c4a-9b79-e4335030e404",
        transactionNameId: "48790ae0-e08f-4731-baf4-ce1de0b501bc",
        title: "Monthly Rent Payment",
        description: "Paid rent for February",
    },
    {
        amount: 75.99,
        date: new Date("2025-02-03T09:45:00Z"),
        managementSystemId: "e0d5ecbc-8906-4c4a-9b79-e4335030e404",
        transactionNameId: "c1ae7bf1-e2ab-425d-8e62-eaa7da233727",
        title: "Team Lunch",
        description: "Lunch with development team",
    },
    {
        amount: 500.5,
        date: new Date("2025-02-04T15:20:00Z"),
        managementSystemId: "e0d5ecbc-8906-4c4a-9b79-e4335030e404",
        transactionNameId: "e1b3e884-d715-4c83-92a9-ae08ec71162f",
        title: "Software Subscription",
        description: "Paid for yearly SaaS subscription",
    },
    {
        amount: 95.0,
        date: new Date("2025-02-05T14:10:00Z"),
        managementSystemId: "e0d5ecbc-8906-4c4a-9b79-e4335030e404",
        transactionNameId: "7e0b37c6-4562-40a8-9cdb-c2842b3cee75",
        title: "Utility Bill Payment",
        description: "Electricity and water bill",
    },
    {
        amount: 1850.0,
        date: new Date("2025-02-06T11:05:00Z"),
        managementSystemId: "e0d5ecbc-8906-4c4a-9b79-e4335030e404",
        transactionNameId: "48790ae0-e08f-4731-baf4-ce1de0b501bc",
        title: "Office Rent",
        description: "Paid rent for March",
    },
    {
        amount: 300.0,
        date: new Date("2025-02-07T16:30:00Z"),
        managementSystemId: "e0d5ecbc-8906-4c4a-9b79-e4335030e404",
        transactionNameId: "c1ae7bf1-e2ab-425d-8e62-eaa7da233727",
        title: "Marketing Campaign",
        description: "Paid for social media ads",
    },
    {
        amount: 1299.99,
        date: new Date("2025-02-08T18:20:00Z"),
        managementSystemId: "e0d5ecbc-8906-4c4a-9b79-e4335030e404",
        transactionNameId: "e1b3e884-d715-4c83-92a9-ae08ec71162f",
        title: "New Laptop Purchase",
        description: "Bought a MacBook for the new developer",
    },
    {
        amount: 450.0,
        date: new Date("2025-02-09T08:15:00Z"),
        managementSystemId: "e0d5ecbc-8906-4c4a-9b79-e4335030e404",
        transactionNameId: "7e0b37c6-4562-40a8-9cdb-c2842b3cee75",
        title: "Software License Renewal",
        description: "Renewed Photoshop and Figma licenses",
    },
    {
        amount: 2000.0,
        date: new Date("2025-02-10T19:45:00Z"),
        managementSystemId: "e0d5ecbc-8906-4c4a-9b79-e4335030e404",
        transactionNameId: "48790ae0-e08f-4731-baf4-ce1de0b501bc",
        title: "Employee Salary Payment",
        description: "Paid salaries for February",
    },
    {
        amount: 620.0,
        date: new Date("2025-02-11T07:30:00Z"),
        managementSystemId: "e0d5ecbc-8906-4c4a-9b79-e4335030e404",
        transactionNameId: "c1ae7bf1-e2ab-425d-8e62-eaa7da233727",
        title: "Office Internet Bill",
        description: "Monthly payment for high-speed internet",
    },
    {
        amount: 75.5,
        date: new Date("2025-02-12T13:10:00Z"),
        managementSystemId: "e0d5ecbc-8906-4c4a-9b79-e4335030e404",
        transactionNameId: "e1b3e884-d715-4c83-92a9-ae08ec71162f",
        title: "Team Coffee Expense",
        description: "Paid for weekly coffee supplies",
    },
];
