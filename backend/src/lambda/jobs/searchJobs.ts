import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'
import { JobFilters } from '@shared/types'

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const filters: JobFilters = JSON.parse(event.body || '{}')
    const dynamodb = new DynamoDB.DocumentClient()

    const params = {
      TableName: process.env.JOBS_TABLE,
      FilterExpression: 'contains(#title, :searchTerm)',
      ExpressionAttributeNames: {
        '#title': 'title',
      },
      ExpressionAttributeValues: {
        ':searchTerm': filters.searchTerm || '',
      },
    }

    const result = await dynamodb.scan(params).promise()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(result.Items),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to search jobs' }),
    }
  }
} 