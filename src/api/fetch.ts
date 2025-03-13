import { print } from 'graphql'
import { DocumentNode } from 'graphql/language/ast'
import gql from 'graphql-tag'

import {
  CreateTopicInput,
  CreateTopicResponse,
  GetTopicResponse,
  GetTopicsResponse,
  GraphQLQueryResponse,
} from '.'

const graphQlRequest = async <T1, T2 = unknown>(
  query: DocumentNode,
  variables?: Record<string, T2>,
  errorMessage?: string,
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

  if (response.ok && !result.errors) {
    return result
  } else {
    console.error('GraphQL error:', result.errors || response.statusText)
    throw new Error(
      result.errors?.map(err => err.message).join(', ') ||
        errorMessage ||
        'Failed to execute operation',
    )
  }
}

export const getTopics = async () =>
  graphQlRequest<GetTopicsResponse>(
    gql`
      query GetTopics {
        topics {
          name
          numberOfPartitions
        }
      }
    `,
    undefined,
    'Failed to fetch topics',
  )

export const getTopic = async (name: string) =>
  graphQlRequest<GetTopicResponse>(
    gql`
      query GetTopic($name: String!) {
        topic(name: $name) {
          name
          numberOfPartitions
        }
      }
    `,
    { name },
    'Failed to fetch topic',
  )

export const createTopic = async (topicInput: CreateTopicInput) =>
  graphQlRequest<CreateTopicResponse, CreateTopicInput>(
    gql`
      mutation Mutation($args: CreateTopicInput!) {
        createTopic(args: $args) {
          numberOfPartitions
          name
        }
      }
    `,
    {
      args: topicInput,
    },
    'Failed to create topic',
  )
