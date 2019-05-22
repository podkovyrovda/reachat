import React  from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { Chat } from "../../../components";
import { updateUsersOnline, saveMessage, addMessage, resetMessage, setChatRoomId } from "../actions";
import { setUserId } from '../../Login/actions';
import * as routes from '../../../routes';
import e from '../../../server/events';

const socket = io('http://localhost:5000');

class ChatContainer extends React.Component {
  componentDidMount() {
    const {
      match,
      setUserId,
      setChatRoomId,
      addMessage,
      updateUsersOnline,
      history,
      userName
    } = this.props;

    socket.on('connect', () => {
    });

    socket.emit(e.JOIN_USER, userName, match.params.id);
    let userJoined = false;

    socket.on(e.USER_JOINED, ({user, users}) => {
      if (!userJoined) {
        match.params.id = user.room;
        setChatRoomId(user.room);
        setUserId(user.id);
        userJoined = true;
        history.push(`${routes.ROOM}/${user.room}`);
      }

      updateUsersOnline(users);
    });

    socket.on(e.MESSAGE_RECEIVED, message => {
      addMessage(message);
    });

    socket.on(e.USER_LEFT, ({user, users}) => {
      console.log(user.name + ' disconnect');
      updateUsersOnline(users);
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

  onSaveMessage = (message) => {
    const { saveMessage } = this.props;
    saveMessage(message);
  };

  render() {
    const { socket } = this.props;
    return <Chat {...this.props}
                 onSaveMessage={this.onSaveMessage}
                 onSendMessage={this.onSendMessage}
                 socket={socket}/>
  };
}

const mapStateToProps = (state) => {
  return {
    roomId: state.chat.roomId ,
    usersOnline: state.chat.usersOnline,
    messages: state.chat.messages,
    userName: state.login.name,
    userId: state.login.id,
    newMessage: state.chat.newMessage
  };
};

export default connect(mapStateToProps, {
  updateUsersOnline,
  saveMessage,
  addMessage,
  resetMessage,
  setChatRoomId,
  setUserId
})(ChatContainer);




