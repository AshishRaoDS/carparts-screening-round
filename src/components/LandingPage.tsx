import React, { FormEvent, useRef, useState } from 'react';
import '../LandingPage.css';
import emailjs from '@emailjs/browser';

interface Props {
  setIsQuizStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  userEmail: string;
  quizStartHandler: () => void;
  invalidUser: boolean;
  validateEmailHandler: () => void;
  userValidated: boolean;
  setQuizId: React.Dispatch<React.SetStateAction<string>>
  quizId: string;
}

const LandingPage: React.FC<Props> = ({
  quizStartHandler,
  setUserEmail,
  userEmail,
  invalidUser,
  userValidated,
  validateEmailHandler,
  quizId
}) => {
  const [userSideQuizId, setUserSideQuizId] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useRef<any>(null);

  const userEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value)
  }

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.current = form.current ?? ''

    const serviceID = import.meta.env.VITE_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicAPIKey = import.meta.env.VITE_EMAILJS_PUBLIC_API 
    emailjs.sendForm(serviceID, templateId, form.current, publicAPIKey)
      .then((result) => {
          console.log(result.text);
          validateEmailHandler()
      }, (error) => {
          console.log(error.text);
      });
  };

  const startQuizHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(userSideQuizId === quizId) {
      quizStartHandler();
    }
    setUserSideQuizId('') 
  }

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to your screening round</h1>
        <h3 className='noteTitle'>Things to note</h3>
        <ul className='listWrapper'>
          <li>You will be asked 15 questions.</li>
          <li>As soon as you start the quiz, a 2 minute timer will be set in motion.</li>
          <li>Quiz ends as soon as you answer all the questions or when the timer runs out.</li>
          <li>You get only one shot at the questions. After selecting an answer, you won't be able to change it.</li>
          <li>Please submit the form at the end or else the response won't be recorded.</li>
          <li>Enter your Quiz id at the left bottom. Correct Id should activate the Start Quiz CTA</li>
          <li>Re-attempt will not be considered. Page refresh will also be considered as re-attempt.</li>
        </ul>
        {
          invalidUser && <h2 className='invalidUser'>This email has already been used for screening round!</h2>
        }
        {
          userValidated ?
            <form className='startCtaIdWrapper' onSubmit={startQuizHandler}>
              <input className='quizId' onChange={(e) => setUserSideQuizId(e.target.value)} type="text" placeholder='Quiz ID' required value={userSideQuizId} />
              <button type='submit' className="start-quiz-button">Start Quiz</button>
            </form> :
            <form ref={form} className='startCtaIdWrapper' onSubmit={sendEmail}>
              <input className='quizId' onChange={userEmailHandler} type="email" placeholder='Email Id' required value={userEmail} />
              <input className='hiddenElement' value={quizId} name='quiz_id'/>
              <button type='submit' className="start-quiz-button">Validate email</button>
            </form>
        }
      </div>
    </div>
  );
};

export default LandingPage;
