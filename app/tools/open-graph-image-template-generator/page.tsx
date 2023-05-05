import { PageHeader } from "@/components/page-header"
import { GeneratorForm } from "./GeneratorForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Open Graph image generator",
    description:
        "Generate a simple Open Graph image HTML template in seconds. And shamelessly steal the code.",
}

export default function OpenGraphImages() {
    return (
        <>
            <PageHeader
                heading="Open Graph image generator"
                subheading="Generate a simple Open Graph image HTML template in seconds. And shamelessly steal the code."
            />
            <GeneratorForm />
        </>
    )
}
