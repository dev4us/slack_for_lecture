import React from "react";
import styled from "styled-components";
import faker from "faker";

const ChatList = () => {
  const nickName = faker.name.findName();
  const thumbnail = faker.image.avatar();

  return (
    <MainFrame>
      <ChatListFrame>
        <MessageFrame>
          <Thumbnail background={thumbnail}></Thumbnail>
          <ContentsFrame>
            <ContentsInFrame>
              <NickName>{nickName}</NickName>
              <DateTime>14:50 PM</DateTime>
            </ContentsInFrame>
            <ContentsInFrame>
              <Contents>안녕?</Contents>
            </ContentsInFrame>
          </ContentsFrame>
        </MessageFrame>
      </ChatListFrame>
      <ChatFrame>
        <ChatInput type="text" placholder="input your message 😊"></ChatInput>
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
