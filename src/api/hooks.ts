import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createTopic, getTopic, getTopics } from './fetch'
import { CreateTopicInput, RequestError } from '.'

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
    onSuccess: async () => {
      if (onSuccess) onSuccess()
      await queryClient.invalidateQueries({ queryKey: [topicsKey] })
    },
  })
}
