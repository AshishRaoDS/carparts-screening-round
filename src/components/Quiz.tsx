import React, { useState, useEffect } from 'react';
import { questions } from '../questions';

interface Props {
    submitQuiz: (score: number) => void
}

const Quiz: React.FC<Props> = ({submitQuiz}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState(600);

    useEffect(() => {
        if (timeLeft === 0) {
        submitAnswers(selectedOptions);
        }
        const interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        }, 1000);
  
        return () => clearInterval(interval);
    }, [timeLeft]);
  
    const handleOptionSelect = (option: string) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[currentQuestion] = option;
        setCurrentQuestion(prevState => prevState + 1)
        setSelectedOptions(newSelectedOptions);
        if(currentQuestion === 9) {
            submitAnswers(newSelectedOptions)
        }
    };

    const submitAnswers = (allSelectedOptions: string[]) => {
        console.log("Selected Options: ", allSelectedOptions);
        let totalScore = 0;
        allSelectedOptions.forEach((answer, index) => {
            if(questions[index].answer === answer) {
                totalScore += 1
            }
        })

        console.log('total Score', totalScore)
        submitQuiz(totalScore);

    
    };

    return (
      <div>
        <h1 className='title'>Screening round</h1>
        <p className='subTitle'>We keep the world moving. Come and be a part of it!</p>
        <p className="timer">Time left: {timeLeft} seconds</p>
        <div>
          <h2 className="question-title">{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].options.map((option) => (
            <button key={option} onClick={() => handleOptionSelect(option)} className="option-button">
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

    export default Quiz;
