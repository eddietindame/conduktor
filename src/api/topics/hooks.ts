import { useCallback, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import gql from 'graphql-tag'
import { print } from 'graphql'
import { toast } from 'sonner'

import { createTopic, getTopic, getTopics } from './fetch'
import { CreateTopicInput, TopicRecord } from '.'
import { useGraphQLSubscription, RequestError } from '..'

export const topicsKey = 'topics'

export const useTopics = () =>
  useQuery({
    queryKey: [topicsKey],
    queryFn: getTopics,
    select: ({ data }) => data.topics,
    retry: (requestCount, error) => {
      // Only retry on network errors, not GraphQL errors
      return !(error instanceof RequestError) && requestCount < 5
    },
  })

export const useTopic = (name: string) =>
  useQuery({
    queryKey: [topicsKey, name],
    queryFn: () => getTopic(name),
    select: ({ data }) => data.topic,
  })

export const useCreateTopic = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (topic: CreateTopicInput) => createTopic(topic),
    onSuccess: async (_, variables) => {
      if (onSuccess) onSuccess()
      toast.success(`Topic "${variables.topicName}" created successfully`)
      await queryClient.invalidateQueries({ queryKey: [topicsKey] })
    },
    onError: (_, variables) => {
      toast.error(`Failed to create topic "${variables.topicName}"`)
    },
  })
}

export const useTopicSubscription = (topicName: string) => {
  const [data, setData] = useState<TopicRecord[]>([])

  const query = print(gql`
    subscription Subscription($topic: String!) {
      consumeTopic(topic: $topic) {
        key
        offset
        partition
        value
      }
    }
  `)
  const variables = useMemo(() => ({ topic: topicName }), [topicName])

  const handleMessage = useCallback(
    (messageData: { consumeTopic: TopicRecord }) => {
      setData(prevData => [messageData.consumeTopic, ...prevData])
    },
    [],
  )

  const subscription = useGraphQLSubscription<{ consumeTopic: TopicRecord }>(
    query,
    variables,
    handleMessage,
  )

  const clearData = useCallback(() => {
    setData([])
  }, [])

  return {
    ...subscription,
    clearData,
    data,
  }
}
