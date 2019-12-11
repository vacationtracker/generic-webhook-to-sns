import { SnsNotificationRepository } from '../sns-repository'

describe('SNS Notification Repository', () => {
  describe('unit', () => {
    it('should set a topic Arn', () => {
      const notifiction = new SnsNotificationRepository('test')
      expect(notifiction.topicArn).toBe('test')
    })

    it('should set an SNS library', () => {
      const snsMock = {
        publish: jest.fn(),
      }
      const notifiction = new SnsNotificationRepository('test', snsMock)
      expect(notifiction.sns).toBe(snsMock)
    })

    it('should publish a message', async () => {
      const snsMock = {
        publish: jest.fn().mockReturnValue({ promise: () => Promise.resolve() }),
      }
      const notifiction = new SnsNotificationRepository('testTopic', snsMock)
      await notifiction.send('test')
      expect(snsMock.publish).toHaveBeenCalledTimes(1)
      expect(snsMock.publish).toHaveBeenCalledWith({
        Message: '"test"',
        TopicArn: 'testTopic',
      })
    })

    it('should stringify an object when send as a message', async () => {
      const snsMock = {
        publish: jest.fn().mockReturnValue({ promise: () => Promise.resolve() }),
      }
      const notifiction = new SnsNotificationRepository('testTopic', snsMock)
      await notifiction.send({ test: true })
      expect(snsMock.publish).toHaveBeenCalledTimes(1)
      expect(snsMock.publish).toHaveBeenCalledWith({
        Message: '{"test":true}',
        TopicArn: 'testTopic',
      })
    })

    it('should send a message with message attributes', async () => {
      const snsMock = {
        publish: jest.fn().mockReturnValue({ promise: () => Promise.resolve() }),
      }
      const notifiction = new SnsNotificationRepository('testTopic', snsMock)
      await notifiction.send('test', { type: 'specialType' })
      expect(snsMock.publish).toHaveBeenCalledTimes(1)
      expect(snsMock.publish).toHaveBeenCalledWith({
        Message: '"test"',
        TopicArn: 'testTopic',
        MessageAttributes: {
          type: {
            DataType: 'String',
            StringValue: 'specialType',
          },
        },
      })
    })
  })
})
