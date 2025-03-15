export type GraphQLQueryResponse<T = unknown> = {
  data: T
  errors?: {
    message: string
    [key: string]: unknown
  }[]
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
