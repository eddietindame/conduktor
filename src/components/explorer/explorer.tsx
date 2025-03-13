import { useTopic, useTopics } from '@/api'

export const Explorer = () => {
  const { data: topics } = useTopics()
  const { data: topic, error, isError, isLoading } = useTopic('who')

  console.log({ error, isError, isLoading })

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">Topics</h1>
      <pre>{JSON.stringify(topics, null, 1)}</pre>
      <br />
      <pre>{JSON.stringify(topic, null, 1)}</pre>
      <pre>{error?.message}</pre>
    </div>
  )
}
