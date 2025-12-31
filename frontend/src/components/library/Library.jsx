// components/library/Library.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Grid, List, Crown, ChevronDown, Database } from 'lucide-react';

// Import all child components
import DomainCard from './DomainCard';
import DomainListItem from './DomainListItem';
import DownloadModal from './DownloadModal';
import RAGInfoSection from './RAGInfoSection';
import RAGConfigModal from './RAGConfigModal';
import { ITEMS_PER_PAGE } from './library-styles';

const Library = ({ 
  isOpen, 
  onClose, 
  getAuthHeaders, 
  user, 
  chatLimits, 
  onOpenUpgradeModal,
  onSendQuestion
}) => {
  // State management
  const [domains, setDomains] = useState([]);
  const [filteredDomains, setFilteredDomains] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef(null);
  
  // RAG info state
  const [ragInfo, setRagInfo] = useState(null);
  const [ragModalOpen, setRagModalOpen] = useState(false);
  const [ragLoading, setRagLoading] = useState(false);

  const isPremium = chatLimits?.remaining === -1;

  // Fetch data on open
  useEffect(() => {
    if (isOpen) {
      fetchDomains();
      fetchRagInfo();
    }
  }, [isOpen]);

  // Filter domains when search/category changes
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
    filterDomains();
  }, [searchTerm, selectedCategory, domains]);

  // API Calls
  const fetchRagInfo = async () => {
    try {
      setRagLoading(true);
      const response = await fetch('http://localhost:8000/api/rag-info', {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch RAG info');
      const data = await response.json();
      setRagInfo(data);
    } catch (error) {
      console.error('Error fetching RAG info:', error);
    } finally {
      setRagLoading(false);
    }
  };

  const fetchDomains = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/library/domains', {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch domains');
      const data = await response.json();
      setDomains(data.domains);
      setCategories(['All', ...data.categories]);
      setFilteredDomains(data.domains);
    } catch (error) {
      console.error('Error fetching domains:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDomains = () => {
    let filtered = domains;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(d => d.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredDomains(filtered);
  };

  // Event Handlers
  const handleLoadMore = () => {
    const newCount = displayCount + ITEMS_PER_PAGE;
    setDisplayCount(newCount);
    setTimeout(() => {
      if (loadMoreRef.current) {
        loadMoreRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const toggleQuestions = (domainId) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(domainId)) {
        newSet.delete(domainId);
      } else {
        newSet.add(domainId);
      }
      return newSet;
    });
  };

  const handleQuestionClick = (question) => {
    onClose();
    if (onSendQuestion) {
      onSendQuestion(question);
    }
  };

  const handleDomainClick = (domain) => {
    if (!isPremium) {
      onOpenUpgradeModal();
      return;
    }
    setSelectedDomain(domain);
    setDownloadModalOpen(true);
  };

  const handleDownload = (type) => {
    if (!selectedDomain || !isPremium) {
      setDownloadModalOpen(false);
      if (!isPremium) onOpenUpgradeModal();
      return;
    }

    try {
      const folderId = selectedDomain.gdrive_folder_id;
      if (!folderId) {
        alert(`Google Drive folder not found for ${selectedDomain.name}`);
        return;
      }

      const driveUrl = `https://drive.google.com/drive/folders/${folderId}?usp=sharing`;
      const confirmed = window.confirm(
        `This will open the ${selectedDomain.name} folder in Google Drive.\n\n` +
        `You can download all files as a ZIP from there.\n\nContinue?`
      );
      
      if (!confirmed) return;

      const newWindow = window.open(driveUrl, '_blank', 'noopener,noreferrer');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        alert('❌ Popup blocked! Please allow popups for this site and try again.');
        return;
      }

      setDownloadModalOpen(false);
      trackDownload(selectedDomain.id, type);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to open Google Drive. Please try again.');
    }
  };

  const trackDownload = async (domainId, type) => {
    try {
      await fetch(`http://localhost:8000/api/library/track-download`, {
        method: 'POST',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain_id: domainId, download_type: type })
      });
    } catch (error) {
      console.error('Error tracking download:', error);
    }
  };

  // Computed values
  const displayedDomains = filteredDomains.slice(0, displayCount);
  const hasMore = displayCount < filteredDomains.length;
  const remainingCount = filteredDomains.length - displayCount;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="rounded-2xl w-full max-w-7xl h-5/6 shadow-2xl border border-white/40 
                      bg-white/40 backdrop-blur-2xl 
                      bg-gradient-to-br from-[#B3E5FC]/80 via-[#90CAF9]/80 to-[#E3F2FD]/90 
                      flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#5ac8fa] to-[#007aff] bg-clip-text text-transparent">
                📚 Data Library
              </h2>
              {!isPremium && (
                <span className="px-3 py-1 bg-gradient-to-r from-blue-400 to-blue-500 text-white text-sm font-semibold rounded-full flex items-center gap-1 shadow-md">
                  <Crown size={14} />
                  Premium Only
                </span>
              )}
            </div>
            <button onClick={onClose} className="text-black/60 hover:text-black transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={20} />
              <input
                type="text"
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/60 border border-white/40 
                           text-black placeholder-black/40 focus:outline-none focus:border-[#007aff] focus:bg-white/80"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/60 border border-white/40 
                         text-black focus:outline-none focus:border-[#007aff]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg border ${
                  viewMode === 'grid'
                    ? 'bg-[#007aff] text-white border-[#007aff]'
                    : 'bg-white/50 text-black/60 border-white/60'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg border ${
                  viewMode === 'list'
                    ? 'bg-[#007aff] text-white border-[#007aff]'
                    : 'bg-white/50 text-black/60 border-white/60'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          <div className="mt-4 text-black/60 text-sm">
            Showing {displayedDomains.length} of {filteredDomains.length} domains
            {filteredDomains.length !== domains.length && ` (filtered from ${domains.length} total)`}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-black/80 text-xl">Loading domains...</div>
            </div>
          ) : (
            <>
              {/* RAG Info Section */}
              <RAGInfoSection 
                ragInfo={ragInfo}
                ragLoading={ragLoading}
                onClick={() => setRagModalOpen(true)}
                isPremium={isPremium}
                onUpgradeClick={onOpenUpgradeModal}
              />
              
              {/* Domains Section Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-black/80 mb-4 flex items-center gap-2">
                  <Database className="text-[#007aff]" size={24} />
                  Data Domains ({filteredDomains.length})
                </h3>
              </div>

              {/* Domain Grid or List */}
              {viewMode === 'grid' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {displayedDomains.map(domain => (
                      <DomainCard 
                        key={domain.id} 
                        domain={domain} 
                        onClick={() => handleDomainClick(domain)}
                        isPremium={isPremium}
                        isExpanded={expandedCards.has(domain.id)}
                        onToggleQuestions={() => toggleQuestions(domain.id)}
                        onQuestionClick={handleQuestionClick}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div ref={loadMoreRef} className="flex justify-center mt-8 mb-4">
                      <button
                        onClick={handleLoadMore}
                        className="px-8 py-3 bg-gradient-to-r from-[#5ac8fa] to-[#007aff] 
                                   hover:from-[#007aff] hover:to-[#005bbb]
                                   text-white font-semibold rounded-lg shadow-lg 
                                   transition-all transform hover:scale-105 flex items-center gap-2"
                      >
                        <ChevronDown size={20} />
                        Load More ({remainingCount} remaining)
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    {displayedDomains.map(domain => (
                      <DomainListItem 
                        key={domain.id} 
                        domain={domain} 
                        onClick={() => handleDomainClick(domain)}
                        isPremium={isPremium}
                        isExpanded={expandedCards.has(domain.id)}
                        onToggleQuestions={() => toggleQuestions(domain.id)}
                        onQuestionClick={handleQuestionClick}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div ref={loadMoreRef} className="flex justify-center mt-8 mb-4">
                      <button
                        onClick={handleLoadMore}
                        className="px-8 py-3 bg-gradient-to-r from-[#5ac8fa] to-[#007aff] 
                                   hover:from-[#007aff] hover:to-[#005bbb]
                                   text-white font-semibold rounded-lg shadow-lg 
                                   transition-all transform hover:scale-105 flex items-center gap-2"
                      >
                        <ChevronDown size={20} />
                        Load More ({remainingCount} remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {downloadModalOpen && selectedDomain && isPremium && (
        <DownloadModal
          domain={selectedDomain}
          onClose={() => setDownloadModalOpen(false)}
          onDownload={handleDownload}
        />
      )}

      {ragModalOpen && ragInfo && (
        <RAGConfigModal
          ragInfo={ragInfo}
          onClose={() => setRagModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Library;
