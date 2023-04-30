import { Metadata } from "next"
import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PageHeader } from "@/components/page-header"

import { PrivacyPolicyForm } from "./PrivacyPolicyForm"

export const metadata: Metadata = {
    title: "Privacy Policy Generator",
    description:
        "Generate a privacy policy in a few seconds according to your preferences.",
}

export default function PrivacyPolicyGenerator() {
    return (
        <>
            <PageHeader
                heading="Privacy Policy Generator"
                subheading="Generate a privacy policy in a few seconds according to your preferences."
            />
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Attention</AlertTitle>
                <AlertDescription>
                    <p>
                        In no way should the generated privacy policy be treated
                        as a legal document. The generated privacy policy is
                        provided &quot;as is&quot; and without warranty of any
                        kind. In no way DamnGood.Tools shall be liable for any
                        claim, damages, or other liability. Use it at your own
                        risk. And Make sure to get legal advice from legal
                        professionals.
                    </p>
                    <p>
                        The information you enter is not collected or stored
                        anywhere.
                    </p>
                </AlertDescription>
            </Alert>
            <PrivacyPolicyForm />
        </>
    )
}
