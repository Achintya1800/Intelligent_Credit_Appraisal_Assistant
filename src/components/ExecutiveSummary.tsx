import React from 'react';

const ExecutiveSummary: React.FC = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
      
      <div className="space-y-4">
        <div>
          <span className="font-medium text-gray-900">Applicant: </span>
          <span className="text-gray-700">
            Vishnu Packwell Private Limited is a private limited company engaged in manufacturing of packaging materials and corrugated boxes.
          </span>
        </div>
        
        <div>
          <span className="font-medium text-gray-900">Business Overview: </span>
          <span className="text-gray-700">
            The company has been in operation since 2017 and has established a strong presence in the packaging industry with consistent growth in revenue and profitability.
          </span>
        </div>
      </div>

      {/* Key Strengths */}
      <div className="mt-6 bg-green-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Key Strengths:</h3>
        <ul className="space-y-2">
          <li className="flex items-center text-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Experienced management team
          </li>
          <li className="flex items-center text-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Diversified customer base
          </li>
          <li className="flex items-center text-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Strong financial performance
          </li>
          <li className="flex items-center text-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Good market position
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExecutiveSummary;