import React from 'react';
import * as s from './toolbar.module.css';

const Toolbar = ({ chatRoomId, username, usersOnline }) => {
  return (
    <div className={ s.toolbar }>
      <div className={ s.chatId }>
        <h3>Chat</h3>
        <span className={ s.id }>id: { chatRoomId }</span>
      </div>
      <div className={ s.usersOnline }>
        <h4>Users online { usersOnline.length }</h4>
        {
          usersOnline.map((user, i) =>
            <span className={ s.usersListItem } key={i}>
              { user }
            </span>)
        }
      </div>
    </div>
  );
};

export default Toolbar;
