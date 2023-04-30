import { cached } from "./cache";
import { openAIApi } from "./openai";

const generatePrompt = (format: string, website?: string, companyName?: string, productName?: string, email?: string) => {
    const requirements: string[] = [];
    const keyParts: string[] = [];
    if (website && website.length > 0) {
        keyParts.push('website');
        requirements.push('That relates to the <website> website');
    }
    if (companyName && companyName.length > 0) {
        keyParts.push('company_name');
        requirements.push('For company with the <companyName> name');
    }
    if (productName && productName.length > 0) {
        keyParts.push('product_name');
        requirements.push('For product with the <productName> name');
    }
    if (email && email.length > 0) {
        keyParts.push('email');
        requirements.push('In case of any questions, the <email> email address should be specified');
    }

    const requireCleanText = 'Start right away from the privacy policy without any opening and clarifying sentences. Generate just the privacy policy text. This privacy policy was last updated on <date>.';
    const keepTemplateVariables = 'Any text in <> should be treated as template variables.';

    keyParts.sort();
    const key = ['privacy_policy', format, ...keyParts].join('_');

    return [key, `Generate a privacy policy${requirements.length > 0 ? ' template' : ''} in the ${format} format${requirements.length > 0 ? ` that satisfies the following requirements: ${requirements.join(";\n")}` : '.'} ${requireCleanText} ${requirements.length > 0 ? keepTemplateVariables : ''}`];
}

const replaceVariables = (text: string, website?: string, companyName?: string, productName?: string, email?: string) => {
    if (text.length == 0) {
        return text;
    }

    let t = text;
    if (website) {
        t = t.replaceAll('<website>', website);
    }
    if (email) {
        t = t.replaceAll('<email>', email);
    }
    if (productName) {
        t = t.replaceAll('<productName>', productName);
    }
    if (companyName) {
        t = t.replaceAll('<companyName>', companyName);
    }

    t = t.replaceAll('<date>', new Date().toLocaleDateString());

    return t
}

const askOpenAIApi = async (prompt: string) => {
    const response = await openAIApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: "user", content: prompt }
        ]
    });

    for (const choice of response.data.choices) {
        if (choice.message?.content && choice.message.content.length > 0 && choice.finish_reason == "stop") {
            return choice?.message.content;
        }
    }

    return null;
}

export const generatePrivacyPolicy = async (format: string, website?: string, companyName?: string, productName?: string, email?: string) => {
    try {
        const [promptKey, prompt] = generatePrompt(format, website, companyName, productName, email);

        const privacyPolicy = await cached(promptKey, async () => await askOpenAIApi(prompt));
        if (privacyPolicy) {
            return replaceVariables(privacyPolicy, website, companyName, productName, email);
        }

        return null;
    } catch (error) {
        console.log('Failed to generate privacy policy via the OpenAI API', error);

        return null;
    }
}