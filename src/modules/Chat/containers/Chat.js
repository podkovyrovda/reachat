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
      username,
      userId } = this.props;

    socket.on('connect', () => {});

    socket.emit(e.JOIN_USER, username, match.params.id);
    let userJoined = false;
    socket.on(e.JOIN_USER, ({ user, users }) => {
      if (!userJoined) {
        match.params.id = user.room;
        setChatRoomId(user.room);
        setUserId(user.id);
        userJoined = true;
        history.push(`${routes.ROOM}/${user.room}`);
      }
      updateUsersOnline(users);
    });

    socket.on(e.NEW_MESSAGE, message => {
      console.log(message);
      addMessage(message);
    });

    socket.on(e.USER_LEFT, ({ user, users }) => {
      console.log(user + ' disconnect');
      updateUsersOnline(users);
    });

    // socket.on('reconnect', () => {
    //   console.log('reconnect');
    //   if (username) {
    //     socket.emit(e.JOIN_USER, username, match.params.id);
    //     socket.on(e.JOIN_USER, ({ user }) => setUserId(user.id));
    //   }
    // });

    socket.on(e.DISCONNECT, () => {});
  }

  onSendMessage = () => {
    const { newMessage,  resetMessage, userId, username, match } = this.props;
    socket.emit(e.NEW_MESSAGE, {
      user: {
        id: userId,
        name: username
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
      return (
        <Chat {...this.props}
              onSaveMessage={this.onSaveMessage}
              onSendMessage={this.onSendMessage}
              socket={socket}/>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    chatRoomId: state.chat.chatRoomId ,
    usersOnline: state.chat.usersOnline,
    messages: state.chat.messages,
    username: state.login.name,
    userId: state.login.id,
    newMessage: state.chat.newMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsersOnline: users => dispatch(updateUsersOnline(users)),
    saveMessage: message => dispatch(saveMessage(message)),
    addMessage: message => dispatch(addMessage(message)),
    resetMessage: () => dispatch(resetMessage()),
    setChatRoomId: (chatRoomId) => dispatch(setChatRoomId(chatRoomId)),
    setUserId: (userId) => dispatch(setUserId(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);




