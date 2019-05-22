import React from 'react';
import * as s from './login.module.css';

const Login = ({ setUserName, onClickButton }) => {
  return (
    <div className={s.loginWrapper}>
      <form className={s.login} onSubmit={onClickButton}>
        <h3 className={s.greeting}>Welcome to Chat</h3>
      <input className={s.loginInput} onChange={ (e) => setUserName(e.target.value) } type="text" autoFocus={true}/>
      <button className={s.loginButton} onClick={onClickButton} type="submit">
        Login
      </button>
      </form>
    </div>
  )
};

export default Login;
