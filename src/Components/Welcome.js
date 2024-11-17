import React from "react";
import './Welcome.css';

import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <h1>Welcome to the Customer Survey</h1>
      <button onClick={() => navigate("/survey")}>Start Survey</button>
    </div>
  );
};

export default WelcomeScreen;
