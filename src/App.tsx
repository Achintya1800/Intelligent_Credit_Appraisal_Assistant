import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ArrowLeft, 
  User, 
  Calendar, 
  DollarSign,
  Building,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  TrendingUp,
  Shield,
  FileCheck,
  Eye,
  Download,
  Send,
  Loader2
} from 'lucide-react';

interface Application {
  id: string;
  applicant: string;
  amount: string;
  program: string;
  status: string;
  date: string;
  documents?: Document[];
  personalInfo?: PersonalInfo;
  businessInfo?: BusinessInfo;
  financialInfo?: FinancialInfo;
}

interface Document {
  name: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadDate: string;
}

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  panNumber: string;
}

interface BusinessInfo {
  companyName: string;
  industry: string;
  establishedYear: string;
  gstNumber: string;
  address: string;
}

interface FinancialInfo {
  annualTurnover: string;
  netProfit: string;
  existingLoans: string;
  creditScore: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<'rm-dashboard' | 'cm-dashboard' | 'document-upload' | 'cam-generation' | 'application-details'>('rm-dashboard');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGeneratingCAM, setIsGeneratingCAM] = useState(false);
  const [camProgress, setCAMProgress] = useState(0);
  const [camStage, setCAMStage] = useState('');

  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'APP001',
      applicant: 'Sharma Industries Pvt Ltd',
      amount: '₹25,00,000',
      program: 'Term Loan',
      status: 'In Progress',
      date: '2024-01-15',
      personalInfo: {
        name: 'Rajesh Sharma',
        email: 'rajesh@sharmaindustries.com',
        phone: '+91 98765 43210',
        address: '123 Industrial Area, Mumbai, Maharashtra 400001',
        dateOfBirth: '1975-05-15',
        panNumber: 'ABCDE1234F'
      },
      businessInfo: {
        companyName: 'Sharma Industries Pvt Ltd',
        industry: 'Manufacturing',
        establishedYear: '1995',
        gstNumber: '27ABCDE1234F1Z5',
        address: '456 Factory Road, Mumbai, Maharashtra 400002'
      },
      financialInfo: {
        annualTurnover: '₹5,00,00,000',
        netProfit: '₹75,00,000',
        existingLoans: '₹15,00,000',
        creditScore: '750'
      },
      documents: [
        { name: 'Bank Statements (6 months)', status: 'verified', uploadDate: '2024-01-15' },
        { name: 'GST Returns', status: 'verified', uploadDate: '2024-01-15' },
        { name: 'Audited Financial Statements', status: 'pending', uploadDate: '2024-01-16' },
        { name: 'PAN Card', status: 'verified', uploadDate: '2024-01-15' },
        { name: 'Incorporation Certificate', status: 'verified', uploadDate: '2024-01-15' }
      ]
    },
    {
      id: 'APP002',
      applicant: 'Tech Solutions Inc',
      amount: '₹50,00,000',
      program: 'Working Capital',
      status: 'Pending',
      date: '2024-01-14'
    },
    {
      id: 'APP003',
      applicant: 'Manufacturing Co.',
      amount: '₹1,00,00,000',
      program: 'Equipment Loan',
      status: 'Verified',
      date: '2024-01-13'
    },
    {
      id: 'APP004',
      applicant: 'Green Energy Ltd',
      amount: '₹75,00,000',
      program: 'Term Loan',
      status: 'New',
      date: '2024-01-12'
    },
    {
      id: 'APP005',
      applicant: 'Vishnu Packwell Pvt Ltd',
      amount: '₹35,00,000',
      program: 'Term Loan',
      status: 'Received New Application',
      date: '2024-01-11'
    }
  ]);

  const filteredApplications = applications.filter(app =>
    app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'Received New Application': return 'bg-purple-100 text-purple-800';
      case 'Basic CAM Generated': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New': return <FileText className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Pending': return <AlertCircle className="w-4 h-4" />;
      case 'Verified': return <CheckCircle className="w-4 h-4" />;
      case 'Received New Application': return <FileText className="w-4 h-4" />;
      case 'Basic CAM Generated': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleGenerateCAM = (applicationId: string) => {
    setIsGeneratingCAM(true);
    setCAMProgress(0);
    setCurrentScreen('cam-generation');
    
    // Simulate CAM generation process
    const stages = [
      { stage: 'Reading Documents', progress: 44 },
      { stage: 'Building Basic CAM', progress: 58 },
      { stage: 'Financial Plotting', progress: 87 },
      { stage: 'Generating CAM Report', progress: 100 }
    ];
    
    let currentStageIndex = 0;
    
    const updateProgress = () => {
      if (currentStageIndex < stages.length) {
        const currentStage = stages[currentStageIndex];
        setCAMStage(currentStage.stage);
        
        const startProgress = currentStageIndex === 0 ? 0 : stages[currentStageIndex - 1].progress;
        const endProgress = currentStage.progress;
        const duration = 2000; // 2 seconds per stage
        const steps = 50;
        const increment = (endProgress - startProgress) / steps;
        
        let step = 0;
        const progressInterval = setInterval(() => {
          step++;
          const newProgress = startProgress + (increment * step);
          setCAMProgress(Math.min(newProgress, endProgress));
          
          if (step >= steps) {
            clearInterval(progressInterval);
            currentStageIndex++;
            if (currentStageIndex < stages.length) {
              setTimeout(updateProgress, 500);
            } else {
              // CAM generation complete
              setTimeout(() => {
                setIsGeneratingCAM(false);
                setCAMProgress(0);
                setCAMStage('');
                
                // Update application status to "Basic CAM Generated"
                setApplications(prev => prev.map(app => 
                  app.id === applicationId 
                    ? { ...app, status: 'Basic CAM Generated' }
                    : app
                ));
                
                setCurrentScreen('cm-dashboard');
              }, 1000);
            }
          }
        }, duration / steps);
      }
    };
    
    updateProgress();
  };

  const handleSendToCPA = (applicationId: string) => {
    // Handle Send to CPA functionality
    console.log('Sending to CPA:', applicationId);
    // You can add more functionality here as needed
  };

  const renderRMDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ADITYA BIRLA CAPITAL</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('cm-dashboard')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Switch to CM Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Relationship Manager Dashboard</h2>
          <p className="text-gray-600">Manage and track credit applications</p>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>New Application</span>
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Credit Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.applicant}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {app.program}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        <span>{app.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedApplication(app);
                            setCurrentScreen('application-details');
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedApplication(app);
                            setCurrentScreen('document-upload');
                          }}
                          className="text-green-600 hover:text-green-800"
                        >
                          Documents
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCMDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ADITYA BIRLA CAPITAL</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('rm-dashboard')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Switch to RM Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">CM Dashboard</h2>
          <p className="text-gray-600">Review and process credit applications</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">Application ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.applicant}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        app.program === 'Term Loan' ? 'bg-red-100 text-red-800' :
                        app.program === 'Working Capital' ? 'bg-red-100 text-red-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {app.program}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {app.status === 'Received New Application' && (
                          <>
                            <button 
                              onClick={() => handleGenerateCAM(app.id)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                            >
                              Generate Basic CAM
                            </button>
                            <button 
                              disabled
                              className="bg-gray-300 text-gray-500 px-3 py-1 rounded text-sm cursor-not-allowed"
                            >
                              Send to CPA
                            </button>
                          </>
                        )}
                        {app.status === 'Basic CAM Generated' && (
                          <>
                            <button 
                              disabled
                              className="bg-gray-300 text-gray-500 px-3 py-1 rounded text-sm cursor-not-allowed"
                            >
                              Generate Basic CAM
                            </button>
                            <button 
                              onClick={() => handleSendToCPA(app.id)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                            >
                              Send to CPA
                            </button>
                          </>
                        )}
                        {app.status !== 'Received New Application' && app.status !== 'Basic CAM Generated' && (
                          <button className="text-blue-600 hover:text-blue-800">View</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="fixed bottom-6 left-6">
        <button 
          onClick={() => setCurrentScreen('rm-dashboard')}
          className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );

  const renderCAMGeneration = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Generating CAM Report</h2>
            <p className="text-gray-600">Please wait while we process your application...</p>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{camStage}</span>
              <span>{Math.round(camProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${camProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>This process may take a few minutes...</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocumentUpload = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ADITYA BIRLA CAPITAL</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h2>
          <p className="text-gray-600">Upload and verify required documents for {selectedApplication?.applicant}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
              <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG, DOC, DOCX</p>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Choose Files
              </button>
            </div>
          </div>

          {/* Document Checklist */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Checklist</h3>
            <div className="space-y-3">
              {selectedApplication?.documents?.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {doc.status === 'verified' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : doc.status === 'rejected' ? (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-500" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">Uploaded: {doc.uploadDate}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                    doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="fixed bottom-6 left-6">
        <button 
          onClick={() => setCurrentScreen('rm-dashboard')}
          className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );

  const renderApplicationDetails = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ADITYA BIRLA CAPITAL</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Details</h2>
          <p className="text-gray-600">Complete information for {selectedApplication?.applicant}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedApplication?.personalInfo?.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedApplication?.personalInfo?.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedApplication?.personalInfo?.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{selectedApplication?.personalInfo?.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{selectedApplication?.personalInfo?.dateOfBirth}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">PAN Number</p>
                  <p className="font-medium">{selectedApplication?.personalInfo?.panNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Briefcase className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Building className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="font-medium">{selectedApplication?.businessInfo?.companyName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">{selectedApplication?.businessInfo?.industry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Established Year</p>
                  <p className="font-medium">{selectedApplication?.businessInfo?.establishedYear}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">GST Number</p>
                  <p className="font-medium">{selectedApplication?.businessInfo?.gstNumber}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Business Address</p>
                  <p className="font-medium">{selectedApplication?.businessInfo?.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Annual Turnover</p>
                  <p className="font-medium">{selectedApplication?.financialInfo?.annualTurnover}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Net Profit</p>
                  <p className="font-medium">{selectedApplication?.financialInfo?.netProfit}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Existing Loans</p>
                  <p className="font-medium">{selectedApplication?.financialInfo?.existingLoans}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Credit Score</p>
                  <p className="font-medium">{selectedApplication?.financialInfo?.creditScore}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-500">Application ID</p>
              <p className="font-semibold">{selectedApplication?.id}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-500">Loan Amount</p>
              <p className="font-semibold">{selectedApplication?.amount}</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm text-gray-500">Program</p>
              <p className="font-semibold">{selectedApplication?.program}</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold">{selectedApplication?.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="fixed bottom-6 left-6">
        <button 
          onClick={() => setCurrentScreen('rm-dashboard')}
          className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );

  // Main render logic
  if (currentScreen === 'cam-generation') {
    return renderCAMGeneration();
  }

  if (currentScreen === 'cm-dashboard') {
    return renderCMDashboard();
  }

  if (currentScreen === 'document-upload') {
    return renderDocumentUpload();
  }

  if (currentScreen === 'application-details') {
    return renderApplicationDetails();
  }

  return renderRMDashboard();
}

export default App;