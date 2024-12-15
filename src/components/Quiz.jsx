import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteIcon from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import { useCallback } from "react";
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
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={skippedAnswer}
        />
        <h2>
          <span>{activeQuestionIndex + 1} .</span>{" "}
          {QUESTIONS[activeQuestionIndex].text}
        </h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            let cssClass=''
            // write a logic for  style to the selected answer 
            const isSelected=userAnswers[userAnswers.length-1] === answer // this condition findout the user selected option

            if(answerState==='Answered' && isSelected)
            {
                console.log(answerState);
                
                cssClass='selected'
            }
            // write a logic for make style if the answer correct or wrong

            if((answerState === 'correct' || answerState==='wrong') && isSelected)
            {
                cssClass=answerState
            }
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
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
