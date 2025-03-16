import { useCallback, useEffect, useRef, useState } from 'react'

import { useAuthToken } from '@/hooks/use-auth-token'
import { GraphQLWebSocketEvent } from '.'

export const useGraphQLSubscription = <T extends Record<string, unknown>>(
  query: string,
  variables: Record<string, unknown> = {},
  onMessage?: (data: T) => void,
) => {
  const token = useAuthToken()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState<string>()

  const socketRef = useRef<WebSocket | null>(null)

  const connect = useCallback(
    () => {
      if (!token) return

      socketRef.current = new WebSocket(
        `${import.meta.env.VITE_WS_HOST}/subscriptions`,
        'graphql-ws',
      )

      const socket = socketRef.current

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            type: 'connection_init',
            payload: { auth: token },
          }),
        )
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
        const message = JSON.parse(event.data) as GraphQLWebSocketEvent<T>

        switch (message.type) {
          case 'connection_ack':
            subscribe()
            break

          case 'data':
            if (onMessage && message.payload.data)
              onMessage(message.payload.data)
            break

          case 'error':
            console.error('Subscription error:', message.payload)
            setError(message.payload.message)
            break

          case 'complete':
            setIsSubscribed(false)
            break

          default:
            console.log('Unknown message type:', message.type)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onMessage, token],
  )

  const subscribe = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          id: 1,
          type: 'start',
          payload: {
            query,
            variables,
          },
        }),
      )
      setIsSubscribed(true)
      setError(undefined)
    }
  }, [query, variables])

  const close = useCallback(() => {
    if (socketRef.current) {
      socketRef.current?.close(1000, 'Client closed connection')
      setIsOpen(false)
      setIsSubscribed(false)
    }
  }, [])

  const reset = useCallback(() => {
    close()
    connect()
  }, [close, connect])

  useEffect(() => {
    connect()
    return () => {
      close()
    }
  }, [close, connect])

  return {
    connect,
    subscribe,
    close,
    reset,
    error,
    isOpen,
    isSubscribed,
  }
}
