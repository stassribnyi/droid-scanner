import { isAxiosError } from "axios"

export const formatError = (error: unknown, fallback = 'Something went wrong 😓'): string => {
    if (isAxiosError(error) || error instanceof Error) {
        return error.message
    }

    return fallback
} 