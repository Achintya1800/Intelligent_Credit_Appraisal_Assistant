import React, { useState } from 'react';
import { Search, Filter, Plus, Upload, ArrowLeft, X, CheckCircle, Clock } from 'lucide-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard', 'newApplication', 'uploading', 'cmDashboard', 'camGeneration', 'creditApproval'
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [isDocumentsApproved, setIsDocumentsApproved] = useState(false);
  const [camProgress, setCamProgress] = useState(0);
  const [showEmailNotification, setShowEmailNotification] = useState(false);
  const [applications, setApplications] = useState([
    {
      id: 'APP001',
      applicant: 'Sharma Industries Pvt Ltd',
      amount: '₹25,00,000',
      program: 'Term Loan',
      status: 'In Progress',
      progress: 85
    },
    {
      id: 'APP002',
      applicant: 'Tech Solutions Inc',
      amount: '₹50,00,000',
      program: 'Working Capital',
      status: 'Pending',
      progress: 35
    },
    {
      id: 'APP003',
      applicant: 'Manufacturing Co.',
      amount: '₹1,00,00,000',
      program: 'Equipment Loan',
      status: 'Verified',
      progress: 55
    },
    {
      id: 'APP004',
      applicant: 'Export Business Ltd',
      amount: '₹75,00,000',
      program: 'LC Limit',
      status: 'In Progress',
      progress: 10
    }
  ]);

  const documentChecklist = [
    { name: 'Periods Report', status: 'uploaded' },
    { name: 'Bank Statements', status: 'uploaded' },
    { name: 'GST Reports', status: 'uploaded' },
    { name: 'Shareholding Certificates', status: 'uploaded' },
    { name: 'Anchor Certificates', status: 'uploaded' },
    { name: 'BI Reports', status: 'uploaded' },
    { name: 'Consumer CIBIL', status: 'uploaded' },
    { name: 'Commercial CIBIL', status: 'uploaded' },
    { name: 'Udyam Regst Certificate', status: 'uploaded' },
    { name: 'Audit Reports', status: 'uploaded' }
  ];

  const handleNewApplicationClick = () => {
    setCurrentScreen('newApplication');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setSelectedFiles(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  const handleUpload = () => {
    if (selectedFiles) {
      setCurrentScreen('uploading');
      
      // Simulate upload process
      setTimeout(() => {
        // Add new application entry
        const newApplication = {
          id: 'APP005',
          applicant: 'Vishnu Packwell Pvt Ltd',
          amount: '₹35,00,000',
          program: 'Term Loan',
          status: isDocumentsApproved ? 'Verified' : 'New',
          progress: 0
        };
        
        setApplications(prev => [newApplication, ...prev]);
        setCurrentScreen('dashboard');
        setSelectedFiles(null);
      }, 3000); // 3 second upload simulation
    }
  };

  const handleVerifyDocuments = () => {
    setShowVerifyPopup(true);
  };

  const closeVerifyPopup = () => {
    setShowVerifyPopup(false);
  };

  const handleApproveDocuments = () => {
    setIsDocumentsApproved(true);
    setApplications(prev => 
      prev.map(app => 
        app.applicant === 'Vishnu Packwell Pvt Ltd' 
          ? { ...app, status: 'Verified', progress: 100 }
          : app
      )
    );
    setShowVerifyPopup(false);
  };

  const handleCMQueue = () => {
    setCurrentScreen('cmDashboard');
  };

  const handleBackFromCM = () => {
    setCurrentScreen('dashboard');
  };

  const handleGenerateCAM = () => {
    setCurrentScreen('camGeneration');
    setCamProgress(0);
    
    // Simulate progressive CAM generation
    const progressSteps = [
      { progress: 25, delay: 1000 },
      { progress: 50, delay: 2000 },
      { progress: 75, delay: 3000 },
      { progress: 100, delay: 4000 }
    ];

    progressSteps.forEach(({ progress, delay }) => {
      setTimeout(() => {
        setCamProgress(progress);
        if (progress === 100) {
          setTimeout(() => {
            setCurrentScreen('creditApproval');
            setShowEmailNotification(true);
            // Hide email notification after 5 seconds
            setTimeout(() => {
              setShowEmailNotification(false);
            }, 5000);
          }, 1000);
        }
      }, delay);
    });
  };

  // Upload Animation Screen
  if (currentScreen === 'uploading') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-red-600 font-bold text-lg">
                  ADITYA BIRLA<br />
                  <span className="text-red-700">CAPITAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Animation Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Uploading Documents</h2>
            <p className="text-gray-600 mb-4">Please wait, documents are uploading...</p>
            <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
              <div className="bg-red-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CAM Generation Screen
  if (currentScreen === 'camGeneration') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-red-600 font-bold text-lg">
                  ADITYA BIRLA<br />
                  <span className="text-red-700">CAPITAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CAM Generation Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
          <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ABC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Automated Credit Assessment Memo Solution</h1>
                <p className="text-gray-600">Fully automated Agentic AI + Gen AI based CAM ++ Generation Solution</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-red-600 h-3 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${camProgress}%` }}
                ></div>
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{camProgress}% Complete</h2>
                {camProgress === 100 ? (
                  <p className="text-green-600 font-medium">Complete CAM generated successfully!</p>
                ) : (
                  <p className="text-blue-600 font-medium">Generating CAM...</p>
                )}
              </div>
            </div>

            {/* Success Icon - Only show when complete */}
            {camProgress === 100 && (
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">CAM Generation Complete!</h3>
                <p className="text-gray-600">Redirecting to Credit Approval Dashboard...</p>
              </div>
            )}

            {/* Process Steps */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-500 ${
                  camProgress >= 25 ? 'bg-green-600' : 'bg-gray-300'
                }`}>
                  {camProgress >= 25 ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Reading Documents</h4>
              </div>
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-500 ${
                  camProgress >= 50 ? 'bg-green-600' : 'bg-gray-300'
                }`}>
                  {camProgress >= 50 ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Building Basic CAM</h4>
              </div>
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-500 ${
                  camProgress >= 75 ? 'bg-green-600' : 'bg-gray-300'
                }`}>
                  {camProgress >= 75 ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Financial Plotting</h4>
              </div>
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-500 ${
                  camProgress >= 100 ? 'bg-green-600' : 'bg-gray-300'
                }`}>
                  {camProgress >= 100 ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Generating CAM Report</h4>
              </div>
            </div>

            {/* Description */}
            <div className="text-center text-gray-600 text-sm">
              <p>Takes input from Bank Statements, Perfios Reports, Consumer and Commercial CIBIL, Share Holding Certificates, GST Filing Reports ... in PDF, XLSX, MSG, HTML Formats</p>
            </div>

            {/* Processing Status */}
            <div className="text-right mt-6">
              <p className="text-gray-500 text-sm">
                {camProgress < 100 ? 'Processing... Please wait' : 'Processing complete!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Credit Approval Dashboard Screen
  if (currentScreen === 'creditApproval') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-red-600 font-bold text-lg">
                  ADITYA BIRLA<br />
                  <span className="text-red-700">CAPITAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Notification */}
        {showEmailNotification && (
          <div className="fixed top-20 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 max-w-sm animate-slide-in">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">CAM Generated Successfully!</h4>
                <p className="text-gray-600 text-xs mt-1">Credit Assessment Memorandum has been generated and sent to the credit manager's email ID.</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Left Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Credit Approval Dashboard</h2>
            <p className="text-gray-500 text-sm mb-8">Review and make final decision on credit application</p>

            {/* Application Summary */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Application Summary</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Applicant</p>
                  <p className="font-medium text-gray-900">Vishnu Packwell Pvt Ltd</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Loan Amount</p>
                  <p className="font-medium text-gray-900">₹35,00,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Purpose</p>
                  <p className="font-medium text-gray-900">Working Capital & Equipment</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tenure</p>
                  <p className="font-medium text-gray-900">60 Months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interest Rate</p>
                  <p className="font-medium text-gray-900">12.5% p.a.</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Risk Rating</p>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      BB+
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Security</p>
                  <p className="font-medium text-gray-900">Property Mortgage (₹45L)</p>
                </div>
              </div>
            </div>

            {/* Decision Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="font-semibold text-gray-900">Decision</h3>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Approve</span>
                </button>
                
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-md font-medium flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Send Back</span>
                </button>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Reject</span>
                </button>
              </div>
            </div>

            {/* Comments */}
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">Comments</p>
              <textarea
                placeholder="Add your decision comments here..."
                className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-6">
            <div className="bg-white rounded-lg border border-gray-200 h-full">
              {/* CAM Document Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Credit Assessment Memorandum</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    CAM Document
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Pages:</span>
                    <button className="w-8 h-8 bg-red-600 text-white rounded text-xs font-medium">1</button>
                    <button className="w-8 h-8 border border-gray-300 rounded text-xs hover:bg-gray-50">2</button>
                    <button className="w-8 h-8 border border-gray-300 rounded text-xs hover:bg-gray-50">3</button>
                    <span className="text-xs">Page 1 of 3</span>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span>Fit to width</span>
                  </button>
                  <div className="text-sm text-gray-500">
                    Zoom: 100%
                  </div>
                </div>
              </div>

              {/* CAM Document Content */}
              <div className="p-8 h-full overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Credit Assessment Memo</h1>
                    <p className="text-gray-600">Application No: CAM-2024-001</p>
                  </div>

                  {/* Section 1: Borrower's Profile */}
                  <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">SECTION 1: Borrower's Profile</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Legal Name of Business:</h3>
                        <p className="text-blue-600 mb-4">Vishnu Packwell Private Limited</p>
                        
                        <h3 className="font-semibold text-gray-900 mb-2">Name of Key Promoters:</h3>
                        <p className="text-gray-700 mb-4">Ankit Babbar, Ritu Babbar</p>
                        
                        <h3 className="font-semibold text-gray-900 mb-2">Constitution:</h3>
                        <p className="text-blue-600">Private Limited Company</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Date of Incorporation:</h3>
                        <p className="text-gray-700 mb-4">18/09/2017</p>
                        
                        <h3 className="font-semibold text-gray-900 mb-2">GST Number(s):</h3>
                        <p className="text-gray-700 mb-4">09AAGCV1053MTZJ</p>
                        
                        <h3 className="font-semibold text-gray-900 mb-2">Udyam Number:</h3>
                        <p className="text-blue-600">UDYAM-DL-06-0023062</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Business Profile */}
                  <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">SECTION 2: Business Profile</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">GST Registered Address:</h3>
                        <p className="text-blue-600">Industrial Plot No. B-79, Sector-80, Gautambuddha Nagar, Uttar Pradesh, 201301</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Nature of Business:</h3>
                        <span className="text-gray-700">Manufacturing</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Property Type:</h3>
                        <span className="text-blue-600">Industrial</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Financial Analysis */}
                  <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">SECTION 3: Financial Analysis</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Revenue Analysis:</h3>
                        <p className="text-gray-700">Financial statements show consistent growth with a CAGR of 18.5% over the past three years. The company has maintained stable margins despite market volatility.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Profitability:</h3>
                        <p className="text-gray-700">EBITDA margins have improved from 12% to 15% indicating efficient cost management and operational excellence.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Cash Flow:</h3>
                        <p className="text-gray-700">Strong operational cash generation with positive free cash flows across all review periods, ensuring adequate debt servicing capability.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Working Capital:</h3>
                        <p className="text-blue-600">Well-managed working capital cycle with optimized inventory turnover and receivables collection.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CM Dashboard Screen
  if (currentScreen === 'cmDashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-red-600 font-bold text-lg">
                  ADITYA BIRLA<br />
                  <span className="text-red-700">CAPITAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-6">
          {/* Dashboard Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-red-600 mb-2">CM Dashboard</h1>
              <p className="text-gray-500">Review and process credit applications</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search Applications....."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Filter size={16} />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Application ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Applicant</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Program</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">APP005</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Vishnu Packwell Pvt Ltd</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹35,00,000</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Term Loan
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">Received New Application</td>
                  <td className="px-6 py-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium">
                      <span onClick={handleGenerateCAM}>Generate CAM</span>
                    </button>
                  </td>
                </tr>
                {applications.slice(0, 4).map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{app.applicant}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{app.amount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {app.program}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{app.status}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setShowVerifyPopup(true)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button - Bottom Left */}
        <button
          onClick={handleBackFromCM}
          className="fixed bottom-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 z-10"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>
    );
  }

  // New Application Screen
  if (currentScreen === 'newApplication') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-red-600 font-bold text-lg">
                  ADITYA BIRLA<br />
                  <span className="text-red-700">CAPITAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Application Content */}
        <div className="px-6 py-6 flex justify-center relative">
          <div className="max-w-4xl w-full">
            <div className="bg-white rounded-lg border border-gray-300 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-red-600 mb-2">Intelligent Credit Appraisal Assistant</h1>
                <p className="text-gray-500">Upload your documents to begin the intelligent credit assessment process</p>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-8 text-center">
                <div className="mb-4">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">Drag your files here or click to browse</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md cursor-pointer inline-block"
                >
                  Choose Files
                </label>
                {selectedFiles && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      {selectedFiles.length} file(s) selected
                    </p>
                    <button
                      onClick={handleUpload}
                      className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                    >
                      Upload
                    </button>
                  </div>
                )}
              </div>

              {/* Process Steps */}
              <div className="flex justify-center space-x-8 mb-8">
                {/* Step 1 */}
                <div className="text-center border border-gray-300 rounded-lg p-6 w-48">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    1
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Upload Docs</h3>
                  <p className="text-sm text-gray-500">Drag & drop documents</p>
                </div>

                {/* Step 2 */}
                <div className="text-center border border-gray-300 rounded-lg p-6 w-48">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    2
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
                  <p className="text-sm text-gray-500">Intelligent Processing</p>
                </div>

                {/* Step 3 */}
                <div className="text-center border border-gray-300 rounded-lg p-6 w-48">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    3
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Generate CAM</h3>
                  <p className="text-sm text-gray-500">Automated reports</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button - Bottom Left */}
          <button
            onClick={handleBackToDashboard}
            className="fixed bottom-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 z-10"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
              </div>
              <div className="text-red-600 font-bold text-lg">
                ADITYA BIRLA<br />
                <span className="text-red-700">CAPITAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Dashboard Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-red-600 mb-2">Relationship Manager Dashboard</h1>
            <p className="text-gray-500">Manage credit applications and track progress</p>
          </div>
          <button 
            onClick={handleNewApplicationClick}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>New Application</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search Applications....."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Application ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Applicant</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Program</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Progress</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.applicant}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.amount}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {app.program}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.status}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: `${app.progress}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500">{app.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {app.applicant === 'Vishnu Packwell Pvt Ltd' ? (
                      app.status === 'Verified' ? (
                        <button 
                          onClick={handleCMQueue}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium"
                        >
                          CM Queue
                        </button>
                      ) : (
                        <button 
                          onClick={handleVerifyDocuments}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium"
                        >
                          Verify Documents
                        </button>
                      )
                    ) : (
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Back Button - Bottom Left (for dashboard) */}
      <button
        onClick={() => {/* Add navigation logic if needed */}}
        className="fixed bottom-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 z-10"
        style={{ display: 'none' }} // Hidden on dashboard as it's the main page
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      {/* Verify Documents Popup */}
      {showVerifyPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-red-600">Document Verification</h2>
                <p className="text-gray-500 mt-1">Vishnu Packwell Pvt Ltd - APP005</p>
              </div>
              <button
                onClick={closeVerifyPopup}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Document Status */}
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="text-green-600 font-medium">All documents uploaded successfully</span>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">
                    <strong>Status:</strong> Ready for verification • <strong>Upload Date:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Document Checklist */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Checklist</h3>
                <div className="space-y-3">
                  {documentChecklist.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="text-green-600" size={18} />
                        <span className="text-gray-900 font-medium">{doc.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Uploaded
                        </span>
                        <Clock className="text-gray-400" size={14} />
                        <span className="text-xs text-gray-500">2 min ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
                <button
                  onClick={closeVerifyPopup}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button 
                  onClick={handleApproveDocuments}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium"
                >
                  Approve Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;