import { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createTopic, getTopic, getTopics } from './fetch'
import {
  CreateTopicInput,
  GraphQLWebSocketEvent,
  RequestError,
  TopicRecord,
} from '.'

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
  const [isOpen, setIsOpen] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [data, setData] = useState<TopicRecord[]>([])
  const [error, setError] = useState<string>()

  const socketRef = useRef<WebSocket | null>(null)

  const connect = useCallback(() => {
    socketRef.current = new WebSocket(
      `${import.meta.env.VITE_WS_HOST}/subscriptions`,
      'graphql-ws',
    )

    const socket = socketRef.current

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'connection_init', payload: {} }))
      setIsOpen(true)
    }

    socket.onclose = event => {
      console.log('WebSocket connection closed.', event.reason)
      setIsOpen(false)
      setIsSubscribed(false)
    }

    socket.onerror = event => {
      console.error('WebSocket error:', event)
      setError('WebSocket connection error')
    }

    socket.onmessage = (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data) as GraphQLWebSocketEvent<{
        consumeTopic: TopicRecord
      }>

      switch (data.type) {
        case 'connection_ack':
          subscribe(topicName)
          break

        case 'data':
          setData(prevData => [data.payload.data.consumeTopic, ...prevData])
          break

        case 'error':
          console.error('Subscription error:', data.payload)
          setError(data.payload.message)
          break

        case 'complete':
          setIsSubscribed(false)
          break

        default:
          console.log('Unknown message type:', data.type)
      }
    }
  }, [topicName])

  const subscribe = (topic: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          id: 1,
          type: 'start',
          payload: {
            query: `
              subscription Subscription($topic: String!) {
                consumeTopic(topic: $topic) {
                  key
                  offset
                  partition
                  value
                }
              }
            `,
            variables: { topic },
          },
        }),
      )
      setIsSubscribed(true)
      setError(undefined)
    }
  }

  const close = useCallback(() => {
    if (socketRef.current) {
      socketRef.current?.close(1000, 'Client closed connection')
      setIsOpen(false)
      setIsSubscribed(false)
    }
  }, [])

  const reset = () => {
    close()
    connect()
  }

  useEffect(() => {
    if (topicName) connect()
    return () => {
      close()
    }
  }, [close, connect, topicName])

  return {
    clearData: () => setData([]),
    connect,
    subscribe,
    close,
    reset,
    data,
    error,
    isOpen,
    isSubscribed,
  }
}
