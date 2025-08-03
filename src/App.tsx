import React, { useState } from 'react';
import { Grid3X3, FileText, Clock, CheckCircle, AlertCircle, Users, TrendingUp, DollarSign, Calendar } from 'lucide-react';

interface Application {
  id: string;
  applicant: string;
  amount: number;
  program: string;
  status: string;
  progress: number;
  submittedDate: string;
  priority: 'High' | 'Medium' | 'Low';
}

const App: React.FC = () => {
  const [applications] = useState<Application[]>([
    {
      id: 'APP005',
      applicant: 'Vishnu Packwell Pvt Ltd',
      amount: 3500000,
      program: 'Term Loan',
      status: 'Ready for Review',
      progress: 100,
      submittedDate: '2024-01-15',
      priority: 'High'
    },
    {
      id: 'APP003',
      applicant: 'Manufacturing Co.',
      amount: 10000000,
      program: 'Equipment Loan',
      status: 'Ready for Review',
      progress: 100,
      submittedDate: '2024-01-14',
      priority: 'Medium'
    },
    {
      id: 'APP007',
      applicant: 'Global Exports Ltd',
      amount: 5000000,
      program: 'Working Capital',
      status: 'Ready for Review',
      progress: 100,
      submittedDate: '2024-01-13',
      priority: 'High'
    },
    {
      id: 'APP009',
      applicant: 'Tech Innovations Inc',
      amount: 2500000,
      program: 'Term Loan',
      status: 'Ready for Review',
      progress: 100,
      submittedDate: '2024-01-12',
      priority: 'Low'
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const totalApplications = applications.length;
  const totalAmount = applications.reduce((sum, app) => sum + app.amount, 0);
  const highPriorityCount = applications.filter(app => app.priority === 'High').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-red-500 p-2 rounded-lg">
                <Grid3X3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ADITYA BIRLA</h1>
                <p className="text-sm text-red-600 font-semibold">CAPITAL</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Credit Manager Dashboard</h1>
          <p className="text-gray-600">Review and process credit applications ready for assessment</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">{highPriorityCount}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Processing</p>
                <p className="text-2xl font-bold text-gray-900">2.5 days</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Applications Ready for Review</h2>
            <p className="text-sm text-gray-600 mt-1">Applications that have completed document verification and are ready for CAM generation</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{app.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-full mr-3">
                          <Users className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">{app.applicant}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(app.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {app.program}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(app.priority)}`}>
                        {app.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(app.submittedDate).toLocaleDateString('en-IN')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>Generate CAM</span>
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-50 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Bulk Actions</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Process multiple applications simultaneously</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              Select Multiple
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-50 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">View processing analytics and reports</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              View Reports
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-50 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Templates</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Manage CAM templates and formats</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              Manage Templates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;