require('dotenv').config()
const OpenAI = require("openai")

const openai = new OpenAI({
    apiKey: process.env.gptKey
})



//===================  GPT  ====================//

const gpt = async (gptPrompt) => {
    try {
        let response = await openai.chat.completions.create({
            messages: [{ role: "user", content: gptPrompt }],
            model: "gpt-4o"
        })
        return response.choices[0].message.content
    } catch (error) {
        console.log(error.message)
        return null
    }
}



module.exports = { gpt }