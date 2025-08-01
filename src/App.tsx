import React, { useState } from 'react';
import { Search, Filter, Plus, Upload, ArrowLeft, X, CheckCircle, Clock } from 'lucide-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard', 'newApplication', 'uploading'
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
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
          status: 'New',
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
            className="absolute bottom-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800"
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
                      <button 
                        onClick={handleVerifyDocuments}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium"
                      >
                        Verify Documents
                      </button>
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
                <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium">
                  Approve Documents
                </button>
                <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium">
                  Start Processing
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