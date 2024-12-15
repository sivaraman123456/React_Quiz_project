import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteIcon from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  console.log(activeQuestionIndex);

  const quizComplete = activeQuestionIndex === QUESTIONS.length;
  console.log(quizComplete);

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevSlectedAnswer) => {
      return [...prevSlectedAnswer, selectedAnswer];
    });
  }
  if (quizComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteIcon} alt="Trohy Icon" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          timeout={10000}
          onTimeout={() => handleSelectAnswer(null)}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
