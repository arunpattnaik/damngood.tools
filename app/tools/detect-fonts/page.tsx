import { PageHeader } from "@/components/page-header"
import { Fonts } from "./Fonts"

export default async function ScreenshotsForDimensions() {    
    return (
        <>
            <PageHeader
                heading="Font detection and exploration"
                subheading="Quickly detect fonts used on any website and get links on how to install or download them."
            />                        
            <Fonts />
        </>
    )
}
