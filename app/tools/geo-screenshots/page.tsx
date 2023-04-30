import { PageHeader } from "@/components/page-header"

export default function ScreenshotsForDimensions() {
    return (
        <>
            <PageHeader
                heading="Geo Screenshots"
                subheading="Quickly test your website for popular screen dimensions."
            />
            <div className="mt-10 flex max-w-[700px] flex-col gap-10"></div>
        </>
    )
}
