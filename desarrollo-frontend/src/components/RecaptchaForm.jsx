import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaForm = () => {
  const recaptchaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    if (recaptchaValue) {
      // Aquí puedes enviar el formulario junto con el token de reCAPTCHA
      console.log('reCAPTCHA value:', recaptchaValue);
      // Envía el formulario usando fetch, axios, etc.
    } else {
      console.log('Por favor, completa el reCAPTCHA.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6Lcvgt8pAAAAALMtZBTGcJ7dWsH5eCJN6sdEAtrf"
          action="LOGIN"
        />
      </form>
    </div>
  );
};

export default RecaptchaForm;
