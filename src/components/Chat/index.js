import React, {useRef} from 'react';
import { Toolbar, MessagesList, TextArea } from "../";
import * as s from './chat.module.css';

const Chat = (props) => {
  const {
    roomId,
    userId,
    usersOnline,
    newMessage,
    messages,
    onSaveMessage,
    onSendMessage
  } = props;

  const chatMessagesRef = useRef();

  const scrollMessages = () => {
    const messages = chatMessagesRef.current;
    if (messages) {
      messages.scrollTop = messages.scrollHeight;
    }
  };

  const onPressEnter = (e) => {
    if ((e.ctrlKey && e.keyCode === 13)) {
      e.preventDefault();
      onSaveMessage(`${e.target.value}\n`)
    } else if (e.keyCode === 13) {
      e.preventDefault();
      onSendMessage();
      scrollMessages();
    }
  };

  return (
    <div className={s.chat}>
      <Toolbar roomId={roomId}
               users={usersOnline}/>
      <MessagesList messages={messages}
                    userId={userId}
                    chatMessagesRef={chatMessagesRef}
      />
      <TextArea message={newMessage}
                userId={userId}
                onPressEnter={onPressEnter}
                onSaveMessage={onSaveMessage}
                onSendMessage={onSendMessage}
                scrollMessages={scrollMessages}
      />
    </div>
  )
};

export default Chat;
