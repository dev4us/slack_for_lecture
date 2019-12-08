import React, { useContext, useState, useRef } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { Store } from "../GlobalState/store";
import styled from "styled-components";
import faker from "faker";
import { GET_MESSAGES_QUERY, SEND_MESSAGE } from "../queries";

const ChatList = () => {
  const nickname = faker.name.findName();
  const thumbnail = faker.image.avatar();
  const inputChat = useRef();

  const { state } = useContext(Store);
  const [message, handleMessage] = useState("");

  const { data } = useQuery(GET_MESSAGES_QUERY, {
    variables: { innerChannelId: state.selectedChannelId }
  });
  console.log(data);
  const sendChat = useMutation(SEND_MESSAGE, {
    variables: {
      nickname,
      contents: message,
      thumbnail,
      innerChannelId: state.selectedChannelId
    },
    update: (proxy, mutationResult) => {
      handleMessage("");
      inputChat.current.focus();
    }
  });

  const setMessageByKey = e => {
    if (e.key === "Enter") {
      sendChat();
    }
  };

  const TimeConverter = timestamp => {
    if (!timestamp) {
      return;
    }
    let timestamp_date = new Date(parseInt(timestamp));
    const localString = timestamp_date.toLocaleString().split(".");
    return localString[3];
  };

  return (
    <MainFrame>
      <ChatListFrame>
        {data.GetMessages &&
          data.GetMessages.ok &&
          data.GetMessages.messages.map((message, index) => (
            <MessageFrame key={index}>
              <Thumbnail background={message.thumbnail}></Thumbnail>
              <ContentsFrame>
                <ContentsInFrame>
                  <NickName>{message.nickname}</NickName>
                  <DateTime>{TimeConverter(message.createdAt)}</DateTime>
                </ContentsInFrame>
                <ContentsInFrame>
                  <Contents>{message.contents}</Contents>
                </ContentsInFrame>
              </ContentsFrame>
            </MessageFrame>
          ))}
      </ChatListFrame>
      <ChatFrame>
        <ChatInput
          type="text"
          ref={inputChat}
          value={message}
          onChange={e => handleMessage(e.target.value)}
          onKeyPress={e => setMessageByKey(e)}
          placholder="input your message 😊"
        ></ChatInput>
      </ChatFrame>
    </MainFrame>
  );
};

const MainFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
`;

const ChatListFrame = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: scroll;
`;

const MessageFrame = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  padding: 5px 5px 5px 2.5%;
`;

const Thumbnail = styled.div`
  width: 45px;
  height: 45px;
  background: black;
  padding: 5px 5px 5px 5px;
  background-image: url(${props => props.background});
  background-size: cover;
  margin-top: 10px;
  border-radius: 5px;
`;

const ContentsFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 10px;
  padding-top: 2px;
`;

const ContentsInFrame = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
`;

const Contents = styled.div`
  font-size: 14px;
`;

const NickName = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const DateTime = styled.div`
  font-size: 10px;
  color: #5b5b5b;
  margin-left: 10px;
  padding-top: 2px;
`;

const ChatFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
`;

const ChatInput = styled.input`
  width: 95%;
  height: 85%;
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  color: black;
  padding-left: 15px;
  font-size: 15px;
  &:focus {
    border: 1px solid #505050;
  }
`;

export default ChatList;
