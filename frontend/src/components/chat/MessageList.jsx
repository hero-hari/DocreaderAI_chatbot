// components/chat/MessageList.jsx
import React, { useRef, useEffect } from "react";
import Message from "./Message";
import LoadingMessage from "./LoadingMessage";

const MessageList = ({ messages = [], isLoading, user }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onlyWelcome =
    messages.length === 1 &&
    messages[0].type === "bot" &&
    /welcome|hello|hi/i.test(messages[0].content);

  const userName =
    user?.displayName?.trim() ||
    user?.email?.split("@")[0] ||
    "there";

  return (
    <div className="flex-1 overflow-y-auto p-3 md:p-6 relative z-10">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 text-black">
        
        {/* ✅ Responsive Welcome Message */}
        {onlyWelcome ? (
          <div className="flex flex-col items-center justify-center text-center mt-20 md:mt-40 px-4">
            {userName ? (
              <>
                <h2 className="text-2xl md:text-3xl font-semibold mb-2 drop-shadow-sm text-black">
                  Hello {userName} 👋
                </h2>
                <p className="text-base md:text-lg text-black/90">
                  Start exploring your data insights.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-semibold mb-2 drop-shadow-sm text-black">
                  Welcome!
                </h2>
                <p className="text-base md:text-lg text-black/90">
                  Please sign in to start exploring.
                </p>
              </>
            )}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message.id} className="text-black">
                <Message message={message} />
              </div>
            ))}

            {isLoading && <LoadingMessage />}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default MessageList;
