"use client"

import { Ref, forwardRef, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectProps } from "@radix-ui/react-select"
import { Clipboard, ClipboardCheck, Loader2 } from "lucide-react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Controller, useForm } from "react-hook-form"

import { PrivacyPolicyRequest, PrivacyPolicyRequestSchema } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const FormatSelect = forwardRef(
    (
        { ...props }: SelectProps & { forwardedRef: Ref<HTMLButtonElement> },
        forwardedRef: Ref<HTMLButtonElement>
    ) => {
        return (
            <Select {...props}>
                <SelectTrigger className="w-full" ref={forwardedRef}>
                    <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="plain_text">Plain text</SelectItem>
                    <SelectItem value="markdown">Markdown</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
            </Select>
        )
    }
)
FormatSelect.displayName = "FormatSelect"

export function PrivacyPolicyForm() {
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
    } = useForm<PrivacyPolicyRequest>({
        resolver: zodResolver(PrivacyPolicyRequestSchema),
    })

    const [privacyPolicy, setPrivacyPolicy] = useState<string | null>(null)
    const [generating, setGenerating] = useState<boolean>(false)

    const onSubmit = async (data: PrivacyPolicyRequest) => {
        setGenerating(true)

        try {
            const response = await fetch(
                "/tools/privacy-policy-generator/api",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            )
            setGenerating(false)

            if (response.ok) {
                const result = (await response.json()) as {
                    privacyPolicy: string | null
                }
                if (result.privacyPolicy) {
                    return setPrivacyPolicy(result.privacyPolicy)
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
                        <Label htmlFor="website">Your website</Label>
                        <Input
                            type="url"
                            id="website"
                            placeholder="https://example.com"
                            {...register("website")}
                        />
                        {errors.website && errors.website?.message && (
                            <p className="text-sm text-destructive">
                                {errors.website?.message}
                            </p>
                        )}
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="companyName">Company name</Label>
                        <Input
                            type="text"
                            id="companyName"
                            placeholder="Enter your company name"
                            {...register("companyName")}
                        />
                        {errors.companyName && errors.companyName?.message && (
                            <p className="text-sm text-destructive">
                                {errors.companyName?.message}
                            </p>
                        )}
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="productName">Product name</Label>
                        <Input
                            type="text"
                            id="productName"
                            placeholder="Enter your produce name"
                            {...register("productName")}
                        />
                        {errors.productName && errors.productName?.message && (
                            <p className="text-sm text-destructive">
                                {errors.productName?.message}
                            </p>
                        )}
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">
                            Contact in case of any questions
                        </Label>
                        <Input
                            type="text"
                            id="email"
                            placeholder="Enter email address"
                            {...register("email")}
                        />
                        {errors.email && errors.email?.message && (
                            <p className="text-sm text-destructive">
                                {errors.email?.message}
                            </p>
                        )}
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Controller
                            name="format"
                            control={control}
                            render={({
                                field: { onChange, value, ref, ...props },
                            }) => (
                                <FormatSelect
                                    onValueChange={onChange}
                                    value={value}
                                    forwardedRef={ref}
                                />
                            )}
                        />
                        {errors.format && errors.format?.message && (
                            <p className="text-sm text-destructive">
                                {errors.format?.message}
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
                        <Label htmlFor="privacyPolicy">
                            Your Privacy Policy
                        </Label>
                        <Textarea
                            className="h-full w-full"
                            rows={10}
                            placeholder="Once you enter and submit all the data, you will get your tailor-made privacy policy."
                            id="privacyPolicy"
                            defaultValue={!privacyPolicy ? "" : privacyPolicy}
                        />
                    </div>
                    <div className="flex w-full flex-row-reverse">
                        <CopyToClipboard
                            text={!privacyPolicy ? "" : privacyPolicy}
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
