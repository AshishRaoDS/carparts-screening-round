import React, { useEffect } from 'react';
import '../LandingPage.css';
import generateRandomId from '../helpers/generateId';

interface Props {
    setIsQuizStarted: React.Dispatch<React.SetStateAction<boolean>>;
    setQuizId: React.Dispatch<React.SetStateAction<string>>;
    quizId: string
}

const LandingPage: React.FC<Props> = ({ setIsQuizStarted, setQuizId, quizId }) => {


const quizStartHandler = () => {
    setIsQuizStarted(true)
}

useEffect(() => {
    const randomId = generateRandomId();
    setQuizId(randomId)
    console.log(randomId);
},[])

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to your screening round</h1>
        <h3 className='noteTitle'>Things to note</h3>
        <ul className='listWrapper'>
            <li>You will be asked 20 questions.</li>
            <li>As soon as you start the quiz, a 10 minute timer will be set in motion.</li>
            <li>Quiz ends as soon as you answer all the questions or when the timer runs out.</li>
            <li>You get only one shot at the questions. After selecting an answer, you won't be able to change it.</li>
            <li>Please submit the form at the end or else the response won't be recorded.</li>
            <li>Your Quiz id at the left bottom is used to identify your attempt.</li>
            <li>Re-attempt will not be considered. Page refresh will also be considered as re-attempt.</li>
        </ul>
        <div className='startCtaIdWrapper'>
            <input className='quizId' type="text" value={quizId} readOnly />
            <button onClick={quizStartHandler} className="start-quiz-button">Start Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
