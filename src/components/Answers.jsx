
import { useRef } from "react";
// eslint-disable-next-line react/prop-types
const Answers = ({answerState,answers, selectedAnswer,onSelect}) => {
    const shuffledAnswers=useRef()
    if(! shuffledAnswers.current) // CHECK if the shuffle is undefined or not . if it false than only shuffle
    {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
    {shuffledAnswers.current.map((answer) => {
      let cssClass=''
      // write a logic for  style to the selected answer 
      const isSelected= selectedAnswer === answer // this condition findout the user selected option

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
          <button onClick={() => onSelect(answer)} className={cssClass}>
            {answer}
          </button>
        </li>
      );
    })}
  </ul>
  )
}

export default Answers