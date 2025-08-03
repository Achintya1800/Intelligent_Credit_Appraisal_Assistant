import React from 'react';

const StatusBadges: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
        Risk Rating: BB+
      </span>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
        Limit: ₹25L
      </span>
      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
        Tenor: 60M
      </span>
      <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
        50% Complete
      </span>
    </div>
  );
};

export default StatusBadges;