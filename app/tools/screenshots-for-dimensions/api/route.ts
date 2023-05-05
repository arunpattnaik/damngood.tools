import { NextRequest, NextResponse } from 'next/server';

import { GenerateScreenshotsRequest, GenerateScreenshotsRequestSchema } from '@/lib/schema';
import { generateScreenshots } from '@/lib/screenshots';

export async function POST(request: NextRequest) {
    try {
        const generateRequest = await request.json() as GenerateScreenshotsRequest;
        const result = await GenerateScreenshotsRequestSchema.safeParseAsync(generateRequest);
        if (result.success) {
            const screenshots = await generateScreenshots(                
                generateRequest.website
            );

            return NextResponse.json({
                success: screenshots && screenshots?.length > 0,
                screenshots
            });
        }

        return NextResponse.json({
            success: false,
            message: result.error.message
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ success: false, message: 'Internal application error' }, { status: 500 });
    }
}