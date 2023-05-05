import { UrlDataFont } from "./shared";

if (
    !process.env.GETURLDATA_ACCESS_KEY
) {
    throw new Error(
        `GETURLDATA_ACCESS_KEY environment variable is required`
    )
}

const accessKey = process.env.GETURLDATA_ACCESS_KEY;

export type UrlData = {
    meta?: {
        title?: string
        description?: string
    },
    fonts?: UrlDataFont[] 
    openGraph?: {
        title?: string
        description?: string
        image?: string
        url?: string
        type?: string
    },
    technologies?: {
        slug: string,
        name: string,
        confidence: number
    }[]
}

export async function getURLData(url: string) {
    const options = {
        'access_key': accessKey,
        'url': url,
    };
    const response = await fetch(`https://api.geturldata.com/v1/get?${new URLSearchParams(options).toString()}`, {
        method: 'GET'   
    });
    if (response.ok) {
        return await response.json() as UrlData;
    }

    return null;
}