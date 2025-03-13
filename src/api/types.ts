export type GraphQLQueryResponse<T> = {
  data: T
  errors?: {
    message: string
    [key: string]: unknown
  }[]
}

type Topic = {
  name: string
  numberOfPartitions: number
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
