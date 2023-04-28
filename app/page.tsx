import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Aperture, FileCog2, Flame, Image } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function IndexPage() {
  const tools = [
    {
      name: 'Privacy Policy',
      description: 'Generate privacy policy in a few seconds according to your preferences.',
      icon: <FileCog2 />,
      link: '/privacy-policy-generator'
    },
    {
      name: 'Open Graph Image',
      description: 'Generate a simple Open Graph image HTML and grab the HTML code in a few seconds.',
      icon: <Image />,
      link: '/privacy-policy-generator'
    },
    {
      name: 'Screenshots',
      description: 'Quickly test your site for popular screen dimensions.',
      icon: <Aperture />,
      link: '/privacy-policy-generator'
    }
  ]

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Oh, these damn good tools
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Easy-to-use, fun tools—free (and open-source).
        </p>
      </div>
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
    </section>
  )
}
