import { baseApi } from "./base-api";

const assignBankApi = baseApi.injectEndpoints({
    endpoints: build => ({
        assignBank: build.mutation({
            query: (data) => ({
                url: '/assign-bank',
                body: data,
                method: 'POST'
            })
        })
    })
})

export const { useAssignBankMutation } = assignBankApi