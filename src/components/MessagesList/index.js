import React from 'react';

import { Message } from '../';

import * as s from "./messagesList.module.css";

const MessagesList = ({ messages, userId, chatMessagesRef, scrollMessagesList }) => {
  //TODO почему перерисовывается при вводе нового сообщения?
  if (messages.length > 0) {
    scrollMessagesList();
  }
  return (
    <div className={ s.messages } ref={chatMessagesRef}>
      { messages ? messages.map((m, i) =>
            <Message key={ i }
                     author={ m.author }
                     body={ m.body }
                     color={ m.color }
                     date={ (m.date) || null }
                     isMy={ m.userId === userId }
                     isServer={ m.isServer }
                     isTyping={ m.isTyping }
                     isLast={ i === messages.length - 1 }/>) : null
      }
    </div>
  );
};

export default MessagesList;