import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteIcon from "../assets/quiz-complete.png";
import { useCallback } from "react";
import Question from "./Question.jsx";
const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  // const activeQuestionIndex =
  //   answerState === "" ? userAnswers.length : userAnswers.length - 1; // this condition if the user doesn't slected any anwser it move on next question , if selected the answer it will stay in same question  that's why length-1

  const activeQuestionIndex = userAnswers.length;
  console.log(activeQuestionIndex);

  const quizComplete = activeQuestionIndex === QUESTIONS.length; // last Template
  console.log(quizComplete);

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setUserAnswers((prevSlectedAnswer) => {
        return [...prevSlectedAnswer, selectedAnswer];
      });
    },
    []
  ); // this dependecy based executing this callback hook

  const skippedAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  if (quizComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteIcon} alt="Trohy Icon" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex} // whenever the new question move the activeQuestionIndex increase than only it will re-create
        index={activeQuestionIndex}
        onSelecteAnswer={handleSelectAnswer}
        skippedAnswer={skippedAnswer}
      />
    </div>
  );
};

export default Quiz;
