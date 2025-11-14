// components/library/Library.jsx
import React, { useState, useEffect } from 'react';
import { Search, Download, X, Filter, Grid, List } from 'lucide-react';

const Library = ({ isOpen, onClose, getAuthHeaders }) => {
  const [domains, setDomains] = useState([]);
  const [filteredDomains, setFilteredDomains] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  // Fetch domains on mount
  useEffect(() => {
    if (isOpen) {
      fetchDomains();
    }
  }, [isOpen]);

  // Filter domains when search/category changes
  useEffect(() => {
    filterDomains();
  }, [searchTerm, selectedCategory, domains]);

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

  const handleDomainClick = (domain) => {
    setSelectedDomain(domain);
    setDownloadModalOpen(true);
  };

  // ✅ UPDATED: Open Google Drive directly
  const handleDownload = (type) => {
    if (!selectedDomain) return;

    try {
      // Check if domain has Google Drive folder ID
      const folderId = selectedDomain.gdrive_folder_id;
      
      if (!folderId) {
        alert(`Google Drive folder not found for ${selectedDomain.name}`);
        return;
      }

      // ✅ Build Google Drive URL directly
      const driveUrl = `https://drive.google.com/drive/folders/${folderId}?usp=sharing`;
      
      // Show confirmation message
      const message = type === 'zip'
        ? `This will open the ${selectedDomain.name} folder in Google Drive.\n\nYou can download all files as a ZIP from there.\n\nContinue?`
        : `This will open the ${selectedDomain.name} folder in Google Drive.\n\nYou can select and download files from there.\n\nContinue?`;
      
      const confirmed = window.confirm(message);
      
      if (!confirmed) {
        return;
      }

      // ✅ Open Google Drive in new tab
      const newWindow = window.open(driveUrl, '_blank', 'noopener,noreferrer');
      
      // Check if popup was blocked
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        alert('❌ Popup blocked!\n\nPlease allow popups for this site and try again.');
        return;
      }

      // Close modal
      setDownloadModalOpen(false);

      // Optional: Track download (call backend to log)
      trackDownload(selectedDomain.id, type);

    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to open Google Drive. Please try again.');
    }
  };

  // Optional: Track downloads in backend
  const trackDownload = async (domainId, type) => {
    try {
      await fetch(`http://localhost:8000/api/library/track-download`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ domain_id: domainId, download_type: type })
      });
    } catch (error) {
      console.error('Error tracking download:', error);
      // Non-critical, don't show error to user
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl w-full max-w-7xl h-5/6 shadow-2xl border border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-white">📚 Data Library</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            Showing {filteredDomains.length} of {domains.length} domains
          </div>
        </div>

        {/* Domain Grid/List */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-white text-xl">Loading domains...</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDomains.map(domain => (
                <DomainCard key={domain.id} domain={domain} onClick={() => handleDomainClick(domain)} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredDomains.map(domain => (
                <DomainListItem key={domain.id} domain={domain} onClick={() => handleDomainClick(domain)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Download Modal */}
      {downloadModalOpen && selectedDomain && (
        <DownloadModal
          domain={selectedDomain}
          onClose={() => setDownloadModalOpen(false)}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

// Domain Card Component
const DomainCard = ({ domain, onClick }) => {
  const categoryColors = {
    'Government': 'bg-blue-500',
    'Economic': 'bg-green-500',
    'Social': 'bg-purple-500',
    'Technology': 'bg-cyan-500',
    'Infrastructure': 'bg-orange-500',
    'Environment': 'bg-teal-500',
    'Rural': 'bg-yellow-500',
    'Cultural': 'bg-pink-500',
    'Media': 'bg-red-500',
    'Entertainment': 'bg-indigo-500'
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 cursor-pointer transition-all hover:shadow-lg hover:transform hover:scale-105"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-white font-semibold text-lg">{domain.name}</h3>
        <span className={`px-2 py-1 rounded text-xs text-white ${categoryColors[domain.category] || 'bg-gray-600'}`}>
          {domain.category}
        </span>
      </div>
      
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{domain.description}</p>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{domain.file_count}</span>
        <span className="text-gray-500">{domain.total_size_readable}</span>
      </div>
      
      <button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        <Download size={16} />
        Download
      </button>
    </div>
  );
};

// Domain List Item Component
const DomainListItem = ({ domain, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 cursor-pointer transition-all flex items-center justify-between"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="text-white font-semibold">{domain.name}</h3>
          <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">{domain.category}</span>
        </div>
        <p className="text-gray-400 text-sm mt-1">{domain.description}</p>
      </div>
      
      <div className="flex items-center gap-6 ml-4">
        <div className="text-right">
          <div className="text-white font-medium">{domain.file_count}</div>
          <div className="text-gray-500 text-sm">{domain.total_size_readable}</div>
        </div>
        
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          <Download size={16} />
          Download
        </button>
      </div>
    </div>
  );
};

// Download Modal Component
const DownloadModal = ({ domain, onClose, onDownload }) => {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-gray-700">
        <h3 className="text-2xl font-bold text-white mb-4">📂 {domain.name}</h3>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-2">
            <span className="text-white font-semibold">{domain.file_count}</span>
          </p>
          <p className="text-gray-300">
            Size: <span className="text-white font-semibold">{domain.total_size_readable}</span>
          </p>
          <p className="text-gray-400 text-sm mt-3">
            Files are hosted on Google Drive. Click below to access the folder.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onDownload('zip')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Open in Google Drive
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Library;
