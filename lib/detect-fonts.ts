import { getURLData } from "./geturldata"

export async function detectFonts(url: string) {
    const result = await getURLData(url)
    if (result && result.fonts && result.fonts.length > 0) {
        return result.fonts
    }

    return null
}