import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  User, 
  Search, 
  Filter, 
  Plus,
  ArrowLeft,
  Download,
  Eye,
  MoreVertical,
  Loader2
} from 'lucide-react';

interface Application {
  id: string;
  customerName: string;
  applicationId: string;
  amount: string;
  status: 'new' | 'in-progress' | 'pending' | 'verified';
  submittedDate: string;
  lastUpdated: string;
  documentsCount: number;
  verifiedDocuments: number;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadDate: string;
  size: string;
}

interface CAMProgress {
  stage: number;
  percentage: number;
  currentStep: string;
  isComplete: boolean;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'rm-dashboard' | 'document-upload' | 'cm-dashboard' | 'cam-generation'>('rm-dashboard');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [camProgress, setCAMProgress] = useState<CAMProgress>({
    stage: 0,
    percentage: 0,
    currentStep: 'Starting analysis...',
    isComplete: false
  });
  const [securityVerified, setSecurityVerified] = useState(false);

  // Mock data
  const applications: Application[] = [
    {
      id: '1',
      customerName: 'Rajesh Kumar',
      applicationId: 'ABC001',
      amount: '₹25,00,000',
      status: 'verified',
      submittedDate: '2024-01-15',
      lastUpdated: '2024-01-18',
      documentsCount: 8,
      verifiedDocuments: 8
    },
    {
      id: '2',
      customerName: 'Priya Sharma',
      applicationId: 'ABC002',
      amount: '₹15,00,000',
      status: 'in-progress',
      submittedDate: '2024-01-16',
      lastUpdated: '2024-01-17',
      documentsCount: 6,
      verifiedDocuments: 4
    },
    {
      id: '3',
      customerName: 'Amit Patel',
      applicationId: 'ABC003',
      amount: '₹35,00,000',
      status: 'pending',
      submittedDate: '2024-01-14',
      lastUpdated: '2024-01-16',
      documentsCount: 7,
      verifiedDocuments: 3
    },
    {
      id: '4',
      customerName: 'Sneha Reddy',
      applicationId: 'ABC004',
      amount: '₹20,00,000',
      status: 'new',
      submittedDate: '2024-01-17',
      lastUpdated: '2024-01-17',
      documentsCount: 5,
      verifiedDocuments: 0
    }
  ];

  const documents: Document[] = [
    { id: '1', name: 'Bank Statement - SBI', type: 'PDF', status: 'verified', uploadDate: '2024-01-15', size: '2.4 MB' },
    { id: '2', name: 'Perfios Report', type: 'XLSX', status: 'verified', uploadDate: '2024-01-15', size: '1.8 MB' },
    { id: '3', name: 'CIBIL Report - Consumer', type: 'PDF', status: 'verified', uploadDate: '2024-01-16', size: '856 KB' },
    { id: '4', name: 'CIBIL Report - Commercial', type: 'PDF', status: 'verified', uploadDate: '2024-01-16', size: '1.2 MB' },
    { id: '5', name: 'GST Filing Report', type: 'PDF', status: 'verified', uploadDate: '2024-01-17', size: '945 KB' },
    { id: '6', name: 'Shareholding Certificate', type: 'PDF', status: 'verified', uploadDate: '2024-01-17', size: '678 KB' },
    { id: '7', name: 'Audit Report', type: 'PDF', status: 'verified', uploadDate: '2024-01-18', size: '3.2 MB' },
    { id: '8', name: 'Email Communication', type: 'MSG', status: 'verified', uploadDate: '2024-01-18', size: '124 KB' }
  ];

