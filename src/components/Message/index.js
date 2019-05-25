import React from 'react';

import * as s from './message.module.css';

const Message = ({ isMy, scrollMessageList, isServer, isTyping, author, date, body, color }) => {
  scrollMessageList();
  if (isServer) {
    return (
      <div className={`${ s.serverMessageWrapper }`}>
        <div style={{backgroundColor: color}} className={`${ s.serverMessage }`}>
          { body }
        </div>
      </div>
    )
  } else if (isTyping) {
    if (isMy) return null;
    return (
      <div className={`${ s.message } ${ s.messageLeft }`}>
        <div style={{backgroundColor: color}} className={`${ s.messageWrap } ${ s.messageWrapLeft } `}>
          <div  className={`${s.typingMessage}`}>
            { body } is typing...

          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={ isMy ? `${ s.message } ${ s.messageRight }` : `${ s.message } ${ s.messageLeft }` }>
        <div style={isMy ? null : {backgroundColor: color}}
             className={ isMy ? `${ s.messageWrap } ${ s.messageWrapRight }` : `${ s.messageWrap } ${ s.messageWrapLeft }` }>
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
    )}
};

export default Message;
