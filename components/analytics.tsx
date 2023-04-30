"use client"

import Script from "next/script"

export function Analytics() {
    if (process.env.NODE_ENV != "production") {
        return <></>;
    }
    
    return (
        <Script
            src="https://api.pirsch.io/pirsch.js"
            id="pirschjs"
            data-code="jp1OWaroOtY7Ba69N6thbsCYh3KzGnPr"
            strategy="afterInteractive"
        />
    )
}
