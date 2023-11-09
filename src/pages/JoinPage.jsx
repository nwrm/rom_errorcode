import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JoinInput from '../components/Input/JoinInput';
import { getToken } from '../util/token';
import * as St from '../styles/styles';
import { validateUserId, validatePassword } from '../util/validation';

export default function JoinPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate('/join');
    }
  }, [navigate]);

  const handleInputChange = (value, validator, validationMessage) => {
    if (!value) {
      setErrorMessage('');
    } else {
      if (validator(value)) {
        setErrorMessage('');
      } else {
        setErrorMessage(validationMessage);
      }
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!id) {
      setErrorMessage('아이디를 입력하세요.');
      return;
    }

    if (!password) {
      setErrorMessage('비밀번호를 입력하세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 서로 다릅니다.');
      setErrorMessage('비밀번호와 비밀번호 확인이 서로 다릅니다.');
      return;
    }

    if (!validateUserId(id)) {
      setErrorMessage(
        '아이디는 7자리 이상 12자리 이하이며, 특수문자와 한글은 포함되지 않습니다.'
      );
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage(
        '비밀번호는 8자리 이상이며, 특수문자가 1개 이상 포함되어야 합니다.'
      );
      return;
    }

    const userData = {
      username: id,
      password,
      name,
    };

    try {
      const response = await axios.post(
        'http://3.36.132.186:8000/api/auth/register',
        userData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        alert('회원가입이 완료되었습니다.');
        navigate('/');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <St.JoinContainer1>
      <St.JoinContainer2>
        <St.JoinHeader>
          <St.JoinSubTitle>TAMINTAMS</St.JoinSubTitle>
          <St.JoinTitle>회원가입</St.JoinTitle>
        </St.JoinHeader>
        <St.JoinRow1>
          <St.JoinText>아이디</St.JoinText>
          <JoinInput
            type="text"
            value={id}
            handleChange={(e) => setId(e.target.value)}
          />
        </St.JoinRow1>
        {validateUserId(id) || (
          <St.ErrorMessage>
            아이디는 7~12자 이내, 특수문자와 한글은 포함하지 않습니다.
          </St.ErrorMessage>
        )}
        <St.JoinRow2>
          <St.JoinText>비밀번호</St.JoinText>
          <JoinInput
            type="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
        </St.JoinRow2>
        {validatePassword(password) || (
          <St.ErrorMessage>
            비밀번호는 8자 이상, 특수문자는 1개 이상 들어가야 됩니다.
          </St.ErrorMessage>
        )}
        <St.JoinRow3>
          <St.JoinText>비밀번호 확인</St.JoinText>
          <St.Input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </St.JoinRow3>
        {password === passwordConfirm || (
          <St.ErrorMessage>비밀번호가 일치하지 않습니다.</St.ErrorMessage>
        )}

        <St.JoinRow4>
          <St.JoinText>사용자 이름</St.JoinText>
          <St.Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </St.JoinRow4>
        {name.trim() === '' && (
          <St.ErrorMessage>사용자 이름을 입력하세요.</St.ErrorMessage>
        )}

        <St.JoinButtons>
          <St.JoinButton onClick={() => navigate('/')}>이전으로</St.JoinButton>
          <St.JoinBar>│</St.JoinBar>
          <St.JoinButton onClick={onSubmitHandler}>가입완료</St.JoinButton>
        </St.JoinButtons>
      </St.JoinContainer2>
    </St.JoinContainer1>
  );
}
