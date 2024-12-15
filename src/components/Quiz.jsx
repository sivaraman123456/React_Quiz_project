import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteIcon from "../assets/quiz-complete.png";
import { useCallback } from "react";
import Question from "./Question.jsx";
const Quiz = () => {

  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState(""); // set the selected answer correct or wrong
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1; // this condition if the user doesn't slected any anwser it move on next question , if selected stay in same question  that's why length-1
  console.log(activeQuestionIndex);

  const quizComplete = activeQuestionIndex === QUESTIONS.length;
  console.log(quizComplete);

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("Answered"); // which is identifie if the option slected
      setUserAnswers((prevSlectedAnswer) => {
        return [...prevSlectedAnswer, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          // every first option is the answer that's why this condition
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState(""); // make this empty for move on next question
        }, 2000); // this inner Timeout will execute after the outter Timout exit
      }, 1000); // every one sec will check the answer
    },
    [activeQuestionIndex]
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
      key={activeQuestionIndex}         // whenever the new question move than only it will re-create
      questionText={QUESTIONS[activeQuestionIndex].text}
      answers={QUESTIONS[activeQuestionIndex].answers }
      onSelecteAnswer={handleSelectAnswer}
      selectedAnswer={userAnswers[userAnswers.length-1]}
      answerState={answerState}
      skippedAnswer={skippedAnswer}
      />
    </div>
  );
};

export default Quiz;
