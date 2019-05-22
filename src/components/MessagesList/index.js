import React from 'react';

import { Message } from '../';

import * as s from "./messagesList.module.css";

const MessagesList = ({ messages, userId, chatMessagesRef }) => {
  return (
    <div className={ s.messages } ref={chatMessagesRef}>
      { messages ? messages.map((m, i) =>
            <Message key={ i }
                     author={ m.author }
                     body={ m.body }
                     date={ m.date }
                     isMy={ m.userId === userId }
                     isLast={ i === messages.length - 1 }/>) : null
      }
    </div>
  );
};

export default MessagesList;