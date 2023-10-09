
export function isStringNullOrEmpty(value: string | null | undefined): value is null {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value !== 'string') {
        return true;
    }

    if (value.trim().length === 0) {
        return true;
    }

    return false;
}
