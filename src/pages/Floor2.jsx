import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getToken, getId } from '../util/token';
import * as St from '../styles/styles';
import ReservationModal from '../components/Modal/ReservationModal'; // 수정된 부분
import axios from 'axios';

// 룸버튼 크기
const sizeHandler = (size) => {
  switch (size) {
    case 'large':
      return {
        width: '93px',
        height: '125px',
      };
    case 'small':
      return {
        width: '40px',
        height: '60px',
      };
    default:
      return {};
  }
};
// const size = ["large", "small", "xlarge"];
// const color = ["green", "yellow", "transparent"];

const roomData = [
  { name: '협재', sizeHandler: 'large', colorHandler: 'green' },
  { name: '곽지', sizeHandler: 'large', colorHandler: 'green' },
  { name: '이호', sizeHandler: 'large', colorHandler: 'green' },
  { name: '함덕', sizeHandler: 'large', colorHandler: 'green' },
  { name: '월평', sizeHandler: 'large', colorHandler: 'green' },
  { name: '김녕', sizeHandler: 'large', colorHandler: 'green' },
  { name: '신양', sizeHandler: 'large', colorHandler: 'green' },
  { name: '', sizeHandler: 'large', colorHandler: 'transparent' },
  { name: '하모', sizeHandler: 'large', colorHandler: 'green' },
  { name: '화순', sizeHandler: 'large', colorHandler: 'green' },
  { name: '중문', sizeHandler: 'large', colorHandler: 'green' },
  { name: '표선', sizeHandler: 'large', colorHandler: 'green' },
  { name: 'Na1', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: 'Na2', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: 'Na3', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: '', sizeHandler: 'small', colorHandler: 'transparent' },
  { name: 'Na4', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: 'Na5', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: 'Na6', sizeHandler: 'small', colorHandler: 'yellow' },
];

const Floor2img = styled.div`
  background-image: url('/Floor2.png');
  background-position: center;
  height: 600px;
  background-repeat: no-repeat;
`;

const ButtonsRows = styled.section`
  display: flex;
  align-items: stretch;
  max-width: 758px;
  justify-content: space-between;
  margin: auto;
`;

const ButtonColumns = styled.section`
  position: relative;
  top: -538px;
`;

const Floor2 = () => {
  const [modalOpen, setModalOpen] = useState(false); //초기값: 모달닫기상태
  const [roomState, setRoomState] = useState(roomData); //index = roomData2(배열값)
  const [roomname, setRoomname] = useState(''); //roomname = roomData.name(방이름 초기값)
  const [selectedButtons, setSelectedButtons] = useState([]);
  const navigate = useNavigate(); // 페이지간 이동을 위한 함수 import



  useEffect(() => {
    const token = getToken();
    const id = getId();
    if (!token || !id) {
      navigate("/");
    }
  }, [navigate]);

  const logOutHandler = async () => {
    const token = getToken();
    const id = getId();
    console.log(token, id);
    try {
      await axios.post('http://3.36.132.186:8000/api/log-out', null, {
        headers: { Authorization: `Bearer ${token}`},
      });
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패', error);
    }
  };

  //모달 창 열기
  const handleOpenModal = (room) => {
    setModalOpen(true); //setModalOpen의 상태가 true값으로 되면서 열림
    setRoomname(room.name); //room.name을 클릭한 값의 데이터에서 받아옴
    console.log('room name:', room.name); //room.name값 받는지 콘솔로그 체크
  };

  //모달닫기
  const handleCloseModal = () => {
    setModalOpen(false); // modalOpen 상태가 false로 되면서 모달이 닫힘
    setSelectedButtons([]); // 선택된 버튼들이 초기화됨
  };



  //선택 시간 업데이트 버튼 - 특정 방의 선택된 시간(selectTimes)값을 업데이트
  const handleSelectedTimes = (roomname, updatedRoomTimes) => {
    // roomname과 updatedRoomTimes를 매개변수로 받아와서
    setRoomState((prevItems) =>
      prevItems.map((room) =>
        // 이전의 방 목록(prevItems)을 매핑하면서 특정 방의 이름과 일치하는 경우
        room.name === roomname
          ? // 해당 방의 선택된 시간(selectTimes)을 업데이트된 시간(updatedRoomTimes)으로 설정
            { ...room, selectTimes: updatedRoomTimes }
          : // 그렇지 않으면 이전의 방 목록을 유지
            room
      )
    );
  };




  return (
    <>
      <St.HeaderWrap>
        <St.ButtonWrapper>
          <St.Button style={{ fontSize: '50px' }}>2F </St.Button>
          <span> I </span>
          <St.Button
            style={{ color: 'lightgrey' }}
            onClick={() => {
              navigate('/Floor3'); //3층 페이지로 이동하는 이벤트함수 처리 필요함
            }}
          >
            3F
          </St.Button>
        </St.ButtonWrapper>
        <St.Button onClick={logOutHandler}>탐나는 인재님</St.Button>
      </St.HeaderWrap>
      <St.Mapping>
        <Floor2img />
        <ButtonColumns>
          <ButtonsRows style={{ marginBottom: '36px' }}>
            {roomState.slice(0, 7).map(
              (
                room,
                index //예약 상태가 변경될거니까 roomState가 더 적절
              ) => (
                <St.RoomButton
                  key={index}
                  onClick={() => handleOpenModal(room)} //모달오픈동작
                  style={{
                    ...sizeHandler(room.sizeHandler),
                    ...St.colorHandler(room.colorHandler),
                  }}
                >
                  {room.name}
                </St.RoomButton>
              )
            )}
          </ButtonsRows>
          <ButtonsRows>
            {roomState.slice(7, 16).map(
              (
                room,
                index //예약 상태가 변경될거니까 roomState가 더 적절
              ) => (
                <St.RoomButton
                  key={index}
                  onClick={() => handleOpenModal(room)} //모달오픈동작
                  style={{
                    ...sizeHandler(room.sizeHandler),
                    ...St.colorHandler(room.colorHandler),
                  }}
                >
                  {room.name}
                </St.RoomButton>
              )
            )}
          </ButtonsRows>
        </ButtonColumns>
      </St.Mapping>

      {/*모달 컴퍼넌트 추가*/}
      <ReservationModal //
        open={modalOpen}
        close={handleCloseModal}//
        selectedButtons={selectedButtons}
        roomname={roomname} //
        handleSelectedTimes={handleSelectedTimes}
        
      >

      </ReservationModal>
    </>
  );
};

export default Floor2;
