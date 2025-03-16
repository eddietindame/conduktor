import { useCallback, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import gql from 'graphql-tag'
import { print } from 'graphql'
import { toast } from 'sonner'

import { useAuthToken } from '@/hooks/use-auth-token'
import { useLimitedQueue } from '@/hooks/use-limited-queue'
import { createTopic, getTopic, getTopics } from './fetch'
import { useGraphQLSubscription, RequestError } from '..'
import { CreateTopicInput, TopicRecord } from '.'

export const topicsKey = 'topics'

export const useTopics = () => {
  const token = useAuthToken()
  return useQuery({
    queryKey: [topicsKey, token],
    queryFn: () => getTopics(token),
    select: ({ data }) => data.topics,
    retry: (requestCount, error) => {
      // Only retry on network errors, not GraphQL errors
      return !(error instanceof RequestError) && requestCount < 5
    },
    enabled: !!token,
  })
}

export const useTopic = (name: string) => {
  const token = useAuthToken()
  return useQuery({
    queryKey: [topicsKey, name, token],
    queryFn: () => getTopic(name, token),
    select: ({ data }) => data.topic,
    enabled: !!token,
  })
}

export const useCreateTopic = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()
  const token = useAuthToken()
  return useMutation({
    mutationFn: (topic: CreateTopicInput) => createTopic(topic, token),
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

export const useTopicSubscription = (
  topicName: string,
  queueLength: number = 100,
) => {
  const [data, addData, resetData] = useLimitedQueue<TopicRecord>(queueLength)

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
      addData(messageData.consumeTopic)
    },
    [addData],
  )

  const subscription = useGraphQLSubscription<{ consumeTopic: TopicRecord }>(
    query,
    variables,
    handleMessage,
  )

  const clearData = useCallback(() => {
    resetData()
  }, [resetData])

  return {
    ...subscription,
    clearData,
    data,
  }
}
