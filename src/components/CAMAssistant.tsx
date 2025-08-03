import React from 'react';
import { MessageCircle } from 'lucide-react';

const CAMAssistant: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
        <div className="flex items-center justify-center mb-3">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="text-center">
          <h4 className="font-medium text-gray-900">CAM Assistant</h4>
          <p className="text-sm text-gray-500 mt-1">Click to start chat</p>
        </div>
      </div>
    </div>
  );
};

export default CAMAssistant;