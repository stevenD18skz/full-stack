import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaForm = ({ onCaptchaChange }) => {
  const recaptchaRef = useRef(null);

  const handleChange = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    onCaptchaChange(recaptchaValue);
  };

  return (
    <div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6Lcvgt8pAAAAALMtZBTGcJ7dWsH5eCJN6sdEAtrf"
        onChange={handleChange}
      />
    </div>
  );
};

export default RecaptchaForm;
