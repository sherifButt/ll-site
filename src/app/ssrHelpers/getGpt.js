
import { Configuration, OpenAIApi } from "openai"
import cooldown from './cooldown'; // Wait for a random time between min and max seconds

/**
 * Retrieves response from the OpenAI ChatGPT API based on the provided prompt.
 * @async
 * @function getGpt
 * @param {Array<Object>} prompt - The array of message objects to be sent as the prompt for the ChatGPT API.
 * @returns {Promise<GptResponse>} 
 *  - response: The generated response.
 *  - usage: An object containing :
 *      - prompt_tokens: representing the number of tokens used for the prompt.
 *      - ompletion_tokens: representing the number of tokens used for the completion.
 *      - total_token: representing the API usage information.
 * @throws {Error} If an error occurs while connecting to the ChatGPT API or processing the response.
 * @see {@link https://beta.openai.com/docs/api-reference/create-completion|OpenAI API Reference: Create Completion}
 * @author Sherif Butt
 * @example
 * const prompt = [
 *    { speaker: 'Human', text: 'Hello, who are you?' },
 *    { speaker: 'AI', text: 'I am an AI created by OpenAI. How can I help you today?' },
 *    { speaker: 'Human', text: 'I need help with my code.' },
 *    { speaker: 'AI', text: 'What kind of help do you need?' },
 *    { speaker: 'Human', text: 'I need help with a function.' },
 *    { speaker: 'AI', text: 'How can I help you with a function?' },
 * ]
 * const responses = await getGpt(prompt);
 * console.log(responses);
 * // {
 * //   response: 'function() {\n  return "Hello, world!";\n}',
 * //   usage: {
 * //     prompt_tokens: 32,
 * //     completion_tokens: 32,
 * //     total_tokens: 64
 * //   }
 * // }
 */

async function getGpt(prompt) {

    const initailResponse = {
        response: "",
        usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0
        }
    }

    // return initailResponse if prompt is empty
    if (!prompt) {
        return initailResponse;
    }
    console.log('ssss',process.env.OPENAI_API_KEY)
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('configuration', configuration);
    const openai = new OpenAIApi(configuration);
    console.log('openai', openai);
    
    for (let interval = 0; interval < process.env.GPT_COOLDOWN_MAX_TRIES; interval++) {
        console.log('prompt3', prompt);
        try {
            console.error('\x1b[32m%s\x1b[0m', 'Prompt:', prompt)

            if(interval>1) await cooldown(interval);

            const apiResponse = await openai.createChatCompletion({
                model: process.env.GPT_MODEL_ID,
                messages: prompt,
                temperature: 0,
                n: 1,
                // stop: '/n',
            });

            if (apiResponse.status === 200) {
                if (apiResponse.data.choices && apiResponse.data.choices.length > 0) {
                    const content = apiResponse.data.choices[0].message.content.trim();
                    console.log('\x1b[31m%s\x1b[0m', 'Response:', content)

                    initailResponse.response += content;
                    initailResponse.usage = apiResponse.data.usage;
                    return initailResponse;
                } else {
                    return initailResponse;
                }
            } else if ((apiResponse.status === 429 || apiResponse.status === 500 || apiResponse.status === 503) && process.env.GPT_PREVENT_TOO_MANY_REQUESTS === 'true' && interval < process.env.GPT_COOLDOWN_MAX_TRIES - 1) {
                console.log('\x1b[31m%s\x1b[0m', `#[${interval}/${process.env.GPT_COOLDOWN_MAX_TRIES}] - Too many requests to GPT API. Waiting for 5 seconds and trying again...`)
                // await cooldown();
                console.log('\x1b[31m%s\x1b[0m', `Traying again to get a apiResponse...`)

            } else {
                throw new Error(`API request failed: ${apiResponse.status} ${apiResponse.statusText}`);
            }

        } catch (error) {
            console.error(`Error connecting to ChatGPT API: ${error.message}`);
            if (error.response) {
                if (error.response.status === 401) {
                    throw new Error('Error generating code: Invalid API key.');
                } else {
                    throw new Error(`Error generating code: ${error.response.status} ${error.response.statusText}`);
                }
            } else if (error.request) {
                throw new Error('Error generating code: No response received from the server.');
            } else {
                throw new Error(`Error generating code: ${error.message}`);
            }
        }
    }
}
module.exports = getGpt;

/**
 * @typedef {Object} Usage
 * @property {number} Usage.prompt_tokens - The number of tokens used for the prompt.
 * @property {number} Usage.completion_tokens - The number of tokens used for the completion.
 * @property {number} Usage.total_tokens - The total number of tokens used.
 */

/**
 * @typedef {Object} GptResponse
 * @property {string} GptResponse.response - The generated response.
 * @property {Usage} GptResponse.usage - An object containing prompt_tokens, completion_tokens, and total_tokens, representing the API usage information.
 */