import './index.css'
import Quiz from './components/Quiz'
import CarpartsLogo from './assets/CarpartsLogo'
import { useEffect, useState } from 'react'
import { SubmitResponse } from './components/SubmitResponse'
import LandingPage from './components/LandingPage'
// import { initializeApp } from 'firebase/app'
import { getUsers, saveUser, } from './services/firebase'
import { DocumentData } from 'firebase/firestore'
import { isEmailAvailable } from './helpers/checkEmailAvailability'
import generateRandomId from './helpers/generateId'
// import { Firestore, collection, getDocs, getFirestore } from 'firebase/firestore'

function App() {
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [finalScore, setFinalScore] = useState(0);
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [invalidUser, setInvalidUser] = useState(false);
  const [userValidated, setUserValidated] = useState(false);
  const [quizId, setQuizId] = useState(generateRandomId())

  const resetQuiz = () => {
    setIsQuizSubmitted(false);
    setIsQuizStarted(false);
  }

  const submitQuiz = (score: number) => {
    setFinalScore(score)
    setIsQuizSubmitted(true);
  }

  const loadUsers = async() => {
    const allUsers = await getUsers();
    setUsers(allUsers);
  }

  const validateEmailHandler = async () => {
      const validUser = isEmailAvailable(userEmail, users)
      if(!validUser) {
        setInvalidUser(true);
        setUserEmail('')
        return
      }
     const savedUserInfo = await saveUser({email: userEmail, name: ''})
     console.log('saved User', savedUserInfo)
      setUserValidated(true)
      setInvalidUser(false);
  }

  const quizStartHandler = () => {
      setIsQuizStarted(true);
      setUserValidated(false);
  }



  useEffect(() => {
    loadUsers()
  },[])

  if(!isQuizStarted) {
    return (
      <>
      <div className="header">
        <CarpartsLogo resetQuiz={resetQuiz}/>
      </div>
      <div className="quiz-container">
        <LandingPage 
          setIsQuizStarted={setIsQuizStarted} 
          setUserEmail={setUserEmail} 
          userEmail={userEmail} 
          validateEmailHandler={validateEmailHandler} 
          userValidated={userValidated}
          quizStartHandler={quizStartHandler} 
          invalidUser={invalidUser} 
          setQuizId={setQuizId}
          quizId={quizId}
          />
      </div> 
    </>
    )
  }

  return (
    <>
      <div className="header">
        <CarpartsLogo resetQuiz={resetQuiz} />
      </div>
      <div className="quiz-container">
        {
          !isQuizSubmitted ? <Quiz submitQuiz={submitQuiz}/> :
          <SubmitResponse 
            finalScore={finalScore} 
            userEmail={userEmail}
            quizId={quizId}
            />
        }
      </div> 
    </>
  )
}

export default App
