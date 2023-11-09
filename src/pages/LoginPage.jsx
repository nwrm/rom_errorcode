import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginInput from '../components/Input/LoginInput';
import { setToken, getToken } from '../util/token';
import { setId, getId } from '../util/token';
import * as St from '../styles/styles';
import { LoginIcon, PasswordIcon } from '../asset/icon';
import PasswordChangeModal from '../components/Modal/PasswordChangeModal';

export default function LoginPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = getToken();
    const id = getId();
    if (!token || !id) {
      navigate('/'); // floor2
    }
  }, [navigate]);


  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [userId, setUserId] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const onLoginHandler = async (e) => {
    e.preventDefault();

    const userData = {
      username: id,
      password,
    };

    try {
      const response = await axios.post(
        'http://3.36.132.186:8000/api/auth/login',
        userData
      );
    
      if (response.status === 200) {
        setToken(response.data.token);
        console.log('로그인 성공:', response.data.token);
        navigate('/floor2');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 실패: ' + error.response.data.message);
    }
  };

  const openPasswordChangeModal = (userId) => {
    setUserId(userId);
    setOpenModal(true);
  };

  return (
    <St.LoginContainer1>
      <St.LoginContainer2>
        <St.LoginAllTitle>
          <St.LoginTitle>TAMINTAMS</St.LoginTitle>
          <St.LoginSubTitle>
            회의실 예약할 땐, 탐나는 인재 탐나는 스페이스
          </St.LoginSubTitle>
        </St.LoginAllTitle>
        <St.LoginCol>
          <St.LoginRow1>
            <St.LoginText>
              <LoginIcon />
            </St.LoginText>
            <LoginInput
              type="text"
              value={id}
              handleChange={setId}
              placeholder="아이디를 입력해주세요"
            />
          </St.LoginRow1>

          <St.LoginRow2>
            <St.LoginText>
              <PasswordIcon />
            </St.LoginText>
            <LoginInput
              type="password"
              value={password}
              handleChange={setPassword}
              placeholder="비밀번호를 입력해주세요"
            />
          </St.LoginRow2>

          <St.LoginButtons>
            <St.LoginButton onClick={() => navigate('/join')}>
              회원가입
            </St.LoginButton>
            <St.LoginBar>│</St.LoginBar>
            <St.LoginButton onClick={onLoginHandler}>로그인</St.LoginButton>
          </St.LoginButtons>
          <St.ForgetButton onClick={() => openPasswordChangeModal(userId)}>
            비밀번호를 잊어버리셨나요?
          </St.ForgetButton>
          <PasswordChangeModal
            open={openModal}
            close={() => setOpenModal(false)}
            userId={userId}
          />
        </St.LoginCol>
      </St.LoginContainer2>
    </St.LoginContainer1>
  );
}
