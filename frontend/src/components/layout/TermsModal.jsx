// components/layout/TermsModal.jsx
import React from 'react';
import { X, FileText } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4">
      <div className="rounded-2xl w-full max-w-3xl max-h-[90vh] shadow-2xl border border-white/40 
                      bg-white/95 backdrop-blur-2xl flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5ac8fa] to-[#007aff] p-4 md:p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-white" size={24} />
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Terms and Conditions
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="prose prose-sm md:prose-base max-w-none">
            
            {/* ✅ Replace this section with your actual Terms & Conditions */}
            <section className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">1. Acceptance of Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using DocReaderAI, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms and Conditions.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">2. Service Description</h3>
              <p className="text-gray-700 leading-relaxed">
                DocReaderAI provides an AI-powered document analysis and chat service. The service 
                uses advanced RAG (Retrieval-Augmented Generation) technology to answer questions 
                based on a curated knowledge base.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">3. User Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You must provide accurate information during registration</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You agree not to misuse the service or attempt to disrupt its functionality</li>
                <li>You will not use the service for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">4. Free vs Premium Users</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Free Users:</strong> Limited to 10 chats per day. Access to basic features only.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Premium Users:</strong> Unlimited chats, access to data library downloads, 
                and detailed AI configuration information.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">5. Data Privacy</h3>
              <p className="text-gray-700 leading-relaxed">
                We respect your privacy. All conversations are stored securely in Firebase. 
                We do not share your personal information with third parties without your consent.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">6. Intellectual Property</h3>
              <p className="text-gray-700 leading-relaxed">
                All content, features, and functionality of DocReaderAI are owned by Punchbiz and 
                protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">7. Limitation of Liability</h3>
              <p className="text-gray-700 leading-relaxed">
                DocReaderAI is provided "as is" without warranties of any kind. We are not liable 
                for any damages arising from the use or inability to use the service.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">8. Changes to Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the service 
                after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">9. Contact Information</h3>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms and Conditions, please contact us at: 
                <strong> support@punchbiz.com</strong>
              </p>
            </section>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 text-center">
                Last Updated: December 31, 2025
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-[#5ac8fa] to-[#007aff] 
                       hover:from-[#007aff] hover:to-[#005bbb]
                       text-white font-medium rounded-lg transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
