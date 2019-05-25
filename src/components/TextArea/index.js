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

  const onChange = (e) => {
    e.preventDefault();
    onSaveMessage(e.target.value)
  };

  return (
    <form className={ s.form }
          onSubmit={ onSubmit }>
      <div className={ s.textareaWrapper }>
        <textarea className={ s.textarea }
                  onChange={ onChange }
                  onKeyDown={onKeyDown}
                  value={ message }
                  required autoFocus autoComplete="off" />
      </div>
      <input type="submit" className={ s.submitButton } value="Send"/>
    </form>
  );
};

export default TextArea;
