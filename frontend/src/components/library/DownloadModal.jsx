// components/library/DownloadModal.jsx
import React from 'react';
import { Download, X } from 'lucide-react';

const DownloadModal = ({ domain, onClose, onDownload }) => {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="rounded-xl p-6 max-w-md w-full border border-white/50 
                      bg-white/80 backdrop-blur-2xl shadow-2xl">
        {/* Header */}
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#5ac8fa] to-[#007aff] 
                       bg-clip-text text-transparent mb-4">
          📂 {domain.name}
        </h3>

        {/* Domain Info */}
        <div className="mb-6">
          <p className="text-black/80 mb-2">
            <span className="text-black font-semibold">{domain.file_count}</span>
          </p>
          <p className="text-black/80">
            Size: <span className="text-black font-semibold">{domain.total_size_readable}</span>
          </p>
          <p className="text-black/60 text-sm mt-3">
            Files are hosted on Google Drive. Click below to access the folder.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => onDownload('zip')}
            className="w-full bg-gradient-to-r from-[#5ac8fa] to-[#007aff] 
                       hover:from-[#007aff] hover:to-[#005bbb]
                       text-white py-3 rounded-lg transition-colors font-semibold 
                       flex items-center justify-center gap-2 shadow-md"
          >
            <Download size={18} />
            Open in Google Drive
          </button>

          <button
            onClick={onClose}
            className="w-full bg-white/70 hover:bg-white text-black/80 py-3 
                       rounded-lg transition-colors border border-white/70"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
