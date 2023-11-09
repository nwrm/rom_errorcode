import React, { useState } from 'react';
import axios from 'axios';
import * as St from '../../styles/styles';
import '../../styles/css/PasswordChangeModalStyles.css';

export default function PasswordChangeModal(props) {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'userId') {
      setUserId(value);
    }
  };

  const verifyUser = async () => {
    try {
      const response = await axios.get(
        `http://54.180.31.53:8080/api/user/${userId}`
      );

      if (response.status === 200) {
        const userData = response.data;
        // 입력한 이름과 아이디가 사용자 정보와 일치하는지 확인합니다.
        if (userData.name === name && userData.id === userId) {
          setMessage('개인정보가 확인되었습니다.');
          console.log(setMessage);
          alert(setMessage);
          setIsVerified(true);
        } else {
          setMessage('이름 또는 아이디가 일치하지 않습니다.');
          console.log(setMessage);
          alert(setMessage);
        }
      } else {
        setMessage('사용자 정보를 가져올 수 없습니다.');
        console.log(setMessage);
        alert(setMessage);
      }
    } catch (error) {
      setMessage('본인 확인 실패');
      console.log(setMessage);
    }
  };

  const handlePasswordChange = async () => {
    try {
      if (isVerified) {
        // 이름과 아이디가 확인된 경우에만 비밀번호 변경 요청을 보냅니다.
        const response = await axios.put(
          `http://54.180.31.53:8080/api/user/${userId}`,
          { name: name, userid: userId, password: setPassword }
        );
        if (response.data.msg === '회원 정보 수정 완료') {
          setMessage('비밀번호가 변경되었습니다.');
          console.log(setMessage);
          alert(setMessage);
          // 여기에서 모달을 닫을 수 있는 함수를 호출해 모달을 닫을 수 있도록 구현하세요.
        }
      } else {
        setMessage('사용자 정보를 확인하세요.');
        console.log(setMessage);
        alert(setMessage);
      }
    } catch (error) {
      setMessage('비밀번호 변경 실패');
      console.log(setMessage);
      alert(setMessage);
    }
  };

  return (
    <div
      className={
        props.open
          ? 'openModal modal passwordchangemodalsection'
          : 'modal passwordchangemodalsection'
      }
    >
      {props.open ? (
        <section>
          <header>
            개인정보 확인
            <button className="close" onClick={props.close}>
              &times;
            </button>
          </header>
          <main>
            <St.PCMText>이름</St.PCMText>
            <St.PCMInput
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />

            <St.PCMText>아이디</St.PCMText>
            <St.PCMInput
              type="text"
              name="userId"
              value={userId}
              onChange={handleChange}
            />

            {isVerified && (
              <div>
                <St.PCMText>새로운 비밀번호</St.PCMText>
                <St.PCMInput
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
            )}
          </main>
          <footer>
            <button className="verify-user" onClick={verifyUser}>
              확인
            </button>
            {isVerified ? (
              <button
                className="change-password"
                onClick={handlePasswordChange}
              >
                변경
              </button>
            ) : null}
          </footer>
          {/* <div>{message}</div> */}
        </section>
      ) : null}
    </div>
  );
}
