"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Clipboard, ClipboardCheck, Loader2 } from "lucide-react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Controller, useForm } from "react-hook-form"

import { OpenGraphImageRequest, OpenGraphImageSchema } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function GeneratorForm() {
    const [copied, setCopied] = useState<boolean>(false)
    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false)
            }, 1000)
        }
    }, [copied])

    const { toast } = useToast()
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OpenGraphImageRequest>({
        resolver: zodResolver(OpenGraphImageSchema),
    })

    const [template, setPrivacyPolicy] = useState<string | null>(null)
    const [generating, setGenerating] = useState<boolean>(false)

    const onSubmit = async (data: OpenGraphImageRequest) => {
        setGenerating(true)

        try {
            const response = await fetch(
                "/tools/open-graph-image-template-generator/api",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            )
            setGenerating(false)

            if (response.ok) {
                const result = (await response.json()) as {
                    template: string | null
                }
                if (result.template) {
                    return setPrivacyPolicy(result.template)
                }
            }

            throw new Error("Failed to generate privacy policy")
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }

        setGenerating(false)
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 md:col-span-1"
                >
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="headline">Headline</Label>
                        <Input
                            type="url"
                            id="headline"
                            placeholder="Enter headline"
                            {...register("headline")}
                        />
                        {errors.headline && errors.headline?.message && (
                            <p className="text-sm text-destructive">
                                {errors.headline?.message}
                            </p>
                        )}
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="subheadline">Subheadline</Label>
                        <Input
                            type="text"
                            id="subheadline"
                            placeholder="Enter subheadline"
                            {...register("subheadline")}
                        />
                        {errors.subheadline && errors.subheadline?.message && (
                            <p className="text-sm text-destructive">
                                {errors.subheadline?.message}
                            </p>
                        )}
                    </div>
                    <Button type="submit" disabled={generating}>
                        {generating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Generate"
                        )}
                    </Button>
                </form>
                <div className="flex h-fit flex-col gap-5 md:col-span-2 md:h-full ">
                    <div className="flex h-full flex-col items-start justify-start gap-1.5">
                        <Label htmlFor="openGraphImageTemplate">
                            Your Open Graph Image template
                        </Label>
                        <Textarea
                            className="h-full w-full"
                            rows={10}
                            placeholder="Once you enter and submit all the data, you will get your tailor-made Open Graph Image template."
                            id="openGraphImageTemplate"
                            defaultValue={!template ? "" : template}
                        />
                    </div>
                    <div className="flex w-full flex-row-reverse">
                        <CopyToClipboard
                            text={!template ? "" : template}
                            onCopy={() => {
                                setCopied(true)
                            }}
                        >
                            <Button>
                                {copied ? (
                                    <ClipboardCheck className="mr-2 h-4 w-4" />
                                ) : (
                                    <Clipboard className="mr-2 h-4 w-4" />
                                )}{" "}
                                Copy
                            </Button>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
        </>
    )
}
