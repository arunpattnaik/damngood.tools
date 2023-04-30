import { PageHeader } from "@/components/page-header";

export default function ScreenshotsForDimensions() {
    return <>
        <PageHeader heading="Geo Screenshots" subheading="Quickly test your website for popular screen dimensions." />
        <div className="flex flex-col max-w-[700px] gap-10 mt-10"></div>
    </>;
}