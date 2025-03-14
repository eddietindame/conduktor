export type GraphQLQueryResponse<T = unknown> = {
  data: T
  errors?: {
    message: string
    [key: string]: unknown
  }[]
}

export type Topic = {
  name: string
  numberOfPartitions: number
}

export type TopicRecord = {
  key: string
  value: string
  offset: number
  partition: number
}

export type GetTopicsResponse = {
  topics: Topic[]
}

export type GetTopicResponse = {
  topic: Topic
}

export type CreateTopicResponse = {
  createTopic: Topic
}

export type CreateTopicInput = {
  topicName: string
  numberOfPartitions: number
}

export class RequestError extends Error {
  status: number
  statusText: string
  graphQLErrors: GraphQLQueryResponse['errors']

  constructor(result: GraphQLQueryResponse, response: Response) {
    const message =
      result.errors?.map(err => err.message).join(', ') ||
      'Failed to execute operation'

    super(message)
    Object.setPrototypeOf(this, RequestError.prototype)
    this.status = response.status
    this.statusText = response.statusText
    this.graphQLErrors = result.errors || []
  }
}

export type GraphQLWebSocketEvent<T = unknown> =
  | { type: 'connection_init'; payload?: Record<string, unknown> }
  | { type: 'connection_ack'; payload?: Record<string, unknown> }
  | {
      type: 'subscribe'
      id: string
      payload: { query: string; variables?: Record<string, unknown> }
    }
  | { type: 'data'; id: string; payload: { data: T } }
  | {
      type: 'error'
      id?: string
      payload: { message: string; extensions?: unknown }
    }
  | { type: 'complete'; id: string }
