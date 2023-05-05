import * as screenshotone from "screenshotone-api-sdk"

import { Screenshot, screenshotDevices, screenshotExampleUrl } from "./shared"

const globalForScreenshotOne = global as unknown as {
    screenshotoneClient: screenshotone.Client
}

if (
    process.env.SCREENSHOTONE_ACCESS_KEY === undefined ||
    process.env.SCREENSHOTONE_SECRET_KEY === undefined
) {
    throw new Error(
        `SCREENSHOTONE_ACCESS_KEY and SCREENSHOTONE_SECRET_KEY environment variables are required`
    )
}

const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY
const secretKey = process.env.SCREENSHOTONE_SECRET_KEY

const screenshotoneClient =
    globalForScreenshotOne.screenshotoneClient ||
    new screenshotone.Client(accessKey, secretKey)

if (process.env.NODE_ENV !== "production")
    globalForScreenshotOne.screenshotoneClient = screenshotoneClient

export function screenshotUrl(
    url: string,
    viewportWidth: number,
    viewportHeight: number,
    deviceScaleFactor: number
) {
    const cacheKey =
        url == screenshotExampleUrl
            ? "example"
            : new String(new Date().getTime()).toString()
    const cacheTtl = url == screenshotExampleUrl ? 2592000 : 14400;

    const options = screenshotone.TakeOptions.url(url)
        .blockChats(true)
        .blockCookieBanners(true)
        .blockAds(true)
        .cache(true)
        .blockBannersByHeuristics(false)
        .cacheKey(cacheKey)
        .cacheTtl(cacheTtl)
        .reducedMotion(true)
        .viewportWidth(viewportWidth)
        .viewportHeight(viewportHeight)
        .deviceScaleFactor(deviceScaleFactor)

    return screenshotoneClient.generateSignedTakeURL(options)
}

export async function generateExampleScreenshots(): Promise<Screenshot[]> {
    return await generateScreenshots(screenshotExampleUrl)
}

export async function generateScreenshots(url: string): Promise<Screenshot[]> {
    return screenshotDevices.map((d) => {
        return {
            url: screenshotUrl(
                url,
                d.viewportWidth,
                d.viewportHeight,
                d.deviceScaleFactor
            ),
            viewportWidth: d.viewportWidth,
            viewportHeight: d.viewportHeight,
            device: d.name,
        }
    })
}
