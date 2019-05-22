import React from 'react';
import * as s from './message.module.css';

const Message = ({ isMy, author, date, body }) => {
  return (
    <div className={ isMy ? `${ s.message } ${ s.messageRight }` : `${ s.message } ${ s.messageLeft }` }>
      <div className={ isMy ? `${ s.messageWrap } ${ s.messageWrapRight }` : `${ s.messageWrap } ${ s.messageWrapLeft }` }>
        <div className={ s.meta }>
          <div className={ s.metaName }>
            { (isMy) ? 'You' : `${author}` }
          </div>
          <div className={ s.metaDate }>
            { date }
          </div>
        </div>
        <div className={ s.body }>
            { body }
        </div>
      </div>
    </div>
  );
};

export default Message;
