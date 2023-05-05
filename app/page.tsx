import Link from "next/link"
import { Aperture, FileCog2, Globe, Image } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/page-header"

export default function IndexPage() {
    const tools = [
        {
            name: "Privacy Policy",
            description:
                "Generate privacy policy in a few seconds according to your preferences.",
            icon: <FileCog2 />,
            link: "/tools/privacy-policy-generator",
        },
        // {
        //     name: "Open Graph Image HTML Template",
        //     description:
        //         "Generate a simple Open Graph image HTML template in seconds. And steal the code.",
        //     icon: <Image />,
        //     link: "/tools/open-graph-image-template-generator",
        // },
        {
            name: "Screenshots",
            description:
                "Quickly test your website for popular screen dimensions.",
            icon: <Aperture />,
            link: "/tools/screenshots-for-dimensions",
        },
        // {
        //     name: "Geo Screenshots",
        //     description:
        //         "Quickly test how your website looks from different world locations.",
        //     icon: <Globe />,
        //     link: "/tools/geo-screenshots",
        // },
    ]

    return (
        <>
            <PageHeader
                heading="Oh, these damn good tools"
                subheading="Easy-to-use, fun tools—free (and open-source)."
            />
            <div className="mt-10 flex max-w-[700px] flex-col gap-10">
                {tools.map((tool, idx) => (
                    <div key={idx}>
                        <Link
                            href={tool.link}
                            className="flex flex-row gap-2 text-primary"
                        >
                            {tool.icon}
                            <div className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
                                {tool.name}
                            </div>
                        </Link>
                        <p className="ml-8 mt-2 text-muted-foreground">
                            {tool.description}
                        </p>
                        <Separator className="mt-4" />
                    </div>
                ))}
            </div>
        </>
    )
}
