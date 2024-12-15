import Answers from "./Answers"
import QuestionTimer from "./QuestionTimer"


const Question = ({questionText,answers,onSelecteAnswer,selectedAnswer,answerState,skippedAnswer}) => {
  return (
<div id="question">
        <QuestionTimer
        // whenever the new question move than only it will re-create
          timeout={10000}
          onTimeout={skippedAnswer}
        />
        <h2>
          {/* <span>{activeQuestionIndex + 1} .</span>{" "} */}
          {questionText}
        </h2>
       <Answers
       // whenever the new question move than only it will re-create
        selectedAnswer={selectedAnswer}
        answerState={answerState} 
        answers={answers}
        onSelect={onSelecteAnswer}
        />
     
      </div>
  )
}

export default Question