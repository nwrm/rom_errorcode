import React, { useState, useEffect } from "react";
import "../../styles/css/ReservationModal.css";
import { getToken } from "../../util/token";
import { getId } from "../../util/token";
import { bookRoom } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { TimeCalc } from "../../util/modalUtil";

const ReservationModal = (props) => {
  const { open, close, roomname, } = props; // open prop 추가
  const [selectedButtons, setSelectedButtons] = useState([]); //선택된 버튼들을 배열로 모아둠
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const id = getId();
    if (!token || !id) {
      navigate("/");
      
    }
  }, [navigate]);


    //타임슬롯: 모달창 넘버버튼
    const timeSlots = Array.from({ length: 12 }, (_, time) => {
      const hour = time + 9;
    const endHour = hour+ 1; // 종료 시간을 시작 시간에 1을 더하여 계산
      return {
        label: `${hour < 10 ? '0' + hour : hour}:00`,
        value: time,
      };
    });



    //버튼을 클릭했을때 동작
    const handleButtonClick = (hour) => {
      const token = getToken();
      const id = getId();
      
      if (selectedButtons.includes(hour)) {
        setSelectedButtons(
          selectedButtons.filter((selectedHour) => selectedHour !== hour)
        ); // 이미 선택된 버튼이면 선택 해제
      } else if (selectedButtons.length < 2) {
        setSelectedButtons([...selectedButtons, hour]); // 선택된 버튼이 2개 미만이면 새로운 버튼 선택
      } else {
        setSelectedButtons([hour]); //그 외에는 선택된 버튼을 새로운 버튼으로 대체
      }
      console.log('Selected button value:', hour, roomname); 
      console.log('token:', token, 'id:', id)// 선택된 방의 이름 로그로 출력
    };
  


  const calculateStartTime = (start) => {
    const parsedStart = parseInt(start);
    return parsedStart + 9 + ":00";
  };

  const calculateEndTime = (start, duration) => {
    const hours = parseInt(calculateStartTime(start));
    const endTime = hours + duration;
    return endTime.toString().padStart(2, "0") + ":00";
  };

  const handleTimeSlot = (start, duration) => {
    const startTime = calculateStartTime(start);
    const endTime = calculateEndTime(start, duration);
    console.log("Selected time slot: ", startTime, endTime);

    const newTimeSlot = { startTime, endTime };
    setSelectedTimeSlots((prevTimeSlots) => [...prevTimeSlots, newTimeSlot]);
  };

  const handleBookingClick = async () => {
    if (selectedButtons.length === 0) {
      alert("시간을 선택해주세요!");
    } else {

      try {     
        selectedButtons.forEach((button) => {
          handleTimeSlot(button, 1); // 각 버튼에 대해 1시간씩 예약하도록 설정
        });

        const id = getId();
        const bookDate = TimeCalc(new Date());
        const startTime = calculateStartTime(selectedButtons[0]);
        const endTime = calculateEndTime(selectedButtons[0], selectedButtons.length);
        const bookTime = selectedTimeSlots.map((timeSlot) => `${timeSlot.startTime} - ${timeSlot.endTime}`).join(", ");
   
        const formData = {
          roomId: roomname,
          userId: id,
          bookDate: bookDate,
          bookTime: bookTime,
          durationHours: selectedButtons.length,
          token: getToken(),
        };

        const response = await bookRoom(
          formData.roomId,
          formData.userId,
          formData.bookDate,
          formData.bookTime,
          formData.durationHours,
          formData.token,
        );

       

alert(
  "예약완료:",
  roomname,
  selectedButtons,
  bookDate,
  `예약시간: ${startTime} ~ ${endTime}`
); close(); selectedButtons([]); // 예약이 완료되면 모달을 닫고 선택된 버튼을 초기화합니다.
      } catch (error) {
        console.error("Error during booking:", error);
        // alert("예약 중 오류가 발생했습니다."); // 3번
        // 좀 더 사용자 친화적인 방식으로 에러 메시지를 표시합니다.
        // 로깅 라이브러리를 사용하여 에러를 기록하는 것이 좋습니다.

      }
    }
  };

 return (
    <div className={open ? 'openModal modal' : 'modal'}  open={open}>
      {open ? (
        <section>
          <header>
            {roomname}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            {timeSlots.map((timeSlot) => (
              <button
                key={timeSlot.value}
                className={`timelinebutton timeslot ${
                  selectedButtons.includes(timeSlot.value) ? 'selected' : ''
                }`}
                onClick={() => handleButtonClick(timeSlot.value)}
              >
                {timeSlot.label}
              </button>
            ))}
          </main>
          <footer>
            <button className="booking" onClick={handleBookingClick}>
              예약
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ReservationModal;
