// components/layout/InputArea.jsx
import React, { useState, useRef } from 'react';
import { Send, Loader2, AlertCircle, Lock, Crown } from 'lucide-react';

const InputArea = ({
  onSendMessage,
  connectionStatus,
  isLoading,
  isAuthenticated,
  chatLimits,
  onOpenUpgradeModal
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const inputRef = useRef(null);

  const canSend = () =>
    inputMessage.trim() &&
    !isLoading &&
    connectionStatus === 'connected' &&
    isAuthenticated &&
    chatLimits.canChat;

  const getPlaceholderText = () => {
    if (!isAuthenticated) return "Please log in to start...";
    else if (!chatLimits.canChat) return "Upgrade to continue...";
    else if (connectionStatus !== 'connected') return "Connection issue...";
    else return "Ask me anything...";
  };

  const handleSendMessage = () => {
    if (!canSend()) return;
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusWarning = () => {
    if (!isAuthenticated) {
      return (
        <span className="text-yellow-700 flex items-center text-xs">
          <Lock className="w-3 h-3 mr-1" />
          <span className="hidden sm:inline">Login required</span>
        </span>
      );
    } else if (!chatLimits.canChat) {
      return (
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onOpenUpgradeModal) {
              onOpenUpgradeModal();
            }
          }}
          className="text-blue-700 flex items-center hover:text-blue-800 hover:underline text-xs"
          type="button"
        >
          <Crown className="w-3 h-3 mr-1" />
          <span className="hidden sm:inline">Upgrade</span>
        </button>
      );
    } else if (connectionStatus !== 'connected') {
      return (
        <span className="text-red-600 flex items-center text-xs">
          <AlertCircle className="w-3 h-3 mr-1" />
          <span className="hidden sm:inline">Disconnected</span>
        </span>
      );
    }
    return null;
  };

  const getChatLimitInfo = () => {
    if (!isAuthenticated) return null;
    
    const remaining = chatLimits.remaining;
    
    if (remaining === -1) {
      return (
        <span className="text-green-600 text-xs md:text-sm flex items-center gap-1">
          <Crown className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
          <span className="font-semibold hidden sm:inline">Unlimited</span>
        </span>
      );
    }
    
    if (!chatLimits.canChat) return null;
    
    let textColor = 'text-green-600';
    if (remaining <= 1) textColor = 'text-red-600';
    else if (remaining <= 2) textColor = 'text-yellow-600';
    
    return (
      <span className={`${textColor} text-xs md:text-sm`}>
        {remaining} <span className="hidden sm:inline">chat{remaining !== 1 ? 's' : ''}</span>
      </span>
    );
  };

  return (
    <div className="relative z-10 bg-transparent">
      <div className="max-w-4xl mx-auto p-3 md:p-6">
        
        {/* ✅ Input + Button Container */}
        <div className="flex items-center space-x-2 md:space-x-4">
          
          {/* Input Field */}
          <div className="flex-1 relative group">
            <label
              htmlFor="chatInput"
              className={`absolute left-3 md:left-5 top-2 text-xs md:text-sm transition-all duration-200 pointer-events-none ${
                inputMessage
                  ? 'text-gray-800 -translate-y-3 scale-90 bg-white px-1'
                  : 'text-gray-600 translate-y-2 scale-100'
              }`}
            >
              {getPlaceholderText()}
            </label>

            <textarea
              id="chatInput"
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              disabled={
                !isAuthenticated ||
                !chatLimits.canChat ||
                connectionStatus !== 'connected'
              }
              className={`w-full px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl 
                         backdrop-blur-md bg-white/90 border border-blue-100 
                         focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-blue-200 
                         text-black font-medium placeholder-transparent
                         shadow-sm transition-all duration-200 resize-none text-sm md:text-base ${
                (!isAuthenticated || !chatLimits.canChat || connectionStatus !== 'connected')
                  ? 'opacity-60 cursor-not-allowed'
                  : 'focus:shadow-lg'
              }`}
              style={{
                minHeight: '40px',
                maxHeight: '100px',
                color: '#000',
                fontWeight: 500,
              }}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={() => {
              if (!chatLimits.canChat && isAuthenticated) {
                if (onOpenUpgradeModal) {
                  onOpenUpgradeModal();
                }
              } else {
                handleSendMessage();
              }
            }}
            disabled={isLoading || !isAuthenticated || connectionStatus !== 'connected'}
            className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                       rounded-xl md:rounded-2xl hover:from-blue-600 hover:to-blue-700 
                       disabled:opacity-50 disabled:cursor-not-allowed 
                       transition-all duration-200 flex-shrink-0 shadow-md 
                       transform hover:scale-105 active:scale-95"
            title={
              !isAuthenticated
                ? 'Login required'
                : !chatLimits.canChat
                ? 'Click to upgrade'
                : connectionStatus !== 'connected'
                ? 'Disconnected'
                : 'Send'
            }
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
            ) : !isAuthenticated ? (
              <Lock className="w-5 h-5 md:w-6 md:h-6" />
            ) : !chatLimits.canChat ? (
              <Crown className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <Send className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </button>
        </div>

        {/* ✅ Bottom Info - Stack on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 md:mt-3 
                        text-gray-800 text-xs md:text-sm space-y-1 sm:space-y-0">
          
          {/* Left side - Instructions (hide on tiny screens) */}
          <p className="hidden md:block">Press Enter to send, Shift+Enter for new line</p>
          
          {/* Right side - Status indicators */}
          <div className="flex items-center justify-between sm:justify-end space-x-2 md:space-x-4">
            {getChatLimitInfo()}
            <span className="text-xs md:text-sm">{inputMessage.length}/1000</span>
            {getStatusWarning()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
