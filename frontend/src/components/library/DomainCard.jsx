// components/library/DomainCard.jsx
import React from 'react';
import { Download, Crown, ChevronDown, ChevronUp } from 'lucide-react';
import { categoryColors, buttonStyles, cardStyles } from './library-styles';

const DomainCard = ({ 
  domain, 
  onClick, 
  isPremium, 
  isExpanded, 
  onToggleQuestions, 
  onQuestionClick 
}) => {
  const hasSampleQuestions = domain.sample_questions && domain.sample_questions.length > 0;

  return (
    <div className={cardStyles.domain}>
      {/* Card Header - Clickable for download */}
      <div onClick={onClick} className="cursor-pointer">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-black font-semibold text-lg">{domain.name}</h3>
          <span className={`px-2 py-1 rounded text-xs text-white shadow-sm ${
            categoryColors[domain.category] || 'bg-gray-500'
          }`}>
            {domain.category}
          </span>
        </div>

        <p className="text-black/70 text-sm mb-3 line-clamp-2">
          {domain.description}
        </p>

        <div className="flex items-center justify-between text-sm mb-3">
          <span className="text-black/60">{domain.file_count}</span>
          <span className="text-black/60">{domain.total_size_readable}</span>
        </div>
      </div>

      {/* Sample Questions Section */}
      {hasSampleQuestions && (
        <div className="border-t border-white/30 pt-3 mb-3">
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
            <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
              {domain.sample_questions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuestionClick(q);
                  }}
                  className="text-xs text-left text-blue-600 hover:text-blue-800 
                             hover:underline block w-full p-1 rounded hover:bg-blue-50/50 transition-colors"
                >
                  • {q}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Download Button */}
      <div onClick={onClick} className="cursor-pointer">
        <button className={`w-full ${isPremium ? buttonStyles.primary : buttonStyles.primary}`}>
          {isPremium ? (
            <>
              <Download size={16} />
              Download
            </>
          ) : (
            <>
              <Crown size={16} />
              Upgrade to Download
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DomainCard;
