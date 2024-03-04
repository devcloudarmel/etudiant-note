import { type ClassValue, clsx } from "clsx"
import { formatDistanceToNowStrict } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formattedDate (from: Date) {
    return formatDistanceToNowStrict(from, { addSuffix: true  })
}
