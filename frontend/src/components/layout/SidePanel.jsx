import React, { useState, useMemo, useEffect } from "react";
import { X, MessageSquarePlus, Search, Trash2, BookOpen, FileText } from "lucide-react";
import Library from "../library/Library";
import TermsModal from "./TermsModal";


const SidePanel = ({ 
  isOpen, 
  setIsOpen,
  conversations = [],
  currentConversation = null,
  onSelectConversation = null,
  onNewConversation = null,
  onDeleteConversation = null,
  isLoading = false,
  getAuthHeaders,
  user,
  chatLimits,
  onOpenUpgradeModal,
  onSendQuestion
}) => {
  const togglePanel = () => setIsOpen(!isOpen);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [termsOpen, setTermsOpen] = useState(false); 
  const [showSearch, setShowSearch] = useState(false);
  const [forceRender, setForceRender] = useState(0);


  // Force re-render when panel opens on mobile
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setForceRender(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);


  const handleNewChat = () => {
    console.log("✅ New Chat clicked!");
    if (onNewConversation) {
      onNewConversation();
    }
  };


  const handleSelectConversation = (conversation) => {
    console.log("📌 SidePanel: Selecting conversation:", conversation.id);
    if (onSelectConversation) {
      onSelectConversation(conversation);
    }
  };


  // Filter conversations based on search term
  const filteredConversations = useMemo(() => {
    if (!searchTerm.trim()) return conversations;
    
    const term = searchTerm.toLowerCase();
    return conversations.filter(conv => 
      (conv.title && conv.title.toLowerCase().includes(term)) ||
      (conv.last_message && conv.last_message.toLowerCase().includes(term))
    );
  }, [conversations, searchTerm]);


  // Toggle search and clear on close
  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchTerm("");
    }
  };


  return (
    <>
      {/* Side Panel */}
      <div
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-30 shadow-lg 
        ${isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full"} overflow-hidden`}
      >
        <div className="flex flex-col h-full w-72">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <span className="flex items-center">
                <X
                  onClick={togglePanel}
                  className="w-5 h-5 mr-2 text-gray-700 cursor-pointer hover:text-gray-900 transition"
                />
              </span>
              <span>Menu</span>
            </h2>
          </div>


          {/* Top Menu Items */}
          <div className="flex flex-col p-4 space-y-3 text-gray-700 flex-shrink-0">
            {/* New Chat Button */}
            <button 
              onClick={handleNewChat}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-blue-100 transition-all bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200"
            >
              <MessageSquarePlus className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-700">New Chat</span>
            </button>


            {/* Data Library Button */}
            <button 
              onClick={() => setLibraryOpen(true)}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-blue-100 transition-all bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200"
            >
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-700">Data Library</span>
            </button>


            {/* Search Button */}
            <button 
              onClick={handleToggleSearch}
              className={`flex items-center space-x-3 p-2 rounded-md transition-all ${
                showSearch 
                  ? 'bg-blue-200 hover:bg-blue-300 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300' 
                  : 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              <Search className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-700">Search Chats</span>
            </button>


            {/* Terms and Conditions Button */}
            <button 
              onClick={() => setTermsOpen(true)}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-blue-100 transition-all bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200"
            >
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-700">Terms and Conditions</span>
            </button>


            {/* Search Input */}
            {showSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>


          {/* Chats Header */}
          <div className="px-4 py-2 text-gray-600 font-semibold text-sm flex items-center justify-between flex-shrink-0 border-t border-gray-100">
            <span>Chats {conversations.length > 0 && `(${conversations.length})`}</span>
            {searchTerm && (
              <span className="text-xs text-blue-600">
                {filteredConversations.length} result{filteredConversations.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>


          {/* Conversations List */}
          <div key={forceRender} className="flex-1 overflow-y-auto px-3 pb-2 min-h-0">
            {isLoading ? (
              <div className="p-3 text-center text-gray-500">
                <p className="text-sm animate-pulse">Loading conversations...</p>
              </div>
            ) : !filteredConversations || filteredConversations.length === 0 ? (
              <div className="text-center text-gray-500 py-6 px-3">
                {searchTerm ? (
                  <>
                    <p className="text-sm">No conversations found</p>
                    <p className="text-xs text-gray-400 mt-2">Try a different search term</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm">No conversations yet.</p>
                    <p className="text-xs text-gray-400 mt-2">Click "New Chat" to start</p>
                  </>
                )}
              </div>
            ) : (
              <>
                {filteredConversations.map((conv, idx) => (
                  <div
                    key={conv.id || idx}
                    onClick={() => handleSelectConversation(conv)}
                    className={`p-3 rounded-lg cursor-pointer transition-all group mb-2 ${
                      currentConversation?.id === conv.id
                        ? "bg-blue-100 border border-blue-300"
                        : "hover:bg-gray-100 border border-transparent hover:border-gray-200"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {conv.title || "Untitled Chat"}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {conv.last_message || "No messages yet"}
                      </p>
                      {conv.created_at && (
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(conv.created_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>


          {/* Footer */}
          <div className="p-3 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 text-xs text-gray-600 text-center flex-shrink-0 font-medium">
            ©2025 Punchbiz | All Rights Reserved
          </div>
        </div>
      </div>


      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
          onClick={togglePanel}
        />
      )}


      {/* Library Modal */}
      {libraryOpen && (
        <Library
          isOpen={libraryOpen}
          onClose={() => setLibraryOpen(false)}
          getAuthHeaders={getAuthHeaders}
          user={user}
          chatLimits={chatLimits}
          onOpenUpgradeModal={onOpenUpgradeModal}
          onSendQuestion={onSendQuestion}
        />
      )}


      {/* Terms Modal */}
      {termsOpen && (
        <TermsModal
          isOpen={termsOpen}
          onClose={() => setTermsOpen(false)}
        />
      )}
    </>
  );
};


export default SidePanel;
