import { NextRequest, NextResponse } from 'next/server';

import { OpenGraphImageRequest, OpenGraphImageSchema} from '@/lib/schema';
import { generateOpenGraphImageTemplate } from '@/lib/og';

export async function POST(request: NextRequest) {
    try {
        const generateRequest = await request.json() as OpenGraphImageRequest;
        const result = await OpenGraphImageSchema.safeParseAsync(generateRequest);
        if (result.success) {
            const template = await generateOpenGraphImageTemplate(
                generateRequest.headline,
                generateRequest.subheadline,
            );

            return NextResponse.json({
                success: template != null,
                template
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