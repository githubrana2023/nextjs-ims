import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";


type ParamsKeyType = 'query' | 'page' | 'limit' | 'select'

type RemoveSameValue = 'remove-same-query-value' | `don't-remove-same-query-value`




export const useSetParams = (isRemoveSameValue: RemoveSameValue = 'remove-same-query-value') => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const setQueryParams = (queryKey: string, queryValue: string | undefined | null) => {

        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [queryKey]: queryValue,
        };

        if (current[queryKey] === queryValue && isRemoveSameValue === 'remove-same-query-value') {
            query[queryKey] = null;
        }

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            {
                skipNull: true,
            }
        );

        router.push(url);
    }
    return [setQueryParams, searchParams] as const
}