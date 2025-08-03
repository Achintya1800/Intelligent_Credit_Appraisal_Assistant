import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  Plus,
  ArrowRight,
  Download,
  Eye,
  MoreVertical,
  X,
  Check,
  ArrowLeft,
  Loader2
} from 'lucide-react';

interface Application {
  id: string;
  customerName: string;
  applicationId: string;
  status: 'new' | 'in-progress' | 'pending' | 'verified';
  dateSubmitted: string;
  loanAmount: string;
  documents: number;
  verifiedDocuments: number;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadDate: string;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'documents' | 'cm-dashboard' | 'cam-generation'>('dashboard');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showNewApplicationModal, setShowNewApplicationModal] = useState(false);
  const [camProgress, setCamProgress] = useState(0);
  const [camStage, setCamStage] = useState('');
  const [isGeneratingCAM, setIsGeneratingCAM] = useState(false);
  const [securityVerified, setSecurityVerified] = useState(false);

  const applications: Application[] = [
    {
      id: '1',
      customerName: 'Rajesh Kumar',
      applicationId: 'ABC001',
      status: 'new',
      dateSubmitted: '2024-01-15',
      loanAmount: '₹50,00,000',
      documents: 8,
      verifiedDocuments: 0
    },
    {
      id: '2',
      customerName: 'Priya Sharma',
      applicationId: 'ABC002',
      status: 'in-progress',
      dateSubmitted: '2024-01-14',
      loanAmount: '₹25,00,000',
      documents: 6,
      verifiedDocuments: 4
    },
    {
      id: '3',
      customerName: 'Amit Patel',
      applicationId: 'ABC003',
      status: 'pending',
      dateSubmitted: '2024-01-13',
      loanAmount: '₹75,00,000',
      documents: 10,
      verifiedDocuments: 8
    },
    {
      id: '4',
      customerName: 'Sneha Reddy',
      applicationId: 'ABC004',
      status: 'verified',
      dateSubmitted: '2024-01-12',
      loanAmount: '₹30,00,000',
      documents: 7,
      verifiedDocuments: 7
    }
  ];

  const documents: Document[] = [
    { id: '1', name: 'Bank Statement - SBI', type: 'PDF', status: 'verified', uploadDate: '2024-01-15' },
    { id: '2', name: 'Perfios Report', type: 'XLSX', status: 'verified', uploadDate: '2024-01-15' },
    { id: '3', name: 'CIBIL Report - Consumer', type: 'PDF', status: 'pending', uploadDate: '2024-01-15' },
    { id: '4', name: 'CIBIL Report - Commercial', type: 'PDF', status: 'pending', uploadDate: '2024-01-15' },
    { id: '5', name: 'GST Filing Report', type: 'PDF', status: 'verified', uploadDate: '2024-01-15' },
    { id: '6', name: 'Shareholding Certificate', type: 'PDF', status: 'pending', uploadDate: '2024-01-15' },
    { id: '7', name: 'Audit Report', type: 'PDF', status: 'pending', uploadDate: '2024-01-15' },
    { id: '8', name: 'Email Communication', type: 'MSG', status: 'verified', uploadDate: '2024-01-15' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'verified': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <FileText className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const startCAMGeneration = () => {
    setIsGeneratingCAM(true);
    setCamProgress(0);
    setCamStage('Starting analysis...');
    setCurrentScreen('cam-generation');

    // Simulate CAM generation progress
    const stages = [
      { progress: 15, stage: 'Reading Documents', duration: 2000 },
      { progress: 44, stage: 'Reading Documents', duration: 3000 },
      { progress: 50, stage: 'Building Basic CAM', duration: 2000 },
      { progress: 58, stage: 'Building Basic CAM', duration: 2000 },
      { progress: 70, stage: 'Financial Plotting', duration: 3000 },
      { progress: 87, stage: 'Financial Plotting', duration: 2000 },
      { progress: 95, stage: 'Generating CAM Report', duration: 2000 },
      { progress: 100, stage: 'CAM Report Generated Successfully!', duration: 1000 }
    ];

    let currentStageIndex = 0;

    const updateProgress = () => {
      if (currentStageIndex < stages.length) {
        const currentStage = stages[currentStageIndex];
        setCamProgress(currentStage.progress);
        setCamStage(currentStage.stage);
        
        setTimeout(() => {
          currentStageIndex++;
          updateProgress();
        }, currentStage.duration);
      } else {
        setIsGeneratingCAM(false);
      }
    };

    updateProgress();
  };

  const renderCAMGeneration = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mr-4">
              <span className="text-white font-bold text-xl">ABC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Automated Credit Assessment Memo Solution</h1>
              <p className="text-gray-600">Fully automated Agentic AI + Gen AI based CAM ++ Generation Solution</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${camProgress}%` }}
              ></div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">{camProgress}% Complete</div>
              <div className="text-blue-600 font-medium flex items-center justify-center">
                {isGeneratingCAM && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {camStage}
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { step: 1, title: 'Reading Documents', range: '0-44%' },
              { step: 2, title: 'Building Basic CAM', range: '44-58%' },
              { step: 3, title: 'Financial Plotting', range: '58-87%' },
              { step: 4, title: 'Generating CAM Report', range: '87-100%' }
            ].map((item) => {
              const isActive = (
                (item.step === 1 && camProgress <= 44) ||
                (item.step === 2 && camProgress > 44 && camProgress <= 58) ||
                (item.step === 3 && camProgress > 58 && camProgress <= 87) ||
                (item.step === 4 && camProgress > 87)
              );
              const isCompleted = (
                (item.step === 1 && camProgress > 44) ||
                (item.step === 2 && camProgress > 58) ||
                (item.step === 3 && camProgress > 87) ||
                (item.step === 4 && camProgress === 100)
              );

              return (
                <div key={item.step} className="text-center">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center font-bold ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-blue-500 text-white animate-pulse' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? <Check className="w-6 h-6" /> : item.step}
                  </div>
                  <div className={`font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Document Types */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-center text-gray-700">
              Takes input from Bank Statements, Emails, Perfios Reports, Consumer and Commercial CIBIL, Share Holding Certificates, GST Filing Reports ... in PDF, XLSX, MSG, HTML Formats
            </p>
          </div>

          {/* Processing Status */}
          <div className="text-right">
            <p className="text-gray-500">Processing... Please wait</p>
          </div>

          {/* Action Buttons - Only show when CAM is complete */}
          {camProgress === 100 && !isGeneratingCAM && (
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => setCurrentScreen('cm-dashboard')}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Dashboard
              </button>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Download CAM Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">ABC</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">ADITYA BIRLA CAPITAL</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentScreen('cm-dashboard')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                CM Dashboard
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Relationship Manager Dashboard</h2>
          <p className="text-gray-600">Manage credit applications and track their progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'verified').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by customer name or application ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
              </select>
              <button
                onClick={() => setShowNewApplicationModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Application
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Credit Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{application.customerName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.applicationId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.loanAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.verifiedDocuments}/{application.documents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.dateSubmitted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedApplication(application);
                          setCurrentScreen('documents');
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* New Application Modal */}
      {showNewApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">New Credit Application</h3>
              <button
                onClick={() => setShowNewApplicationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter loan amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Personal Loan</option>
                  <option>Business Loan</option>
                  <option>Home Loan</option>
                  <option>Vehicle Loan</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewApplicationModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Create Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderDocuments = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">ABC</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">ADITYA BIRLA CAPITAL</h1>
              </div>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Application Header */}
        {selectedApplication && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedApplication.customerName}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Application ID: {selectedApplication.applicationId}</span>
                  <span>Loan Amount: {selectedApplication.loanAmount}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedApplication.status)}`}>
                    {getStatusIcon(selectedApplication.status)}
                    <span className="ml-1 capitalize">{selectedApplication.status.replace('-', ' ')}</span>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Progress</div>
                <div className="text-2xl font-bold text-gray-900">
                  {selectedApplication.verifiedDocuments}/{selectedApplication.documents}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Document Upload */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Documents</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
            <p className="text-sm text-gray-500">Supports PDF, XLSX, MSG, HTML formats</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Choose Files
            </button>
          </div>
        </div>

        {/* Document Checklist */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Document Verification Checklist</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <div key={doc.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    doc.status === 'verified' ? 'bg-green-100' :
                    doc.status === 'rejected' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {doc.status === 'verified' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : doc.status === 'rejected' ? (
                      <X className="w-4 h-4 text-red-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{doc.name}</div>
                    <div className="text-sm text-gray-500">{doc.type} • Uploaded {doc.uploadDate}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                    doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status === 'pending' ? 'Pending Review' : doc.status}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {documents.filter(doc => doc.status === 'verified').length} of {documents.length} documents verified
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
              Send to CM Queue
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );

  const renderCMDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">ABC</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">ADITYA BIRLA CAPITAL</h1>
              </div>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Credit Manager Dashboard</h2>
          <p className="text-gray-600">Review applications and generate Credit Assessment Memos</p>
        </div>

        {/* Applications Ready for Review */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Applications Ready for CAM Generation</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {applications.filter(app => app.status === 'verified').map((application) => (
              <div key={application.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{application.customerName}</div>
                      <div className="text-sm text-gray-500">
                        {application.applicationId} • {application.loanAmount} • {application.dateSubmitted}
                      </div>
                      <div className="text-sm text-green-600 mt-1">
                        All documents verified ({application.verifiedDocuments}/{application.documents})
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={startCAMGeneration}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Generate CAM
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Verification Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Security Verification</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="security-check"
                checked={securityVerified}
                onChange={(e) => setSecurityVerified(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="security-check" className="ml-2 text-sm text-gray-700">
                I have verified all security details and compliance requirements
              </label>
            </div>
            <div className="flex space-x-3">
              <button
                disabled={!securityVerified}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  securityVerified
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Approve Application
              </button>
              <button
                disabled={!securityVerified}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  securityVerified
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Send Back for Review
              </button>
              <button
                disabled={!securityVerified}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  securityVerified
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Reject Application
              </button>
            </div>
            {!securityVerified && (
              <p className="text-sm text-gray-500">
                Complete security verification to enable decision buttons
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );

  // Main render logic
  switch (currentScreen) {
    case 'documents':
      return renderDocuments();
    case 'cm-dashboard':
      return renderCMDashboard();
    case 'cam-generation':
      return renderCAMGeneration();
    default:
      return renderDashboard();
  }
};

export default App;