"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Info, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"

import { getRandomFunFactAboutFonts } from "@/lib/font-fun-facts"
import { DetectFontsRequest, DetectFontsRequestSchema } from "@/lib/schema"
import { UrlDataFont } from "@/lib/shared"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

export function RandomFunFact() {
    const [funFact, setFunFact] = useState<string | null>(null)

    useEffect(() => {
        getRandomFunFactAboutFonts()
            .then((fact) => {
                setFunFact(fact)
            })
            .catch(console.error)
    })

    return (
        <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Did you know that?</AlertTitle>
            <AlertDescription>
                {funFact && funFact.length > 0 ? (
                    funFact
                ) : (
                    <div className="flex">
                        <div className="mt-4 flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    </div>
                )}
            </AlertDescription>
        </Alert>
    )
}

export function Fonts() {
    const { toast } = useToast()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DetectFontsRequest>({
        resolver: zodResolver(DetectFontsRequestSchema),
    })

    const [detecting, setDetecting] = useState<boolean>(false)
    const [fonts, setFonts] = useState<UrlDataFont[]>([])

    const onSubmit = async (data: DetectFontsRequest) => {
        setDetecting(true)

        try {
            const response = await fetch("/tools/detect-fonts/api", {
                method: "POST",
                body: JSON.stringify(data),
            })
            setDetecting(false)

            if (response.ok) {
                const result = (await response.json()) as {
                    fonts?: UrlDataFont[]
                }

                if (result.fonts && result.fonts.length > 0) {
                    return setFonts(result.fonts)
                }
            }

            throw new Error("Failed to detect fonts")
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }

        setDetecting(false)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex max-w-[250px] flex-col gap-5 md:col-span-1"
            >
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="website">Any URL</Label>
                    <Input
                        type="url"
                        id="website"
                        placeholder="https://example.com"
                        {...register("url")}
                    />
                    {errors.url && errors.url?.message && (
                        <p className="text-sm text-destructive">
                            {errors.url?.message}
                        </p>
                    )}
                </div>
                <Button type="submit" disabled={detecting}>
                    {detecting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Detect fonts"
                    )}
                </Button>
            </form>
            <div className="mt-10 max-w-[700px]">
                {fonts.length > 0 ? (
                    <div>
                        <h2 className="text-xl font-extrabold leading-tight tracking-tighter md:text-2xl lg:text-4xl">
                            Detected fonts
                        </h2>
                        <p className="text-md text-muted-foreground">
                            A font family, fallbacks, and what HTML tags it
                            applies to on the specified site.
                        </p>
                        <div className="mt-4 flex flex-col gap-4">
                            {fonts.map((f, i) => (
                                <div key={f.first + i}>
                                    <h3 className="text-lg font-semibold">
                                        {f.first}
                                    </h3>
                                    {f.fallback.length > 0 && (
                                        <div className="ml-4">
                                            <span className="text-muted-foreground">
                                                Fallback fonts:
                                            </span>{" "}
                                            {f.fallback.join(", ")}
                                        </div>
                                    )}
                                    {f.elements.length > 0 && (
                                        <div className="ml-4">
                                            <span className="text-muted-foreground">
                                                HTML tags:
                                            </span>{" "}
                                            {f.elements.join(", ")}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <RandomFunFact />
                )}
            </div>
        </div>
    )
}
