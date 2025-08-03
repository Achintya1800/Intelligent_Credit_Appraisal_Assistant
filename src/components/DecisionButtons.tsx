import React from 'react';
import { User, Check, ArrowLeft, X } from 'lucide-react';

interface DecisionButtonsProps {
  isEnabled: boolean;
}

const DecisionButtons: React.FC<DecisionButtonsProps> = ({ isEnabled }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <User className="w-5 h-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Decision</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <button 
          disabled={!isEnabled}
          className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isEnabled 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>Approve</span>
        </button>
        
        <button 
          disabled={!isEnabled}
          className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isEnabled 
              ? 'bg-gray-500 hover:bg-gray-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Send Back</span>
        </button>
        
        <button 
          disabled={!isEnabled}
          className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isEnabled 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <X className="w-4 h-4" />
          <span>Reject</span>
        </button>
      </div>
    </div>
  );
};

export default DecisionButtons;