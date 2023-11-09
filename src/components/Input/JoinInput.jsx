import { useState } from 'react';
import * as St from '../../styles/styles';

export default function JoinInput(props) {
  const { value, handleChange, validationMessage, validator } = props;
  const [isCheck, setIsCheck] = useState(true);

  const handleKeyUp = () => {
    let isValid = true;

    if (validator) {
      isValid = validator(value);
    }

    setIsCheck(isValid);

    if (!isValid) {
      if (props.setErrorMessage) {
        props.setErrorMessage(validationMessage);
      }
    } else {
      if (props.setErrorMessage) {
        props.setErrorMessage('');
      }
    }

    // handleChange(value);
  };

  return (
    <>
      <St.Input
        type={props.type || 'text'}
        value={value}
        // onChange={(e) => handleChange(e.target.value)}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </>
  );
}
