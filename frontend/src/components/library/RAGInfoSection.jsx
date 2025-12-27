// components/library/RAGInfoSection.jsx
import React from 'react';
import { Settings, Zap, Brain } from 'lucide-react';

const RAGInfoSection = ({ ragInfo, ragLoading, onClick }) => {
  return (
    <div className="mb-6 md:mb-8">
      {/* Section Header */}
      <h3 className="text-lg md:text-xl font-bold text-black/80 mb-3 md:mb-4 flex items-center gap-2 px-2 md:px-0">
        <Brain className="text-[#007aff]" size={20} />
        AI Configuration
      </h3>
      
      {/* ✅ Mobile-Responsive RAG Info Card */}
      <div 
        onClick={onClick} 
        className="rounded-xl p-4 md:p-6 transition-all hover:shadow-xl cursor-pointer
                   bg-gradient-to-br from-blue-50/70 to-cyan-50/70 
                   border-2 border-blue-300/60 
                   hover:border-[#007aff] backdrop-blur-xl"
      >
        {/* ✅ Stack on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          
          {/* Left Content */}
          <div className="flex-1">
            {/* Title */}
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <Settings className="text-[#007aff] flex-shrink-0" size={24} />
              <h4 className="text-black font-bold text-base md:text-xl">
                RAG Model Configuration
              </h4>
            </div>
            
            {/* Description */}
            <p className="text-black/70 text-xs md:text-sm mb-3 md:mb-4">
              Multi-query retrieval with cross-encoder reranking powered by advanced AI models
            </p>

            {/* ✅ Responsive Stats Grid - 2 columns on mobile, 4 on desktop */}
            {ragInfo && ragInfo.configuration && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                <StatBox 
                  label="LLM Model" 
                  value={ragInfo.configuration.llm.model} 
                />
                <StatBox 
                  label="Embeddings" 
                  value="BGE Large EN" 
                />
                <StatBox 
                  label="Retrieval" 
                  value={`MMR (K=${ragInfo.configuration.retrieval.initial_k})`} 
                />
                <StatBox 
                  label="Documents" 
                  value={ragInfo.configuration.database.document_count.toLocaleString()} 
                />
              </div>
            )}

            {/* Loading State */}
            {ragLoading && (
              <div className="text-xs md:text-sm text-black/60">Loading configuration...</div>
            )}
          </div>

          {/* ✅ View Details Button - Full width on mobile */}
          <button className="w-full md:w-auto md:ml-4 bg-gradient-to-r from-[#5ac8fa] to-[#007aff] 
                             hover:from-[#007aff] hover:to-[#005bbb]
                             text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition-all 
                             flex items-center justify-center gap-2 shadow-lg whitespace-nowrap
                             text-sm md:text-base font-medium">
            <Zap size={16} className="md:w-[18px] md:h-[18px]" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Mobile-Responsive StatBox
const StatBox = ({ label, value }) => (
  <div className="bg-white/50 rounded-lg p-2 md:p-3 border border-white/60">
    <div className="text-[10px] md:text-xs text-black/60 mb-0.5 md:mb-1 font-medium truncate">
      {label}
    </div>
    <div className="text-xs md:text-sm font-semibold text-black truncate" title={value}>
      {value}
    </div>
  </div>
);

export default RAGInfoSection;
