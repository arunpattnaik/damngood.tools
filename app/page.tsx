import Link from "next/link"

import { Aperture, FileCog2, Globe, Image } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/page-header"

export default function IndexPage() {
  const tools = [
    {
      name: 'Privacy Policy',
      description: 'Generate privacy policy in a few seconds according to your preferences.',
      icon: <FileCog2 />,
      link: '/tools/privacy-policy-generator'
    },
    {
      name: 'Open Graph Images',
      description: 'Generate a simple Open Graph image HTML and grab the HTML code in a few seconds.',
      icon: <Image />,
      link: '/tools/open-graph-image-template-generator'
    },
    {
      name: 'Screenshots',
      description: 'Quickly test your website for popular screen dimensions.',
      icon: <Aperture />,
      link: '/tools/screenshots-for-dimensions'
    },
    {
      name: 'Geo Screenshots',
      description: 'Quickly test how your website looks from different world locations.',
      icon: <Globe />,
      link: '/tools/geo-screenshots'
    }
  ]

  return (<>
    <PageHeader heading="Oh, these damn good tools" subheading="Easy-to-use, fun tools—free (and open-source)." />
    <div className="flex flex-col max-w-[700px] gap-10 mt-10">
      {tools.map((tool, idx) =>
        <div key={idx}>
          <Link
            href={tool.link}
            className='text-primary flex flex-row gap-2'
          >
            {tool.icon}
            <div className="relative after:absolute after:bg-primary after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">{tool.name}</div>
          </Link>
          <p className="text-muted-foreground ml-8 mt-2">
            {tool.description}
          </p>
          <Separator className="mt-4" />
        </div>
      )}
    </div>
  </>
  )
}
