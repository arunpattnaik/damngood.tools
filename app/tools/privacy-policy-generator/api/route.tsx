import { NextRequest, NextResponse } from 'next/server';

import { generatePrivacyPolicy } from '@/lib/privacy';
import { PrivacyPolicyRequest, PrivacyPolicyRequestSchema } from '@/lib/schema';

export async function POST(request: NextRequest) {
    try {
        const generateRequest = await request.json() as PrivacyPolicyRequest;
        const result = await PrivacyPolicyRequestSchema.safeParseAsync(generateRequest);
        if (result.success) {
            const privacyPolicy = await generatePrivacyPolicy(
                generateRequest.format,
                generateRequest.website,
                generateRequest.companyName,
                generateRequest.productName,
                generateRequest.email
            );

            return NextResponse.json({
                success: privacyPolicy != null,
                privacyPolicy
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