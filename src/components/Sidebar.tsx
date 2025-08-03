import React from 'react';
import { 
  User, 
  BarChart3, 
  AlertTriangle, 
  Shield, 
  Lightbulb
} from 'lucide-react';

interface SidebarProps {
  onSecurityDetailsClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSecurityDetailsClick }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <h2 className="text-sm font-medium text-gray-900 mb-4">Document Outline</h2>
        
        <nav className="space-y-1">
          <div className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Executive Summary
          </div>
          
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
            <User className="w-4 h-4 mr-2" />
            Applicant Profile
          </button>
          
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Financial Analysis
          </button>
          
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
            Risk Assessment
          </button>
          
          <button 
            onClick={onSecurityDetailsClick}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
          >
            <Shield className="w-4 h-4 mr-2 text-orange-500" />
            Security Details
          </button>
          
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
            <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
            Recommendation
          </button>
        </nav>
      </div>

      {/* Comments Section */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Comments</h3>
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-xs text-gray-600">
            Overall assessment shows strong business fundamentals with consistent growth trajectory.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;