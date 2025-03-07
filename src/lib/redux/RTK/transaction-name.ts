import { TransactionName } from "@prisma/client";
import { baseApi } from "./base-api";

export const transactionNameApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTransactionNames: build.query<TransactionName[], undefined>({
            query: () => '/transaction-name'
        }),
        createTransactionName: build.mutation<TransactionName, undefined>({
            query: (data) => ({
                url: '/transaction-name',
                body: data,
                method: 'POST'
            })
        }),
        getTransactionName: build.query<TransactionName, string>({
            query: (id) => `/transaction-name/${id}`
        })

        // getAssignedTransactionNames: build.query<{
        //     success: boolean;
        //     message: string,
        //     data: {
        //         transactionName: TransactionName;
        //         assignedTransactionNames: TransactionName[]
        //     }
        // }, string>({
        //     query: (transactionNameId) => `transaction-name/${transactionNameId}`
        // }),
    })
})

export const { useGetTransactionNamesQuery: useGetTransactionNames, useCreateTransactionNameMutation: useCreateTransactionName, useGetTransactionNameQuery: useGetTransactionName } = transactionNameApi