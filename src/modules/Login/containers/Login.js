import React from 'react';
import { connect } from 'react-redux';

import { Login } from '../../../components';
import { setUserName } from '../actions';
import * as routes from '../../../routes';

const LoginContainer = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const {
      history,
      match,
      setUserIsLogged } = props;

    (match.params.id)
      ? history.push(`${routes.ROOM}/${match.params.id}`)
      : history.push(`${routes.ROOM}`);
    setUserIsLogged();
  };

  return <Login {...props} onSubmit={onSubmit}/>
};

const mapStateToProps = (state) => ({ name: state.login.name });

export default connect(mapStateToProps, { setUserName })(LoginContainer);