import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import './MainScreen.css';

const initialQuestions = [
  { id: uuid(), text: "How satisfied are you with our products?", type: "rating", scale: 5 },
  { id: uuid(), text: "How fair are the prices compared to similar retailers?", type: "rating", scale: 5 },
  { id: uuid(), text: "How satisfied are you with the value for money of your purchase?", type: "rating", scale: 5 },
  { id: uuid(), text: "On a scale of 1-10 how would you recommend us to your friends and family?", type: "rating", scale: 10 },
  { id: uuid(), text: "What could we do to improve our service?", type: "text" },
];

const SurveyScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    setResponses({ ...responses, [initialQuestions[currentQuestion].id]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < initialQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      localStorage.setItem("surveyResponses", JSON.stringify(responses));
      navigate("/thankyou");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <div className="survey">
      <h1>Customer Survey</h1>
      <h2>Question {currentQuestion + 1}/{initialQuestions.length}</h2>
      <p>{initialQuestions[currentQuestion].text}</p>
      {initialQuestions[currentQuestion].type === "rating" && (
        <div className="rating-container">
          {[...Array(initialQuestions[currentQuestion].scale)].map((_, index) => (
            <label
              key={index}
              className={`rating-circle ${responses[initialQuestions[currentQuestion].id] === index + 1 ? "selected" : ""}`}
            >
              <input
                type="radio"
                name={initialQuestions[currentQuestion].id}
                value={index + 1}
                onChange={(e) => handleAnswer(Number(e.target.value))}
                className="rating-input"
              />
              {index + 1}
            </label>
          ))}
        </div>
      )}
      {initialQuestions[currentQuestion].type === "text" && (
        <textarea
          value={responses[initialQuestions[currentQuestion].id] || ""}
          onChange={(e) => handleAnswer(e.target.value)}
        ></textarea>
      )}
      <div className="button-container">
        <button onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default SurveyScreen;
