import React from "react";
import "./Win98Window.css";

import Draggable from 'react-draggable';

const Win98Window = ({closeComponent, title, children }) => {
  return (
    <Draggable handle=".win98-title-bar">

      <div className="win98-window">

        <div className="win98-title-bar">

          <span className="win98-title">{title}</span>

          <div className="win98-controls">
              <button className="win98-control-btn minimize-btn">_</button>
              <button className="win98-control-btn">□</button>
              <button className="win98-control-btn" onClick={closeComponent}>X</button>
          </div>
        
        </div>

        <div className="win98-content">
            {children}
        </div>

      </div>

    </Draggable>
  );
};

export default Win98Window;