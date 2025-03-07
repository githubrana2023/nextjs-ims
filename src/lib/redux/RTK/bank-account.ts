import { baseApi } from "./base-api";

const bankAccountApi = baseApi.injectEndpoints({
    endpoints: build => ({
        createBankAccount: build.mutation({
            query: (data) => ({
                url: '/bank-accounts',
                body: data,
                method: 'POST',
            })
        }),
        getBankAccountsFieldsIdNameByManagementSystemId: build.query({
            query: (managementSystemId) => `/${managementSystemId}/bank-accounts`
        })
    })
})

export const {
    useCreateBankAccountMutation: useCreateBankAccount,
    useGetBankAccountsFieldsIdNameByManagementSystemIdQuery: useGetBankAccountsFieldsIdNameByManagementSystemId
} = bankAccountApi