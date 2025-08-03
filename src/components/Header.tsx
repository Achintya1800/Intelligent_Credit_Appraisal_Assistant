import React from 'react';
import { Grid3X3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
          <Grid3X3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">ADITYA BIRLA</h1>
          <p className="text-sm text-gray-600">CAPITAL</p>
        </div>
      </div>
    </header>
  );
};

export default Header;