import React from 'react';
import * as s from './login.module.css';

const Login = ({ name, setUserName, onSubmit }) => {
  const onChange = (e) => {
    setUserName(e.target.value);
    localStorage.setItem('userName', e.target.value);
  };

  return (
    <div className={s.loginWrapper}>
      <form id="login" className={s.login} onSubmit={onSubmit}>
        <h3 className={s.greeting}>Welcome to Chat</h3>
        <input className={s.loginInput}
               onChange={onChange}
               type="text"
               value={name}
               autoFocus={true}
               placeholder="Enter your name..."
        />
        <input type="submit" className={s.loginButton} value="Login"/>
      </form>
    </div>
  )
};

export default Login;
