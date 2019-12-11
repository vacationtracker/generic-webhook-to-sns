import SNS from 'aws-sdk/clients/sns'
const sns = new SNS()

interface IMessageAttributes {
  [key: string]: any
}

interface ISnsLib {
  publish: Function
}

export class SnsNotificationRepository {
  public topicArn: string
  public sns: ISnsLib

  constructor(topicArn: string, notificationLib?: ISnsLib) {
    this.topicArn = topicArn
    this.sns = notificationLib || sns
  }

  public async send(message: Object, messageAttributes?: IMessageAttributes) {
    const params: SNS.PublishInput = {
      Message: JSON.stringify(message),
      TopicArn: this.topicArn,
    }
    if (messageAttributes) {
      const attributes: IMessageAttributes = {}
      Object.keys(messageAttributes).forEach((key) => {
        const value = messageAttributes[key]
        attributes[key] = {
          DataType: Array.isArray(value) ? 'String.Array' : (typeof value === 'number' ? 'Number' : 'String'),
          StringValue: value,
        }
      })
      params.MessageAttributes = attributes
    }
    return this.sns.publish(params).promise()
  }
}
