import { useState } from "react";
import { useEffect } from "react";

const QuestionTimer = ({ timeout, onTimeout }) => {
  const [remainingTime, setRemaningTime] = useState(timeout);

  // create setTimeout() exexute after the timeout create in useEffect

  useEffect(() => {
    console.log("SetTimout");
    
    setTimeout(onTimeout, timeout);
  }, [timeout, onTimeout]);

  // set the Interval for progress bar , It will show the progress time each question
  useEffect(() => {
    console.log("INterval");
    
    setInterval(() => {
      setRemaningTime((prevTime) => prevTime - 100);
    }, 100); // each 100 millisecond the inner function will execute
  }, []); //

  return <progress value={remainingTime} max={timeout} id="question" />;
};

export default QuestionTimer;
