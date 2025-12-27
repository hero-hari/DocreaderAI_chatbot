// components/layout/Header.jsx
import React from "react";
import { BookOpenText, Search, Crown, LogIn, Menu } from "lucide-react";

const Header = ({ 
  isAuthenticated, 
  user, 
  onLogin, 
  onLogout,
  sidePanelOpen,        
  setSidePanelOpen,
  onOpenUpgradeModal
}) => {
  const handleMenuClick = () => {
    console.log("📌 Menu clicked! Toggling side panel...");
    setSidePanelOpen(!sidePanelOpen);
  };

  return (
    <header className="relative z-20 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-xl">
      <div className="px-3 md:px-6 py-3 md:py-4 flex items-center justify-between">
        
        {/* ✅ Left Section - Menu + Logo (Responsive) */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <button
            onClick={handleMenuClick}
            className="p-2 rounded-lg hover:bg-white/20 transition flex-shrink-0"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6 text-black" />
          </button>

          {/* Logo Icon */}
          <div className="relative flex items-center justify-center p-1.5 md:p-2 rounded-xl 
                          bg-gradient-to-br from-[#5ac8fa] to-[#007aff] shadow-md flex-shrink-0">
            <BookOpenText className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <Search className="w-2 h-2 md:w-3 md:h-3 text-white absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 opacity-90" />
          </div>

          {/* NEW CODE - Always shows "DocReaderAI" with responsive size */}
          <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold 
                        bg-gradient-to-r from-[#5ac8fa] to-[#007aff] bg-clip-text text-transparent">
            DocReaderAI
          </h1>
        </div>

        {/* ✅ Right Section - Responsive Buttons */}
        <div className="flex items-center space-x-2 md:space-x-3">
          
          {/* Upgrade Button - Responsive */}
          <button
            onClick={onOpenUpgradeModal}
            className="flex items-center space-x-1 md:space-x-2 px-3 md:px-5 py-1.5 md:py-2 
                       rounded-lg text-white text-xs md:text-sm font-medium shadow-sm 
                       bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                       transition-all duration-200 transform hover:scale-105"
          >
            <Crown className="w-3 h-3 md:w-4 md:h-4 text-yellow-300 flex-shrink-0" />
            {/* ✅ Hide text on mobile, show on tablet+ */}
            <span className="hidden sm:inline">Upgrade</span>
          </button>

          {/* User Section */}
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1.5 md:py-2 
                         rounded-lg border border-white/20 text-black/80 
                         hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <img
                src={
                  user?.photoURL ||
                  "https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"
                }
                alt="User"
                className="w-5 h-5 md:w-6 md:h-6 rounded-full flex-shrink-0"
              />
              {/* ✅ Hide "Logout" text on mobile */}
              <span className="hidden sm:inline text-sm md:text-base">Logout</span>
            </button>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1.5 md:py-2 
                         rounded-lg border border-white/20 text-black/80 
                         hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <LogIn className="w-4 h-4 md:w-4 md:h-4 flex-shrink-0" />
              <span className="hidden sm:inline text-sm md:text-base">Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
