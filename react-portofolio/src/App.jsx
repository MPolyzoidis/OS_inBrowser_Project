import './App.css'
import React, { useState } from 'react';
import computerIcon from './assets/windows98Icons/computerIcon.png';

import Win98Window from "./components/Win98Window";
import Taskbar from './components/Taskbar';

function App() {

  const [isVisible, setIsVisible] = useState(true);

  const openComponent = () => {
    setIsVisible(true);
  };

  const closeComponent = () => {
    setIsVisible(false);
  };

  return (
    <>
    <h1 className='whiteText'>Hello World!</h1>
    <img src={computerIcon} alt="Windows98 Compouter Icon" className="computer-icon-btn" onClick={openComponent}></img>
    <p className='whiteText para'>
      This is some random text that should be visible
    </p>

    {isVisible &&  
      <Win98Window closeComponent={closeComponent} title="My Computer">
        <p>This is a Windows 98 styled window!</p>
      </Win98Window>
    }
    
    <div className="taskbar-component">
      <Taskbar />
    </div>

    </>
  )
}

export default App
