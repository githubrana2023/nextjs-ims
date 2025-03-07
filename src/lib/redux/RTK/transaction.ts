import { baseApi } from "./base-api";

const transactionApi = baseApi.injectEndpoints({
    endpoints: build => ({
        createTransaction: build.mutation({
            query: (data) => ({
                url: '/transaction',
                body: data,
                method: 'POST',
            })
        })
    })
})

export const { useCreateTransactionMutation: useCreateTransaction } = transactionApi