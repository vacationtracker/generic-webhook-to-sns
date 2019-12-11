// Allow CloudWatch to read source maps
import 'source-map-support/register'

import { APIGatewayProxyEvent } from 'aws-lambda'
import { SnsNotificationRepository } from '../common/sns-repository'
import { sendWebhookEvent } from './lib/main'

export async function handler(event: APIGatewayProxyEvent) {
  console.log('event: ', JSON.stringify(event))

  const topic = process.env.WEBHOOK_TOPIC

  if (!topic) {
    throw new Error('Webhook URL is required as "process.env.WEBHOOK_TOPIC"')
  }

  const notification = new SnsNotificationRepository(topic)
  await sendWebhookEvent(event, notification)

  return {
    statusCode: 204,
    body: null,
  }
}
