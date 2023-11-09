import { redirect } from 'react-router-dom';
import * as St from '../../styles/styles';

export default function LoginInput(props) {
  const { value, handleChange, placeholder } = props;

  return (
    <St.LoginInput
      type={props.type || 'text'}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
