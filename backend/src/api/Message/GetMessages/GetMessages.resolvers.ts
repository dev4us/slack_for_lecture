import { Resolvers } from "../../../types/resolvers";
import { GetMessagesQueryArgs, GetMessagesResponse } from "src/types/graphql";
import Message from "../../../entities/Message";

const resolvers: Resolvers = {
  Query: {
    GetMessages: async (
      _,
      args: GetMessagesQueryArgs
    ): Promise<GetMessagesResponse> => {
      try {
        const { innerChannelId } = args;

        const messages = await Message.find({ innerChannelId });

        return {
          ok: true,
          error: null,
          messages
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          messages: null
        };
      }
    }
  }
};

export default resolvers;
