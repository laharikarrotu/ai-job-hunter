import { APIGatewayProxyHandler } from 'aws-lambda'
import { OpenAI } from 'openai'
import { Job, UserProfile } from '@shared/types'

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { job, profile } = JSON.parse(event.body || '{}')
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    // Generate cover letter using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional cover letter writer."
        },
        {
          role: "user",
          content: `Generate a cover letter for ${job.title} at ${job.company}. 
                   User skills: ${profile.skills.join(', ')}`
        }
      ]
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        coverLetter: completion.choices[0].message.content 
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate cover letter' }),
    }
  }
} 