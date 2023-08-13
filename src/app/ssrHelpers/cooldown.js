/**
 * Waits for a random amount of time between a specified minimum and maximum duration. 
 * If environment variables `GPT_COOLDOWN_TIME_MIN` and `GPT_COOLDOWN_TIME_MAX` are set, 
 * they will be used as the minimum and maximum wait time respectively. 
 * Otherwise, the provided min and max arguments will be used.
 * @async
 * @function cooldown
 * @param {string|null} message - The message to log to the console before waiting.
 * @param {number|null} min - The minimum amount of time to wait, in seconds. Defaults to 5 seconds.
 * @param {number|null} max - The maximum amount of time to wait, in seconds. Defaults to 15 seconds.
 * @returns {Promise<void>} A promise that resolves after a random amount of time between the minimum and maximum wait times.
 * @example
 * await cooldown('Waiting for 5-15 seconds...');
 * // ⏳ Too many requests to GPT API. Waiting for 5 seconds...
 * @todo Add example
 * @mermaid
 * graph TB
    A((Input:<br>response)) -->|if check| B{Is<br><b>response</b><br>valid?}
    B -->|Yes| C(Create startMarker<br>and endMarker)
    B -->|No| L(Return empty<br>codeBlocks,<br>cleanedResponse,<br>noMarkdown)
    L --> O((fa:fa-car<br>End))
    C --> D(Find startMarkerIndex<br>in response)
    D --> E(Create cleanedInput by<br> removing content<br>before startMarker)
    E --> F(Find endMarkerIndex<br>in cleanedInput)
    F --> G(Remove everything<br>after endMarker<br>in cleanedInput)
    G --> H(Match code blocks with regex)
    H --> I(Create codeBlocks<br>and cleanedResponse)
    I --> J(Match any unmatched<br>backticks in cleanedResponse)
    J --> K(Create final<br>cleanedResponse<br>and noMarkdown)
    K --> M(Output: CodeBlocks,<br>cleanedResponse, noMarkdown)
    M --> O
 */
    async function cooldown(message,min = 5, max = 15) {
        // Convert min and max to milliseconds and use environment variables if they're set
        min = (process.env.GPT_COOLDOWN_TIME_MIN || min) * 1000;
        max = (process.env.GPT_COOLDOWN_TIME_MAX || max) * 1000;
    
        const waitTime = Math.floor(Math.random() * (max - min + 1)) + min; // Random time between min and max
        // refactor the line below
        console.log(`${message?message:`⏳ Too many requests to GPT API,`} Waiting for ${waitTime / 1000} seconds...`);
    
        return new Promise(resolve => setTimeout(resolve, waitTime));
    }
    module.exports = cooldown; 