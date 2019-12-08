import { Resolvers } from "src/types/resolvers";
import {
  SendMessageMutationArgs,
  SendMessageResponse
} from "src/types/graphql";
import Channel from "../../../../src/entities/Channel";
import Message from "../../../../src/entities/Message";

const resolvers: Resolvers = {
  Mutation: {
    SendMessage: async (
      _,
      args: SendMessageMutationArgs,
      { pubSub }
    ): Promise<SendMessageResponse> => {
      try {
        const { nickname, thumbnail, contents, innerChannelId } = args;

        const channel = await Channel.findOne({ id: innerChannelId });

        if (!channel) {
          return {
            ok: false,
            error: "존재하지 않는 채널입니다."
          };
        }

        const newMessage = await Message.create({
          nickname,
          thumbnail,
          contents,
          innerChannel: channel,
          innerChannelId: channel.id
        }).save();

        pubSub.publish("newMessage", {
          SendMessageSubscription: newMessage
        });

        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
