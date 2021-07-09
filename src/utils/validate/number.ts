export function isNumeric(val: string): boolean {
    return /^\d+(\.\d+)?$/.test(val)
}

export function isNaN(val: number): val is typeof NaN{
    if (Number.isNaN) {
        return Number.isNaN(val);
    }
    return val !== val
}