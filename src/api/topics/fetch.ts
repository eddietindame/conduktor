import gql from 'graphql-tag'

import { graphQlRequest } from '../fetch'
import {
  CreateTopicInput,
  CreateTopicResponse,
  GetTopicResponse,
  GetTopicsResponse,
} from '.'

export const getTopics = async (token?: string) =>
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
    token,
  )

export const getTopic = async (name: string, token?: string) =>
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
    token,
  )

export const createTopic = async (
  topicInput: CreateTopicInput,
  token?: string,
) =>
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
    token,
  )
