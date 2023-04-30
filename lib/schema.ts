import { z } from "zod";

export const PrivacyPolicyRequestSchema = z.object({
    companyName: z.optional(z.string()),
    productName: z.optional(z.string()),
    website: z.optional(z.string().url()).or(z.literal('')),
    email: z.optional(z.string().email()).or(z.literal('')),
    format: z.enum(["plain_text", "markdown", "html"]),
})

export type PrivacyPolicyRequest = z.infer<typeof PrivacyPolicyRequestSchema>;