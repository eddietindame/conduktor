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
