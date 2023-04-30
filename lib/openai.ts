import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
});

export const openAIApi = new OpenAIApi(configuration);
