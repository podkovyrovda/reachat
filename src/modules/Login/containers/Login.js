import React from 'react';
import { connect } from 'react-redux';

import { Login } from '../../../components';

import { setUserName } from '../actions';
import * as routes from '../../../routes'

class LoginContainer extends React.Component {
  onClickButton = () => {
    const { history, match, setUserIsLogged } = this.props;
    (match.params.id)
      ? history.push(`${routes.ROOM}/${match.params.id}`)
      : history.push(`${routes.ROOM}`);
    setUserIsLogged();
  };

  render() {
    return (
      <Login {...this.props} onClickButton={this.onClickButton}/>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserName: user => dispatch(setUserName(user))
  };
};

export default connect(null, mapDispatchToProps)(LoginContainer);