import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import CAMAssistant from './components/CAMAssistant';

function App() {
  const [securityDetailsClicked, setSecurityDetailsClicked] = useState(false);

  const handleSecurityDetailsClick = () => {
    setSecurityDetailsClicked(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar onSecurityDetailsClick={handleSecurityDetailsClick} />
        <MainContent securityDetailsClicked={securityDetailsClicked} />
      </div>

      <CAMAssistant />
    </div>
  );
}

export default App;