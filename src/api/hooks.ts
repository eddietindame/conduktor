import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getTopic, getTopics } from './fetch'

const topicsKey = 'topics'

export const useTopics = () =>
  useQuery({
    queryKey: [topicsKey],
    queryFn: getTopics,
    select: ({ data }) => data.topics,
  })

export const useTopic = (name: string) =>
  useQuery({
    queryKey: [topicsKey, name],
    queryFn: () => getTopic(name),
    select: ({ data }) => data.topic,
  })

export const useCreateTopic = (name: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => getTopic(name),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [topicsKey] })
    },
  })
}
