import React from 'react';
import { connect } from 'react-redux';

import { Login } from '../../../components';
import { setUserName } from '../actions';
import * as routes from '../../../routes'

const LoginContainer = (props) => {
  const onClickButton = () => {
    const {
      history,
      match,
      setUserIsLogged } = props;

    (match.params.id)
      ? history.push(`${routes.ROOM}/${match.params.id}`)
      : history.push(`${routes.ROOM}`);
    setUserIsLogged();
  };

  return <Login {...props} onClickButton={onClickButton}/>
};

export default connect(null, { setUserName })(LoginContainer);