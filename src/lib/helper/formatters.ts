type PluralFormatterParams = {
    singular: string;
    plural: string;
    includeCount?: boolean;
}
export const pluralFormatter = (length: number, { singular, plural, includeCount = true }: PluralFormatterParams) => {
    const word = length <= 1 ? singular : plural

    return includeCount ? `${word} (${length < 0 ? 0 : length})` : word
}


export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})
