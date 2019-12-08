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
