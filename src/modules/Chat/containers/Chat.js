import React  from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { Chat } from "../../../components";
import {
  updateUsersOnline,
  saveMessage,
  addMessage,
  resetMessage,
  setChatRoomId,
  serverMessage,
  startTyping,
  stopTyping
} from "../actions";
import { setUserId } from '../../Login/actions';
import * as routes from '../../../routes';
import e from '../../../server/events';

const socket = io('http://main.podkovyrov.ru:5000');

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.chatMessagesRef = React.createRef();
  }
  componentDidMount() {
    const {
      match,
      setUserId,
      setChatRoomId,
      addMessage,
      updateUsersOnline,
      history,
      userName,
      serverMessage,
      startTyping,
      stopTyping
    } = this.props;

    socket.on('connect', () => {
    });

    socket.emit(e.JOIN_USER, userName, match.params.id);
    let userJoined = false;

    socket.on(e.USER_JOINED, ({user, users}) => {
      const { room, id, name, color } = user;
      if (!userJoined) {
        match.params.id = room;
        setChatRoomId(room);
        setUserId(id);
        userJoined = true;
        history.push(`${routes.ROOM}/${room}`);
        (users.length === 1) && serverMessage(`room ${ room } was created`);
      }
      updateUsersOnline(users);
      serverMessage(`${ name } joined to the room`, color);
    });

    socket.on(e.MESSAGE_RECEIVED, message => {
      addMessage(message);
    });

    socket.on(e.USER_LEFT, ({user, users, color}) => {
      serverMessage(`${ user.name } left`, color);
      updateUsersOnline(users);
    });

    socket.on(e.START_TYPING, (user) => {
      const { userId } = this.props;
      if (userId !== user.id) startTyping(user)
    });

    socket.on(e.STOP_TYPING, (userId) => {
      stopTyping(userId);
    });

    // socket.on('reconnect', () => {
    //   console.log('reconnect');
    //   if (userName) {
    //     socket.emit(e.JOIN_USER, userName, match.params.id);
    //     socket.on(e.JOIN_USER, ({ user }) => setUserId(user.id));
    //   }
    // });

    socket.on(e.DISCONNECT, () => {});
  }

  onSendMessage = () => {
    const {
      match,
      newMessage,
      resetMessage,
      userName,
      userId
    } = this.props;

    socket.emit(e.STOP_TYPING);

    socket.emit(e.NEW_MESSAGE, {
      user: {
        id: userId,
        name: userName
      },
      body: newMessage,
      room: match.params.id
    });

    resetMessage();
  };

  scrollMessagesList = () => {
    const list = this.chatMessagesRef.current;

    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  };

  onKeyDown = (event) => {
    if (event.keyCode === +'13') {
      event.preventDefault();
      this.onSendMessage();
    }
  };

  onSaveMessage = (message) => {
    this.props.saveMessage(message);
  };

  onStartTyping = () => {
    socket.emit(e.START_TYPING)
  };

  onStopTyping = () => {
    socket.emit(e.STOP_TYPING)
  };


  render() {
    return <Chat {...this.props}
                 onSaveMessage={this.onSaveMessage}
                 onSendMessage={this.onSendMessage}
                 onKeyDown={this.onKeyDown}
                 chatMessagesRef={this.chatMessagesRef}
                 scrollMessagesList={this.scrollMessagesList}
                 onStartTyping={this.onStartTyping}
                 onStopTyping={this.onStopTyping}
    />
  };
}

const mapStateToProps = (state) => {
  const { roomId, usersOnline, messages, newMessage } = state.chat;
  const { name, id } = state.login;
  return {
    roomId,
    usersOnline,
    messages,
    userName: name,
    userId: id,
    newMessage
  };
};

export default connect(mapStateToProps, {
  updateUsersOnline,
  saveMessage,
  addMessage,
  resetMessage,
  setChatRoomId,
  setUserId,
  serverMessage,
  startTyping,
  stopTyping
})(ChatContainer);




