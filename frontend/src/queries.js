import gql from "graphql-tag";

export const CREATE_CHANNEL = gql`
  mutation createChannel($channelName: String!) {
    CreateChannel(channelName: $channelName) {
      ok
      error
    }
  }
`;

export const GET_CHANNELS_QUERY = gql`
  query {
    GetChannels {
      ok
      channels {
        id
        channelName
      }
    }
  }
`;

export const CHANNELS_SUBSCRIPTION = gql`
  subscription CreateChannelSubscription {
    CreateChannelSubscription {
      id
      channelName
    }
  }
`;

export const GET_MESSAGES_QUERY = gql`
  query getMessages($innerChannelId: Int!) {
    GetMessages(innerChannelId: $innerChannelId) {
      ok
      messages {
        nickname
        contents
        createdAt
      }
    }
  }
`;
