import React from 'react';

import { ChatEngine } from 'react-chat-engine';

const SupportAdmin = () => {
  return (
    <ChatEngine 
      projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
      userName='JALZ DELEZ'
      userSecret='123456789'
      height= 'calc(100vh - 24px)'
    />
  );
}

export default SupportAdmin;
