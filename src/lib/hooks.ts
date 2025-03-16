import { useCallback, useState } from 'react'

export function useLimitedQueue<T>(limit: number) {
  const [queue, setQueue] = useState<T[]>([])

  const add = useCallback(
    (item: T) => {
      setQueue(prevQueue => {
        const newQueue = [item, ...prevQueue]
        return newQueue.length > limit ? newQueue.slice(0, limit) : newQueue
      })
    },
    [limit],
  )

  const reset = useCallback(() => {
    setQueue([])
  }, [])

  return [queue, add, reset] as const
}
