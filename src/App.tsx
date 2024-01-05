import './index.css'
import Quiz from './components/Quiz'
import CarpartsLogo from './assets/CarpartsLogo'
import { useState } from 'react'
import { SubmitResponse } from './components/SubmitResponse'
import LandingPage from './components/LandingPage'

function App() {
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizId, setQuizId] = useState('');
  const [finalScore, setFinalScore] = useState(0)

  const resetQuiz = () => {
    setIsQuizSubmitted(false);
    setIsQuizStarted(false);
  }

  const submitQuiz = (score: number) => {
    setFinalScore(score)
    setIsQuizSubmitted(true);
  }

  if(!isQuizStarted) {
    return (
      <>
      <div className="header">
        <CarpartsLogo resetQuiz={resetQuiz}/>
      </div>
      <div className="quiz-container">
        <LandingPage setIsQuizStarted={setIsQuizStarted} setQuizId={setQuizId} quizId={quizId} />
      </div> 
    </>
    )
  }

  console.log('template Id', import.meta.env.VITE_EMAILJS_TEMPLATE_ID)

  return (
    <>
      <div className="header">
        <CarpartsLogo resetQuiz={resetQuiz} />
      </div>
      <div className="quiz-container">
        {
          !isQuizSubmitted ? <Quiz submitQuiz={submitQuiz}/> :
          <SubmitResponse finalScore={finalScore} quizId={quizId}/>
        }
      </div> 
    </>
  )
}

export default App
