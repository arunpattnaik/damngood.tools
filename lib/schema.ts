import { z } from "zod"

export const GenerateScreenshotsRequestSchema = z.object({
    website: z.string().url(),
})
export type GenerateScreenshotsRequest = z.infer<
    typeof GenerateScreenshotsRequestSchema
>

export const PrivacyPolicyRequestSchema = z.object({
    companyName: z.optional(z.string()),
    productName: z.optional(z.string()),
    website: z.optional(z.string().url()).or(z.literal("")),
    email: z.optional(z.string().email()).or(z.literal("")),
    format: z.enum(["plain_text", "markdown", "html"]),
})
export type PrivacyPolicyRequest = z.infer<typeof PrivacyPolicyRequestSchema>

export const OpenGraphImageSchema = z.object({
    headline: z.string().min(1),
    subheadline: z.string().min(1),
})
export type OpenGraphImageRequest = z.infer<typeof OpenGraphImageSchema>

export type ScreenshotData = {
    url: string
    viewportWidth: number
    viewportHeight: number
    device: string
}