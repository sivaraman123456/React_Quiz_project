import { useState } from "react";
import { useEffect } from "react";

const QuestionTimer = ({ timeout, onTimeout }) => {
  const [remainingTime, setRemaningTime] = useState(timeout);

  // create setTimeout() exexute after the timeout create in useEffect

  useEffect(() => {
    console.log("SetTimout");

    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    }; // once the time is out than clean the timer
  }, [timeout, onTimeout]);

  // set the Interval for progress bar , It will show the progress time each question
  useEffect(() => {
    console.log("INterval");

    const timer = setInterval(() => {
      setRemaningTime((prevTime) => prevTime - 100);
    }, 100); // each 100 millisecond the inner function will execute

    return () => {
      clearInterval(timer);
    }; // // once the Interval exit of the  useEffect than clean the timer
  }, []); //

  return <progress value={remainingTime} max={timeout} id="question" />;
};

export default QuestionTimer;
