import React, { useEffect, useState } from "react";
import { ChatEngineWrapper, Socket, ChatFeed } from "react-chat-engine";

const ChatEngine = (props) => {

    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (props.visible){
            setTimeout(() => {
                setShowChat(true);
            }, 500)
        }
    });

  return (
    <div
      class
      style={{
          height: props.visible ? "100%" : "0%",
          zIndex: props.visible ? "100" : "0",
          width: '100%',
          backgroundColor: '#fff'
      }}
    >
      {showChat && (
        <ChatEngineWrapper>
          <Socket
            projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
            userName={props.user.email}
            userSecret={props.user.email}
          />

          <ChatFeed activeChat={props.chat.id} />
        </ChatEngineWrapper>
      )}
    </div>
  );
};

export default ChatEngine;
