import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { FileCog2, Image } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function IndexPage() {
  const tools = [
    {
      name: 'Privacy Policy Generator',
      description: 'Generate privacy policy in a few seconds according to your preferences.',
      icon: <FileCog2 />,
      link: '/privacy-policy-generator'
    },
    {
      name: 'Open Graph Image Generator',
      description: 'Generate simple Open Graph image and grab the HTML code in a few seconds.',
      icon: <Image />,
      link: '/privacy-policy-generator'
    },
    {
      name: 'Screenshots',
      description: 'Generate screenshots in popular screen dimensions for your site.',
      icon: <Image />,
      link: '/privacy-policy-generator'
    }
  ]

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Oh, these good tools
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Easy-to-use, fun tools—free (and open-source).
        </p>
      </div>
      <div className="flex flex-col gap-4 max-w-[700px] mt-10">
        {tools.map((tool, idx) =>
          <div key={idx}>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={buttonVariants({ variant: "link", size: "lg" })}
            >
              {tool.icon}
              <span className="ml-2">
                {tool.name}
              </span>
            </Link>
            <p className="text-muted-foreground ml-8 mt-2">
              {tool.description}
            </p>
            <Separator className="mt-4" />
          </div>
        )}
      </div>
    </section>
  )
}
