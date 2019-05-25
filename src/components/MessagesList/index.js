import React from 'react';

import { Message } from '../';
import './fade.css';
import * as s from "./messagesList.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const MessagesList = ({ messages, userId, chatMessagesRef, scrollMessagesList }) => {
  return (
    <div className={ s.messages } ref={chatMessagesRef}>
      <TransitionGroup className="todo-list">
      { messages ? messages.map((m, i) =>
        <CSSTransition
          key={i}
          timeout={1000}
          transitionLeave={true}
          transitionAppear={false}
          classNames="fade"
        >
        <Message key={ i }
                       author={ m.author }
                       body={ m.body }
                       color={ m.color }
                       date={ (m.date) || null }
                       isMy={ m.userId === userId }
                 scrollMessageList={ scrollMessagesList }
                       isServer={ m.isServer }
                       isTyping={ m.isTyping }
                       isLast={ i === messages.length - 1 }/>

        </CSSTransition>) : null
      }
      </TransitionGroup>
    </div>
  );
};

export default MessagesList;