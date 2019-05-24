import React from 'react';
import * as s from './textarea.module.css';

const TextArea = ({ onSaveMessage,
                    onSendMessage,
                    message,
                    onKeyDown}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onSendMessage();
  };

  return (
    <form className={ s.form }
          onSubmit={ (e) => onSubmit(e)  }>
      <div className={ s.textareaWrapper }>
        <textarea className={ s.textarea }
                  onChange={ (e) => onSaveMessage(e.target.value) }
                  onKeyDown={onKeyDown}
                  value={ message }
                  required autoFocus autoComplete="off" />
      </div>
      <button className={ s.submitButton } type="submit">
        Send
      </button>
    </form>
  );
};

export default TextArea;
