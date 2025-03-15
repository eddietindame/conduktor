import gql from 'graphql-tag'

import { graphQlRequest } from '../fetch'
import {
  CreateTopicInput,
  CreateTopicResponse,
  GetTopicResponse,
  GetTopicsResponse,
} from '.'

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
  )
