import React, { useState, useEffect } from "react";
import useQuestionQuizPool from "../hooks/useQuestionQuizPool";
import { generateQuestion } from "../helpers/questionGenerator";
import Question from "./Question";
import Congratulation from "./Congratulation";

export default function Quiz() {
  const { quizCountries, quizOptions } = useQuestionQuizPool();
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!quizCountries.length || !quizOptions.length) return;
    const loadQuizData = async () => {
      const dataPromise = new Promise(resolve => {
        const generated = quizCountries.map((_, index) =>
          generateQuestion(quizCountries, quizOptions, index)
        );
        setQuestions(generated);
        resolve();
      });
      const minTimePromise = new Promise(resolve => setTimeout(resolve, 1500));
      await Promise.all([dataPromise, minTimePromise]);
      setIsLoading(false);
    };
    loadQuizData();
  }, [quizCountries, quizOptions]);

  const handleAnswer = (option) => {
    if (showResult) return; 
    
    setSelected(option);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);
    setShowResult(true);

    // Espera 1.5 segundos y luego avanza automáticamente
    setTimeout(() => {
      handleNext();
    }, 1500); 
  };

  const handleNext = () => {
    setShowResult(false);
    setSelected(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const finalScore = questions.reduce(
        (acc, q, idx) => acc + (answers[idx] === q.answer ? 1 : 0),
        0
      );
      setScore(finalScore);
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const correctAnswersCount = answers.reduce((acc, currentAnswer, index) => {
    if (currentAnswer && questions[index] && currentAnswer === questions[index].answer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <p>Cargando preguntas...</p>
      </div>
    );
  }
  
  return (
    <>
      {quizFinished ? (
        <Congratulation 
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      ) : (
        <div className="quiz-layout">
          <div className="quiz-header">
            <h1 className="quiz-title">Country Quiz</h1>
            <div className="quiz-score-indicator">
              <span>🏆{correctAnswersCount} / {questions.length} Points</span>
            </div>
          </div>
          <div className="question-box">
            <div className="number-question">
              {questions.map((_, idx) => {
                let questionClass = 'question-section';
                if (idx === currentIndex) questionClass += ' active';
                else if (answers[idx] !== undefined) questionClass += ' answered';
                return (
                  <div key={idx} className={questionClass}>
                    {idx + 1}
                  </div>
                );
              })}
            </div>
            <Question
              question={questions[currentIndex]}
              onAnswer={handleAnswer}
              selected={selected}
              showResult={showResult}
            />
          </div>
          {/* El botón de siguiente ha sido eliminado de aquí */}
        </div>
      )}
    </>
  );
}