  // CAM Generation Progress Simulation
  useEffect(() => {
    if (currentScreen === 'cam-generation' && !camProgress.isComplete) {
      const progressSteps = [
        { stage: 1, percentage: 15, step: 'Reading Bank Statements...' },
        { stage: 1, percentage: 25, step: 'Processing Perfios Reports...' },
        { stage: 1, percentage: 35, step: 'Analyzing CIBIL Reports...' },
        { stage: 1, percentage: 44, step: 'Reading Documents Complete' },
        { stage: 2, percentage: 48, step: 'Extracting Financial Data...' },
        { stage: 2, percentage: 52, step: 'Building CAM Structure...' },
        { stage: 2, percentage: 58, step: 'Basic CAM Complete' },
        { stage: 3, percentage: 65, step: 'Calculating Financial Ratios...' },
        { stage: 3, percentage: 75, step: 'Creating Financial Charts...' },
        { stage: 3, percentage: 82, step: 'Plotting Trends...' },
        { stage: 3, percentage: 87, step: 'Financial Plotting Complete' },
        { stage: 4, percentage: 92, step: 'Compiling Final Report...' },
        { stage: 4, percentage: 97, step: 'Formatting CAM Document...' },
        { stage: 4, percentage: 100, step: 'CAM Generation Complete!' }
      ];

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < progressSteps.length) {
          const currentStep = progressSteps[currentIndex];
          setCAMProgress({
            stage: currentStep.stage,
            percentage: currentStep.percentage,
            currentStep: currentStep.step,
            isComplete: currentStep.percentage === 100
          });
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 2000); // Update every 2 seconds

      return () => clearInterval(interval);
    }
  }, [currentScreen, camProgress.isComplete]);

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
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const verifiedApplications = applications.filter(app => app.status === 'verified');

  const renderRMDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-red-600 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">ADITYA BIRLA CAPITAL</h1>
                <p className="text-sm text-gray-500">Relationship Manager Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('cm-dashboard')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Switch to CM Dashboard
              </button>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-semibold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {applications.filter(app => app.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {applications.filter(app => app.status === 'verified').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by customer name or application ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Application</span>
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
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
                      <div className="text-sm font-medium text-gray-900">{application.customerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.applicationId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{application.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {application.verifiedDocuments}/{application.documentsCount} verified
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(application.verifiedDocuments / application.documentsCount) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedApplication(application);
                            setCurrentScreen('document-upload');
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
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

  const renderDocumentUpload = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('rm-dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="bg-red-600 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Document Management</h1>
                <p className="text-sm text-gray-500">
                  {selectedApplication?.customerName} - {selectedApplication?.applicationId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Upload Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Documents</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-gray-500 mb-4">Support for PDF, XLSX, MSG, HTML formats</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Choose Files
                </button>
              </div>
            </div>

            {/* Uploaded Documents */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Uploaded Documents</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {documents.map((doc) => (
                  <div key={doc.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.type} • {doc.size} • {doc.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                        doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {doc.status === 'verified' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {doc.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {doc.status === 'rejected' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Document Checklist */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Document Checklist</h3>
            <div className="space-y-3">
              {[
                'Bank Statements (Last 6 months)',
                'Perfios Report',
                'CIBIL Report - Consumer',
                'CIBIL Report - Commercial',
                'GST Filing Reports',
                'Shareholding Certificates',
                'Audit Reports',
                'Email Communications'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Verification Progress</span>
                <span className="text-sm text-gray-500">8/8 Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
              <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Send to CM Queue
              </button>
            </div>
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
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-red-600 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">ADITYA BIRLA CAPITAL</h1>
                <p className="text-sm text-gray-500">Credit Manager Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('rm-dashboard')}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Switch to RM Dashboard
              </button>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">Sarah Wilson</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ready for Review</p>
                <p className="text-2xl font-semibold text-gray-900">{verifiedApplications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">CAMs Generated</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Ready for CAM Generation */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Applications Ready for CAM Generation</h3>
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
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {verifiedApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{application.customerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.applicationId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{application.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        All Verified
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.submittedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => {
                          setSelectedApplication(application);
                          setCurrentScreen('cam-generation');
                          setCAMProgress({
                            stage: 0,
                            percentage: 0,
                            currentStep: 'Starting analysis...',
                            isComplete: false
                          });
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Generate CAM
                      </button>
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

  const renderCAMGeneration = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('cm-dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="bg-red-600 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">ADITYA BIRLA CAPITAL</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Header Section */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="bg-red-600 p-3 rounded-lg">
              <span className="text-white font-bold text-lg">ABC</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Automated Credit Assessment Memo Solution</h2>
              <p className="text-gray-600">Fully automated Agentic AI + Gen AI based CAM ++ Generation Solution</p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{camProgress.percentage}% Complete</h3>
              {!camProgress.isComplete && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">{camProgress.currentStep}</span>
                </div>
              )}
              {camProgress.isComplete && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">CAM Generation Complete!</span>
                </div>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${camProgress.percentage}%` }}
              ></div>
            </div>

            {/* Progress Steps */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { step: 1, title: 'Reading Documents', range: '0-44%' },
                { step: 2, title: 'Building Basic CAM', range: '44-58%' },
                { step: 3, title: 'Financial Plotting', range: '58-87%' },
                { step: 4, title: 'Generating CAM Report', range: '87-100%' }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    camProgress.stage >= item.step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {camProgress.stage > item.step ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="font-semibold">{item.step}</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.range}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Document Types */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-center text-gray-600 mb-4">
              Takes input from Bank Statements, Emails, Perfios Reports, Consumer and Commercial CIBIL, Share Holding Certificates, GST Filing Reports ... in PDF, XLSX, MSG, HTML Formats
            </p>
          </div>

          {/* Processing Status */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Processing... Please wait
            </div>
            {camProgress.isComplete && (
              <div className="space-x-4">
                <button 
                  onClick={() => setSecurityVerified(!securityVerified)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    securityVerified 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                  }`}
                >
                  {securityVerified ? 'Security Verified ✓' : 'Verify Security Details'}
                </button>
                <button 
                  disabled={!securityVerified}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    securityVerified 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Approve
                </button>
                <button 
                  disabled={!securityVerified}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    securityVerified 
                      ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Send Back
                </button>
                <button 
                  disabled={!securityVerified}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    securityVerified 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  switch (currentScreen) {
    case 'document-upload':
      return renderDocumentUpload();
    case 'cm-dashboard':
      return renderCMDashboard();
    case 'cam-generation':
      return renderCAMGeneration();
    default:
      return renderRMDashboard();
  }
};

export default App;