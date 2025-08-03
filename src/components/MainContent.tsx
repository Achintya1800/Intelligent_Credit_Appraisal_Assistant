import React from 'react';
import StatusBadges from './StatusBadges';
import GeneratePDFButton from './GeneratePDFButton';
import ExecutiveSummary from './ExecutiveSummary';
import DecisionButtons from './DecisionButtons';

interface MainContentProps {
  securityDetailsClicked: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ securityDetailsClicked }) => {
  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Credit Assessment Memo</h1>
            
            {/* Status Badges and Generate PDF Button */}
            <div className="flex items-center justify-between">
              <StatusBadges />
              <GeneratePDFButton />
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Application No: CAM-2024-007</p>
          </div>
        </div>

        {/* Executive Summary */}
        <ExecutiveSummary />

        {/* Decision Section */}
        <DecisionButtons isEnabled={securityDetailsClicked} />
      </div>
    </div>
  );
};

export default MainContent;