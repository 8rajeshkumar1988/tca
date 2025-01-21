'use client';
import React, { useState } from 'react';

const TriviaStepper = () => {
  const trivia_list = [
    {
      id: 1,
      question: "Do you prefer working from home?",
      options: [
        { id: 1, text: "Yes" },
        { id: 2, text: "can" },
        { id: 3, text: "could" },
        { id: 4, text: "No" }
      ],
      answer: 'No'
    },
    {
      id: 2,
      question: "Do you enjoy team collaboration?",
      options: [
        { id: 1, text: "Yes" },
        { id: 2, text: "can" },
        { id: 3, text: "could" },
        { id: 2, text: "No" }
      ],
      answer: 'Yes'
    },
    {
      id: 3,
      question: "Are you satisfied with your current role?",
      options: [
        { id: 1, text: "Yes" },
        { id: 2, text: "can" },
        { id: 3, text: "could" },
        { id: 2, text: "No" }
      ],
      answer: 'Yes'
    },
    {
      id: 4,
      question: "Do you prefer coffee over tea?",
      options: [
        { id: 1, text: "Coffee" },
        { id: 2, text: "can" },
        { id: 3, text: "could" },
        { id: 2, text: "Tea" }
      ],
      answer: 'Tea'
    },    
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedAnswer(option.text); // Set the selected option
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return; // Do nothing if no option is selected
    setIsAnswered(true); // Mark as answered
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null); // Reset selected answer
    setIsAnswered(false); // Reset answered state
  };

  const handleQuizSubmit = () => {
    alert("Quiz completed! Thanks for participating.");
  };

  const currentQuestion = trivia_list[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="question-count text-black">
        {String(currentQuestionIndex + 1).padStart(2, '0')} / {String(trivia_list.length).padStart(2, '0')}
      </div>

      <h2>{currentQuestion.question}</h2>
      <div className="options">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedAnswer === option.text;
          const isCorrect = option.text === currentQuestion.answer;
          const buttonStyle =
            isAnswered && isSelected
              ? { backgroundColor: isCorrect ? 'green' : 'red' }
              : isSelected
              ? { backgroundColor: 'lightblue' }
              : {};

          return (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              disabled={isAnswered} // Disable after submission
              style={buttonStyle}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      <div className="navigation">
        {!isAnswered && (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer} // Inactive if no option is selected
            style={{
              cursor: !selectedAnswer ? 'not-allowed' : 'pointer',
              opacity: !selectedAnswer ? 0.6 : 1,
            }}
          >
            Submit
          </button>
        )}

        {isAnswered && currentQuestionIndex < trivia_list.length - 1 && (
          <button onClick={handleNextQuestion}>Next</button>
        )}

        {isAnswered && currentQuestionIndex === trivia_list.length - 1 && (
          <button onClick={handleQuizSubmit}>Finish</button>
        )}
      </div>
    </div>
  );
};

export default TriviaStepper;
