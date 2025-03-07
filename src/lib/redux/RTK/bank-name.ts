import { BankName, TransactionName } from "@prisma/client";
import { baseApi } from "./base-api";

export const bankNameApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBankNames: build.query<BankName[], undefined>({
            query: () => '/bank-name'
        }),
        createBankName: build.mutation<BankName, undefined>({
            query: (data) => ({
                url: '/bank-name',
                body: data,
                method: 'POST'
            })
        }),

        getAssignedBankNames: build.query<{
            success: boolean;
            message: string,
            data: {
                transactionName: TransactionName;
                assignedSourceBankNames: TransactionName[];
                assignedReceiveBankNames: TransactionName[];
            }
        }, string>({
            query: (transactionNameId) => `/transaction-name/${transactionNameId}`
        }),
    })
})

export const { useGetBankNamesQuery: useGetBankNames, useCreateBankNameMutation: useCreateBankName, useGetAssignedBankNamesQuery: useGetAssignedBankName } = bankNameApi