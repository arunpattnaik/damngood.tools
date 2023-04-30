import { Redis } from "@upstash/redis"

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required');
}

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export const cached = async (key: string, fetch: () => Promise<string|null>): Promise<string|null> => {
    let result = await redis.get<string>(key)
    if (result != null) {
        return result;
    }

    result = await fetch();
    if (result != null) {
        await redis.set(key, result);    
    }
    
    return result;
}
