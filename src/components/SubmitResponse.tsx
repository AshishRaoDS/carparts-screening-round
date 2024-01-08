import React, { FormEvent, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ThankYouScreen from './ThankYouScreen';

interface Props {
    finalScore: number
    userEmail: string;
    quizId: string;
  }

export const SubmitResponse: React.FC<Props> = ({finalScore, userEmail, quizId}) => {
    const [formSubmitted, setFormSubmitted] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useRef<any>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.current = form.current ?? ''

    const serviceID = import.meta.env.VITE_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicAPIKey = import.meta.env.VITE_EMAILJS_PUBLIC_API 
    emailjs.sendForm(serviceID, templateId, form.current, publicAPIKey)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      setFormSubmitted(true)
  };

  if(formSubmitted) {
    return <ThankYouScreen />
  }

  return (
    <div className='formWrapper'>
        <form ref={form} onSubmit={sendEmail}>
        <label className='formLabel'>Name</label>
        <input className='formInput nameInput' type="text" name="from_name" />
        <label className='formLabel'>Email</label>
        <input value={userEmail} readOnly className='formInput emailInput' type="email" name="from_email" />
        <label className='formLabel'>Feed Back</label>
        <textarea className='formTextArea' name="message" />
        <input className='hiddenElement' value={finalScore} name='final_score'/>
        <input className='hiddenElement' value={quizId} name='quiz_id'/>
        <input className='sendCta' type="submit" value="Send" />
        </form>
        <div className='imageWrapper'>
            <img className='image' src="https://media.giphy.com/media/WoddXx7YtZeCqUD2tV/giphy.gif" alt="Finish Line" />
        </div>
    </div>
  );
};