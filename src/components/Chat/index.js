import React from 'react';
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
    onSendMessage,
    onKeyDown,
    scrollMessagesList,
    onStartTyping,
    onStopTyping,
    chatMessagesRef
  } = props;

  (newMessage) ? onStartTyping() : onStopTyping();

  return (
    <div className={s.chat}>
      <Toolbar roomId={roomId}
               users={usersOnline}/>
      <MessagesList messages={messages}
                    userId={userId}
                    chatMessagesRef={chatMessagesRef}
                    scrollMessagesList={scrollMessagesList}
      />
      <TextArea message={newMessage}
                userId={userId}
                onSaveMessage={onSaveMessage}
                onSendMessage={onSendMessage}
                onKeyDown={onKeyDown}
      />
    </div>
  )
};

export default Chat;
