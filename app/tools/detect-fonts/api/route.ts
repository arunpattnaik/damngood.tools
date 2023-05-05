import { NextRequest, NextResponse } from "next/server"

import { detectFonts } from "@/lib/detect-fonts"
import { DetectFontsRequest, DetectFontsRequestSchema } from "@/lib/schema"

export async function POST(request: NextRequest) {
    try {
        const detectFontsRequest = (await request.json()) as DetectFontsRequest
        const result = await DetectFontsRequestSchema.safeParseAsync(
            detectFontsRequest
        )
        if (result.success) {
            const fonts = await detectFonts(detectFontsRequest.url)

            return NextResponse.json({
                success: fonts && fonts?.length > 0,
                fonts,
            })
        }

        return NextResponse.json({
            success: false,
            message: result.error.message,
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            { success: false, message: "Internal application error" },
            { status: 500 }
        )
    }
}
