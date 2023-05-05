export const screenshotExampleUrl = "https://example.com";

export type Screenshot = {
    url: string
    viewportWidth: number
    viewportHeight: number
    device: string
}

export type ScreenshotDevice = {
    name: string
    viewportWidth: number
    viewportHeight: number
    deviceScaleFactor: number
}

export const screenshotDevices: ScreenshotDevice[] = [
    {
        name: "Desktop",
        viewportWidth: 1920,
        viewportHeight: 1080,
        deviceScaleFactor: 1,
    },
    {
        name: "iPhone 13 Pro Max Landscape",
        viewportWidth: 926,
        viewportHeight: 428,
        deviceScaleFactor: 3,
    },

    {
        name: "Pixel 5 Landscape",
        viewportWidth: 851,
        viewportHeight: 393,
        deviceScaleFactor: 3,
    },
    {
        name: "Pixel 5",
        viewportWidth: 393,
        viewportHeight: 851,
        deviceScaleFactor: 3,
    },
    {
        name: "iPhone 13 Pro Max",
        viewportWidth: 428,
        viewportHeight: 926,
        deviceScaleFactor: 3,
    },
    {
        name: "iPhone X",
        viewportWidth: 375,
        viewportHeight: 812,
        deviceScaleFactor: 3,
    },
]
