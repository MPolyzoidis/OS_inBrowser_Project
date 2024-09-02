import React from "react";
import './Taskbar.css';

import startBtnIcon from "../assets/windows98Icons/Win98Icon.png"

const Taskbar = () => {
    return (
        <div className="taskbar">

            <div className="taskbar-start-button">
                <img src={startBtnIcon} alt="Start" />
                <span>Start</span>
            </div>

            <div className="task-area">
                {/* Task area for opened applications */}
            </div>

            <div className="system-tray">
                <div className="taskbar-name">Marios Polyzoidis</div>
            </div>
            
        </div>
    );
  };
  
  export default Taskbar;