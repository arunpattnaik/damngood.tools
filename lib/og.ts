import { cached } from "./cache"
import { openAIApi } from "./openai"

const askOpenAIApi = async (prompt: string) => {
    const response = await openAIApi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    })

    for (const choice of response.data.choices) {
        if (
            choice.message?.content &&
            choice.message.content.length > 0 &&
            choice.finish_reason == "stop"
        ) {
            return choice?.message.content
        }
    }

    return null
}

export async function generateOpenGraphImageTemplate(
    headline: string,
    subheadline: string
) {
    const prompt = `Generate HTML and CSS that can be used as an Open Graph image with the {{headline}} headline text and the {{subheadline}} subheadline text. #21314d and #cccdee as main colors. Add some gradients. Without meta tags like title and open graph  tags in head, but styles are OK. Return only HTML code one file without any explanations and comments. Only the code:`

    const template = await cached(
        "open_graph_image_html_template",
        async () => await askOpenAIApi(prompt)
    )

    return template
        ?.replaceAll("{{headline}}", headline)
        .replaceAll("{{subheadline}}", subheadline)
}
