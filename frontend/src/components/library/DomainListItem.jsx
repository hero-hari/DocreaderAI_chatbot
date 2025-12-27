// components/library/DomainListItem.jsx
import React from 'react';
import { Download, Crown, ChevronDown, ChevronUp } from 'lucide-react';
import { cardStyles, buttonStyles } from './library-styles';

const DomainListItem = ({ 
  domain, 
  onClick, 
  isPremium, 
  isExpanded, 
  onToggleQuestions, 
  onQuestionClick 
}) => {
  const hasSampleQuestions = domain.sample_questions && domain.sample_questions.length > 0;

  return (
    <div className={cardStyles.listItem}>
      {/* Main content - Clickable for download */}
      <div onClick={onClick} className="cursor-pointer flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-black font-semibold">{domain.name}</h3>
            <span className="px-2 py-1 bg-white/80 rounded text-xs text-black/70 border border-white/70">
              {domain.category}
            </span>
          </div>
          <p className="text-black/70 text-sm mt-1">{domain.description}</p>
        </div>

        <div className="flex items-center gap-6 ml-4">
          <div className="text-right">
            <div className="text-black font-medium">{domain.file_count}</div>
            <div className="text-black/60 text-sm">{domain.total_size_readable}</div>
          </div>

          <button className={`px-4 ${isPremium ? buttonStyles.primary : buttonStyles.upgrade} whitespace-nowrap`}>
            {isPremium ? (
              <>
                <Download size={16} />
                Download
              </>
            ) : (
              <>
                <Crown size={16} />
                Upgrade
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sample Questions Section */}
      {hasSampleQuestions && (
        <div className="border-t border-white/30 pt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleQuestions();
            }}
            className="w-full text-sm text-black/70 hover:text-black flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              📝 Sample Questions ({domain.sample_questions.length})
            </span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {isExpanded && (
            <div className="mt-2 space-y-2">
              {domain.sample_questions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuestionClick(q);
                  }}
                  className="text-sm text-left text-blue-600 hover:text-blue-800 
                             hover:underline block w-full p-1 rounded hover:bg-blue-50/50 transition-colors"
                >
                  • {q}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DomainListItem;
