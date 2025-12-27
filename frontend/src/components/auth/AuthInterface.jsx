// components/auth/AuthInterface.jsx
import React from 'react';
import { User, LogOut, MessageCircle, Crown } from 'lucide-react';
import GoogleLoginButton from './GoogleLoginButton';

const AuthInterface = ({ 
  user, 
  isAuthenticated, 
  isLoading, 
  chatLimits, 
  onLogout 
}) => {
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4 md:p-8">
        {/* ✅ Added responsive padding and max-width constraints */}
        <div className="bg-white/45 backdrop-blur-lg rounded-2xl p-6 md:p-8 
                        max-w-md w-full text-center border border-white/70">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 
                            rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            
            {/* ✅ Responsive text sizes */}
            <h3 className="text-lg md:text-xl font-semibold text-black mb-2">
              Welcome to RAG Chatbot
            </h3>
            
            <p className="text-sm md:text-base text-black/70 px-2">
              Sign in with Google to start your conversation. You'll get 3 free chats to try out our AI assistant!
            </p>
          </div>
          
          <GoogleLoginButton 
            isLoading={isLoading}
          />
          
          {/* ✅ Smaller text on mobile */}
          <div className="mt-6 text-xs text-black/50 px-2">
            By signing in, you agree to our terms of service
          </div>
        </div>
      </div>
    );
  }

  return (
    // ✅ Stack on mobile, horizontal on desktop
    <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 w-full md:w-auto">
      
      {/* Chat Limits Display */}
      <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg border border-white/20">
        <MessageCircle className="w-4 h-4 text-blue-300" />
        <span className="text-xs md:text-sm text-white">
          {chatLimits.remaining === -1 ? '∞' : `${chatLimits.remaining}/${3}`} chats
        </span>
        {chatLimits.remaining === 0 && (
          <Crown className="w-4 h-4 text-yellow-400" />
        )}
      </div>

      {/* User Info - Hide email on small screens */}
      <div className="flex items-center space-x-3">
        {user?.picture && (
          <img 
            src={user.picture} 
            alt={user.name}
            className="w-8 h-8 rounded-full border-2 border-white/30"
          />
        )}
        <div className="hidden md:block">
          <div className="text-sm font-medium text-white">
            {user?.name}
          </div>
          <div className="text-xs text-white/60">
            {user?.email}
          </div>
        </div>
        
        {/* ✅ Show name on mobile, hide email */}
        <div className="md:hidden text-sm font-medium text-white truncate max-w-[120px]">
          {user?.name}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="p-2 text-white/80 hover:text-white bg-red-500/20 hover:bg-red-500/30 
                   rounded-lg border border-red-500/30 hover:border-red-500/50 
                   transition-all duration-200"
        title="Logout"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AuthInterface;
