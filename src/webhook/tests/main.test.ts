import { sendWebhookEvent } from '../lib/main'

const ApiGwRequest = {
  headers: {},
  multiValueHeaders: {},
  httpMethod: 'GET',
  isBase64Encoded: false,
  body: '{"sample":"event"}',
  path: '',
  pathParameters: {},
  queryStringParameters: {},
  multiValueQueryStringParameters: {},
  stageVariables: {},
  requestContext: {
    accountId: '',
    apiId: '',
    httpMethod: '',
    path: '',
    stage: '',
    requestId: '',
    requestTimeEpoch: 123,
    resourceId: '',
    resourcePath: '',
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      userArn: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: '',
      user: null,
      userAgent: null,
    },
  },
  resource: '',
}

describe('Send webhook event', () => {
  describe('unit', () => {
    it('should invoke notification.send', async () => {
      const notificationMock = {
        send: jest.fn(),
      }
      await sendWebhookEvent(ApiGwRequest, notificationMock)
      expect(notificationMock.send).toHaveBeenCalledTimes(1)
      expect(notificationMock.send).toHaveBeenCalledWith(ApiGwRequest, {})
    })

    it('should invoke notification.send with message attributes', async () => {
      const notificationMock = {
        send: jest.fn(),
      }
      const ApiGwRequest2 = Object.assign({}, ApiGwRequest, { body: '{"type":"awesomeWebhook"}' })
      await sendWebhookEvent(ApiGwRequest2, notificationMock)
      expect(notificationMock.send).toHaveBeenCalledTimes(1)
      expect(notificationMock.send).toHaveBeenCalledWith(ApiGwRequest2, { MessageType: 'awesomeWebhook' })
    })
  })
})
