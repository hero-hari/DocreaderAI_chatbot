// components/layout/TermsModal.jsx
import React, { useState } from 'react';
import { X, FileText, Shield, ScrollText } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('privacy');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4">
      <div className="rounded-2xl w-full max-w-5xl max-h-[90vh] shadow-2xl border border-white/40 
                      bg-white/95 backdrop-blur-2xl flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5ac8fa] to-[#007aff] p-4 md:p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-white" size={24} />
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Legal Information
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

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-4 md:px-6">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 ${
              activeTab === 'privacy'
                ? 'border-[#007aff] text-[#007aff]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Shield size={18} />
            <span className="hidden sm:inline">Privacy Policy</span>
            <span className="sm:hidden">Privacy</span>
          </button>
          
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 ${
              activeTab === 'terms'
                ? 'border-[#007aff] text-[#007aff]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText size={18} />
            <span className="hidden sm:inline">Terms & Conditions</span>
            <span className="sm:hidden">T&C</span>
          </button>
          
          <button
            onClick={() => setActiveTab('service')}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 ${
              activeTab === 'service'
                ? 'border-[#007aff] text-[#007aff]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <ScrollText size={18} />
            <span className="hidden sm:inline">Terms of Service</span>
            <span className="sm:hidden">ToS</span>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="prose prose-sm md:prose-base max-w-none">
            
            {/* PRIVACY POLICY TAB */}
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">PRIVACY STATEMENT</h2>
                <p className="text-sm text-gray-600 mb-6">
                  <strong>Effective Date:</strong> 03/01/2026<br />
                  <strong>Last Updated:</strong> 03/01/2026
                </p>
                
                <hr className="my-6" />

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    When you purchase something/service from our App, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    When you browse our App, we also automatically receive your computer's internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system, if Necessary.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Email marketing (if applicable):</strong> With your permission, we may send you emails about our App/store, new products, Services and other updates.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 2 - CONSENT</h3>
                  <p className="text-gray-700 font-semibold mb-2">How do you get my consent?</p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    When you provide us with personal information to complete a transaction, verify your credit card, place an order or place an order or arrange for a delivery or return a purchase or use our service, we imply that you consent to our collecting it and using it for that specific reason only.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.
                  </p>
                  
                  <p className="text-gray-700 font-semibold mb-2">How do I withdraw my consent?</p>
                  <p className="text-gray-700 leading-relaxed">
                    If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at any time, by contacting/mailing us at <a href="mailto:docsreadersibiz@gmail.com" className="text-blue-600 hover:underline">docsreadersibiz@gmail.com</a> for users.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 3 - DISCLOSURE</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 4 - PAYMENT</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    For more insight, you may also want to read terms and conditions of razorpay on <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://razorpay.com</a>
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 5 - THIRD-PARTY SERVICES</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    In particular, remember that certain providers may be located in or have facilities that are located in a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Once you leave our App/site or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website's Terms of Service.
                  </p>
                  <p className="text-gray-700 font-semibold mb-2">Links</p>
                  <p className="text-gray-700 leading-relaxed">
                    When you click on links on our App/site, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 6 - SECURITY</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 7 - COOKIES</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We use cookies to maintain the session of your user. It is not used to personally identify you on other websites.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 8 - AGE OF CONSENT</h3>
                  <p className="text-gray-700 leading-relaxed">
                    By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this App/site.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 9 - CHANGES TO THIS PRIVACY POLICY</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the App/website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    If our Company/App/Services is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">QUESTIONS AND CONTACT INFORMATION</h3>
                  <p className="text-gray-700 leading-relaxed">
                    If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information, kindly contact/mail us at <a href="mailto:docsreadersibiz@gmail.com" className="text-blue-600 hover:underline">docsreadersibiz@gmail.com</a> for users.
                  </p>
                </section>
              </div>
            )}

            {/* TERMS & CONDITIONS TAB */}
            {activeTab === 'terms' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">TERMS AND CONDITIONS FOR USERS</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">DOCREADER AI (INDIA)</h3>
                <p className="text-sm text-gray-600 mb-6">
                  <strong>Effective Date:</strong> 01/04/2025<br />
                  <strong>Last Updated:</strong> 01/04/2025
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  These Terms and Conditions ("Terms") govern access to and use of the Docreader AI web application and services ("Platform", "we", "us", "our") by users ("you", "your", "User") who purchase or access structured, scraped, and processed datasets for research, analytics, and machine learning purposes.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 font-semibold">
                  By accessing or using Docreader AI, you agree to be bound by these Terms.
                </p>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">1. ELIGIBILITY & ACCOUNT REGISTRATION</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">To use Docreader AI, you must:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Be at least 18 years of age.</li>
                    <li>Register with accurate and complete personal or organizational details.</li>
                    <li>Represent that you are legally authorized to enter into this agreement if acting on behalf of an institution or company.</li>
                    <li>Maintain the confidentiality of your account credentials and be responsible for all activity under your account.</li>
                  </ul>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">2. SERVICE DESCRIPTION</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">Docreader AI provides:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                    <li>Access to web-scraped, structured, and curated datasets sourced from publicly available Indian web data.</li>
                    <li>Data intended for:
                      <ul className="list-circle list-inside ml-6 mt-1">
                        <li>Research</li>
                        <li>Analytics</li>
                        <li>Machine Learning / LLM training</li>
                        <li>Academic or internal commercial use (subject to user terms)</li>
                      </ul>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Docreader AI does not provide real-time data guarantees and does not claim ownership of original source content.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">3. DATA SOURCING & DISCLAIMERS</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Data is collected through automated web scraping, crawling, and processing from publicly accessible sources.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">Docreader AI does not guarantee:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                    <li>Completeness</li>
                    <li>Accuracy</li>
                    <li>Timeliness</li>
                    <li>Freedom from errors or omissions</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Source websites may change, restrict access, or remove content at any time.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Users acknowledge that scraped data may contain noise, inconsistencies, or outdated information.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">4. PERMITTED USE & LICENSE</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Upon successful payment, Docreader AI grants you a limited, non-exclusive, non-transferable license to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                    <li>Use the purchased datasets for:
                      <ul className="list-circle list-inside ml-6 mt-1">
                        <li>Research</li>
                        <li>Internal analytics</li>
                        <li>Model training (including LLMs)</li>
                      </ul>
                    </li>
                    <li>Store and process data within your systems.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mb-2">You may not:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Resell, sublicense, or redistribute the data as a standalone product.</li>
                    <li>Publicly publish raw datasets without transformation or aggregation.</li>
                    <li>Use the data for illegal, deceptive, or unethical purposes.</li>
                    <li>Represent the data as proprietary or exclusively owned by you.</li>
                  </ul>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">5. PAYMENT & ACCESS</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Users pay only for the scraped and processed data, not for original source ownership.</li>
                    <li>Pricing is displayed clearly before purchase.</li>
                    <li>Payments are processed securely via supported payment gateways.</li>
                    <li>Access to datasets is granted after successful payment confirmation.</li>
                    <li>All purchases are final unless otherwise stated.</li>
                  </ul>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">6. REFUND POLICY</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Due to the digital and downloadable nature of the datasets:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                    <li>No refunds will be issued once data access is granted.</li>
                    <li>Exceptions may be considered only in cases of:
                      <ul className="list-circle list-inside ml-6 mt-1">
                        <li>Duplicate billing</li>
                        <li>Technical failure preventing data access</li>
                      </ul>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Refund decisions are at the sole discretion of Docreader AI.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">7. USER RESPONSIBILITIES & COMPLIANCE</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">You agree to:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Ensure compliance with:
                      <ul className="list-circle list-inside ml-6 mt-1">
                        <li>Indian IT laws</li>
                        <li>Data protection regulations</li>
                        <li>AI and ML usage policies applicable to your jurisdiction</li>
                      </ul>
                    </li>
                    <li>Use the data responsibly and ethically.</li>
                    <li>Not attempt to reverse engineer Docreader AI's scraping, ranking, or processing systems.</li>
                    <li>Not misuse the platform through scraping, automation, or system abuse.</li>
                  </ul>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">8. DATA PRIVACY & PERSONAL DATA</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Docreader AI does not intentionally scrape private, restricted, or confidential information.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    If personal data appears within datasets:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                    <li>It is derived from publicly available sources.</li>
                    <li>Users are solely responsible for lawful handling, anonymization, and compliance.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Docreader AI disclaims responsibility for downstream misuse of data by users.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">9. INTELLECTUAL PROPERTY</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    The platform software, data pipelines, processing logic, UI, and branding are the intellectual property of Docreader AI.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">Users retain ownership of:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                    <li>Models</li>
                    <li>Research outputs</li>
                    <li>Derived insights created using the data</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    No ownership rights to source content or scraping infrastructure are transferred.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">10. LIMITATION OF LIABILITY</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    To the maximum extent permitted by law:
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">Docreader AI shall not be liable for:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                    <li>Model bias, hallucinations, or downstream AI behavior</li>
                    <li>Regulatory violations arising from user misuse</li>
                    <li>Business losses, data loss, or reputational damage</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    All data is provided "as-is" and "as-available."
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">11. ACCOUNT SUSPENSION & TERMINATION</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Docreader AI may suspend or terminate access for:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                    <li>Violation of these Terms</li>
                    <li>Illegal or unethical use of data</li>
                    <li>Payment fraud or chargebacks</li>
                    <li>Platform misuse or security threats</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Termination does not entitle users to refunds.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">12. MODIFICATIONS TO SERVICE OR TERMS</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">Docreader AI reserves the right to:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                    <li>Modify datasets, features, or pricing</li>
                    <li>Update these Terms at any time</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Continued use of the platform constitutes acceptance of updated Terms.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">13. GOVERNING LAW & JURISDICTION</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    These Terms are governed by the laws of India.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Any disputes shall fall under the exclusive jurisdiction of courts in Salem, Tamil Nadu, India.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">14. CONTACT INFORMATION</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    For support, queries, or complaints:
                  </p>
                  <ul className="list-none text-gray-700 space-y-1">
                    <li>📧 Email: <a href="mailto:docsreadersibiz@gmail.com" className="text-blue-600 hover:underline">docsreadersibiz@gmail.com</a></li>
                    <li>📞 Phone: +91-8248708300</li>
                    <li>🕙 Support Hours: Mon–Fri | 10:00 AM – 6:00 PM</li>
                  </ul>
                </section>
              </div>
            )}

            {/* TERMS OF SERVICE TAB */}
            {activeTab === 'service' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">TERMS OF SERVICE</h2>
                <p className="text-sm text-gray-600 mb-6">
                  <strong>Effective Date:</strong> 03/01/2026<br />
                  <strong>Last Updated:</strong> 03/01/2026
                </p>
                
                <hr className="my-6" />

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">OVERVIEW</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    This website is operated by PunchBiz. Throughout the site, the terms "we", "us" and "our" refer to PunchBiz. PunchBiz offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    By visiting our site/App and/ or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website/App. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website/App following the posting of any changes constitutes acceptance of those changes.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 1 - ONLINE STORE TERMS</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You must not transmit any worms or viruses or any code of a destructive nature.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    A breach or violation of any of the Terms will result in an immediate termination of your Services.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 2 - GENERAL CONDITIONS</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We reserve the right to refuse service to anyone for any reason at any time.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website/App through which the service is provided, without express written permission by us.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site/App is at your own risk.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    This site/App may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site/App at any time, but we have no obligation to update any information on our site/App. You agree that it is your responsibility to monitor changes to our site/App.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Prices for our products are subject to change without notice.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 5 - PRODUCTS OR SERVICES</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Certain products or services may be available exclusively online through the website/App. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at any time without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We reserve the right to refuse any order or service you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders or services placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    For more detail, please review our Returns Policy on particular pages in the site/App.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 7 - OPTIONAL TOOLS</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You acknowledge and agree that we provide access to such tools "as is" and "as available" without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Any use by you of optional tools offered through the site/App is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We may also, in the future, offer new services and/or features through the website/App (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 8 - THIRD-PARTY LINKS</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Certain content, products and services available via our Service may include materials from third-parties.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Third-party links on this site may direct you to third-party websites/Apps that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites/Apps, or for any other materials, products, or services of third-parties.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites/Apps. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website/App. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 10 - PERSONAL INFORMATION</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Your submission of personal information through the store is governed by our Privacy Policy.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website/App is inaccurate at any time without prior notice (including after you have submitted your order).
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We undertake no obligation to update, amend or clarify information in the Service or on any related website/App, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website/App, should be taken to indicate that all information in the Service or on any related website/App has been modified or updated.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 12 - PROHIBITED USES</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site/App or its content:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                    <li>(a) for any unlawful purpose;</li>
                    <li>(b) to solicit others to perform or participate in any unlawful acts;</li>
                    <li>(c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;</li>
                    <li>(d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
                    <li>(e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;</li>
                    <li>(f) to submit false or misleading information;</li>
                    <li>(g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet;</li>
                    <li>(h) to collect or track the personal information of others;</li>
                    <li>(i) to spam, phish, pharm, pretext, spider, crawl, or scrape;</li>
                    <li>(j) for any obscene or immoral purpose;</li>
                    <li>(k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    In no case shall PunchBiz, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 14 - INDEMNIFICATION</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You agree to indemnify, defend and hold harmless PunchBiz and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 15 - SEVERABILITY</h3>
                  <p className="text-gray-700 leading-relaxed">
                    In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 16 - TERMINATION</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site/App.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 17 - ENTIRE AGREEMENT</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    These Terms of Service and any policies or operating rules posted by us on this site/App or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 18 - GOVERNING LAW</h3>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India and jurisdiction of Salem, Tamil Nadu.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 19 - CHANGES TO TERMS OF SERVICE</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You can review the most current version of the Terms of Service at any time at this page.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website/App periodically for changes. Your continued use of or access to our website/App or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
                  </p>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">SECTION 20 - CONTACT INFORMATION</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Questions about the Terms of Service should be sent to us at <a href="mailto:docsreadersibiz@gmail.com" className="text-blue-600 hover:underline">docsreadersibiz@gmail.com</a> for users or at <a href="mailto:thepunchbiz@gmail.com" className="text-blue-600 hover:underline">thepunchbiz@gmail.com</a>.
                  </p>
                </section>
              </div>
            )}

            {/* Last Updated Footer */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 text-center">
                {activeTab === 'privacy' && 'Last Updated: January 03, 2026'}
                {activeTab === 'terms' && 'Last Updated: January 04, 2025'}
                {activeTab === 'service' && 'Last Updated: January 03, 2026'}
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
