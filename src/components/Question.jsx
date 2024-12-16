import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTION from "../questions.js";

const Question = ({ index, onSelecteAnswer, skippedAnswer }) => {
  const [answer, setAnswer] = useState({
    // set the selected answer and set correct or wrong
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTION[index].answers[0] === answer,
      });
      setTimeout(() => {
        onSelecteAnswer(answer);
      }, 2000); // this inner Timeout will execute after the outter Timout exit
    }, 1000); // every one sec will check the answer
  }
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    // which is to reduce the props . you may remove the answerState prop
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "Answered";
  }
  return (
    <div id="question">
      <QuestionTimer
        // whenever the new question move than only it will re-create
        timeout={10000}
        onTimeout={skippedAnswer}
      />
      <h2>
        <span>{index + 1} .</span> {QUESTION[index].text}
      </h2>
      <Answers
        // whenever the new question move than only it will re-create
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        answers={QUESTION[index].answers}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
