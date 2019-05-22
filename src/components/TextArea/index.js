import React from 'react';
import * as s from './textarea.module.css';

const TextArea = ({ onSaveMessage, onPressEnter, onSendMessage, message, scrollMessages }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onSendMessage();
    scrollMessages()
  };

  return (
    <form className={ s.form }
          onSubmit={ (e) => onSubmit(e)  }>
      <textarea className={ s.textarea }
                onChange={ (e) => onSaveMessage(e.target.value) }
                onKeyDown={onPressEnter}
                value={ message }
                required autoFocus autoComplete="off" />
      <button className={ s.submitButton } type="submit">
        Send
      </button>
    </form>
  );
};

export default TextArea;
