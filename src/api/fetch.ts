import { print } from 'graphql'
import { DocumentNode } from 'graphql/language/ast'

import { GraphQLQueryResponse, RequestError } from '.'

export const graphQlRequest = async <T1 = unknown, T2 = unknown>(
  query: DocumentNode,
  variables?: Record<string, T2>,
) => {
  const response = await fetch(`${import.meta.env.VITE_API_HOST}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query: print(query), variables }),
  })

  const result = (await response.json()) as GraphQLQueryResponse<T1>

  if (!response.ok || result.errors?.length) {
    console.error('GraphQL error:', result.errors || response.statusText)
    throw new RequestError(result, response)
  }

  return result
}
