import { APIGatewayProxyEvent } from 'aws-lambda'

interface IMessageAttributes {
  [key: string]: any
}

interface INotificationRepository {
  send: (message: Object, messageAttributes?: IMessageAttributes) => Promise<any>
}

export async function sendWebhookEvent(event: APIGatewayProxyEvent, notification: INotificationRepository) {
  const body = event.body ? JSON.parse(event.body) : null
  const messageAttributes: IMessageAttributes = {}
  if (body && body.type) {
    messageAttributes.MessageType = body.type
  }
  return await notification.send(event, messageAttributes)
}
