// components/library/RAGConfigModal.jsx
import React from 'react';
import { X, Brain, Settings, Search, Zap, List, Database } from 'lucide-react';

const RAGConfigModal = ({ ragInfo, onClose }) => {
  const config = ragInfo.configuration;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-md p-2 md:p-4">
      
      {/* ✅ Responsive Modal Container */}
      <div className="rounded-xl md:rounded-2xl w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] 
                      overflow-y-auto border border-white/50 
                      bg-white/90 backdrop-blur-2xl shadow-2xl">
        
        {/* ✅ Responsive Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#5ac8fa] to-[#007aff] 
                        p-4 md:p-6 rounded-t-xl md:rounded-t-2xl z-10">
          <div className="flex items-start md:items-center justify-between gap-2">
            
            {/* Title Section */}
            <div className="flex items-start md:items-center gap-2 md:gap-3 flex-1 min-w-0">
              <Brain className="text-white flex-shrink-0" size={24} />
              <div className="min-w-0">
                <h2 className="text-base md:text-xl lg:text-2xl font-bold text-white leading-tight">
                  RAG Model Configuration
                </h2>
                <p className="text-white/80 text-xs md:text-sm mt-0.5 md:mt-1">
                  Advanced Retrieval-Augmented Generation
                </p>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors flex-shrink-0 p-1"
              aria-label="Close"
            >
              <X size={24} className="md:w-7 md:h-7" />
            </button>
          </div>
        </div>

        {/* ✅ Responsive Content */}
        <div className="p-3 md:p-6 space-y-4 md:space-y-6">
          
          {/* LLM Configuration */}
          <ConfigSection 
            title="🤖 Language Model (LLM)"
            icon={<Brain size={20} className="text-purple-600 md:w-6 md:h-6" />}
          >
            <ConfigItem label="Model" value={config.llm.model} />
            <ConfigItem label="Provider" value={config.llm.provider} />
            <ConfigItem label="Temperature" value={config.llm.temperature} />
            <ConfigItem 
              label="Use Case" 
              value="Question answering & generation" 
              isFullWidth 
            />
          </ConfigSection>

          {/* Embeddings */}
          <ConfigSection 
            title="🧬 Embedding Model"
            icon={<Settings size={20} className="text-blue-600 md:w-6 md:h-6" />}
          >
            <ConfigItem label="Model" value={config.embeddings.model} isFullWidth />
            <ConfigItem label="Type" value={config.embeddings.type} />
            <ConfigItem 
              label="Multilingual" 
              value={config.embeddings.multilingual ? "✅ Yes" : "❌ No"} 
            />
            <ConfigItem 
              label="Purpose" 
              value="Convert text to semantic vectors" 
              isFullWidth 
            />
          </ConfigSection>

          {/* Retrieval */}
          <ConfigSection 
            title="🔍 Retrieval Configuration"
            icon={<Search size={20} className="text-cyan-600 md:w-6 md:h-6" />}
          >
            <ConfigItem label="Search Type" value={config.retrieval.search_type} isFullWidth />
            <ConfigItem label="Initial K" value={config.retrieval.initial_k} />
            <ConfigItem label="Fetch K" value={`${config.retrieval.fetch_k_multiplier}x`} />
            <ConfigItem label="Min Fetch K" value={config.retrieval.min_fetch_k} />
            <ConfigItem label="Lambda" value={config.retrieval.lambda_mult} />
            <ConfigItem 
              label="Explanation" 
              value="MMR balances relevance & diversity" 
              isFullWidth 
            />
          </ConfigSection>

          {/* Reranker */}
          <ConfigSection 
            title="🎯 Cross-Encoder Reranker"
            icon={<Zap size={20} className="text-orange-600 md:w-6 md:h-6" />}
          >
            <ConfigItem label="Model" value={config.reranker.model} isFullWidth />
            <ConfigItem label="Top N" value={config.reranker.top_n} />
            <ConfigItem 
              label="Enabled" 
              value={config.reranker.enabled ? "✅ Active" : "❌ Disabled"} 
            />
            <ConfigItem 
              label="Purpose" 
              value="Re-scores using semantic similarity" 
              isFullWidth 
            />
          </ConfigSection>

          {/* Context & Tokens */}
          <ConfigSection 
            title="📝 Context & Tokens"
            icon={<List size={20} className="text-green-600 md:w-6 md:h-6" />}
          >
            <ConfigItem 
              label="Max Tokens" 
              value={config.context.max_tokens.toLocaleString()} 
            />
            <ConfigItem 
              label="Fallback" 
              value={config.context.fallback_tokens.toLocaleString()} 
            />
            <ConfigItem 
              label="Hard Limit" 
              value={config.context.hard_limit.toLocaleString()} 
            />
            <ConfigItem 
              label="Strategy" 
              value="Dynamic truncation to prevent overflow" 
              isFullWidth 
            />
          </ConfigSection>

          {/* Database */}
          <ConfigSection 
            title="💾 Vector Database"
            icon={<Database size={20} className="text-teal-600 md:w-6 md:h-6" />}
          >
            <ConfigItem label="Type" value={config.database.type} />
            <ConfigItem label="Path" value={config.database.path} />
            <ConfigItem 
              label="Documents" 
              value={typeof config.database.document_count === 'number' 
                ? config.database.document_count.toLocaleString() 
                : config.database.document_count
              } 
            />
            <ConfigItem label="Domains" value={config.database.domains} />
          </ConfigSection>

          {/* ✅ Responsive Pipeline Features */}
          <ConfigSection 
            title="⚙️ Pipeline Features"
            icon={<Settings size={20} className="text-indigo-600 md:w-6 md:h-6" />}
          >
            <div className="col-span-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                <PipelineFeature 
                  label="Multi-Query Expansion" 
                  enabled={config.pipeline.multi_query}
                  detail={`Generates ${config.pipeline.query_variants} variants`}
                />
                <PipelineFeature 
                  label="Reranking" 
                  enabled={config.pipeline.reranking}
                  detail="Cross-encoder scoring"
                />
                <PipelineFeature 
                  label="Token Truncation" 
                  enabled={config.pipeline.token_truncation}
                  detail="Prevents overflow"
                />
                <PipelineFeature 
                  label="Text Cleaning" 
                  enabled={config.pipeline.text_cleaning}
                  detail="Removes noise"
                />
              </div>
            </div>
          </ConfigSection>

          {/* ✅ Responsive Status */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg 
                          p-3 md:p-4 border border-green-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                <span className="font-semibold text-green-800 text-sm md:text-base">
                  System Status: {ragInfo.status.toUpperCase()}
                </span>
              </div>
              <span className="text-xs md:text-sm text-green-700">
                Last Updated: {new Date(ragInfo.last_updated).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Responsive ConfigSection
const ConfigSection = ({ title, icon, children }) => (
  <div className="bg-white/60 rounded-lg p-3 md:p-5 border border-white/80 shadow-sm">
    <div className="flex items-center gap-2 mb-3 md:mb-4 pb-2 md:pb-3 border-b border-gray-200">
      {icon}
      <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-800">{title}</h3>
    </div>
    {/* ✅ 1 column on mobile, 2 on tablet+ */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
      {children}
    </div>
  </div>
);

// ✅ Responsive ConfigItem
const ConfigItem = ({ label, value, isFullWidth = false }) => (
  <div className={`${isFullWidth ? 'md:col-span-2' : ''} bg-white/80 rounded-lg p-2.5 md:p-3 border border-gray-200`}>
    <div className="text-xs md:text-sm text-gray-600 mb-1 font-medium">{label}</div>
    <div className="text-xs md:text-sm font-semibold text-gray-900 break-words">{value}</div>
  </div>
);

// ✅ Responsive PipelineFeature
const PipelineFeature = ({ label, enabled, detail }) => (
  <div className={`rounded-lg p-2.5 md:p-3 border ${
    enabled ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
  }`}>
    <div className="flex items-center gap-2 mb-1">
      <span className="text-base md:text-lg flex-shrink-0">{enabled ? '✅' : '⭕'}</span>
      <span className="text-xs md:text-sm font-semibold text-gray-800">{label}</span>
    </div>
    <p className="text-xs text-gray-600 ml-6 md:ml-7">{detail}</p>
  </div>
);

export default RAGConfigModal;
