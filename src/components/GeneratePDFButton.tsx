import React from 'react';
import { Download } from 'lucide-react';

const GeneratePDFButton: React.FC = () => {
  return (
    <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
      <Download className="w-4 h-4" />
      <span className="text-sm font-medium">Generate PDF</span>
    </button>
  );
};

export default GeneratePDFButton;