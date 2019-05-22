import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Login, Chat } from './modules';
import * as routes from './routes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLogged: false};
  }

  setUserIsLogged = () => {
    this.setState({isLogged: true})
  };

  render() {
    return (
      <Router>
        <Route
          path={`${routes.ROOM}/:id?`}
          render={(props) => (
            this.state.isLogged
              ? <Chat {...props} />
              : <Login {...props} setUserIsLogged={this.setUserIsLogged}/>
          )}
        />

      </Router>
    );
  }
};
