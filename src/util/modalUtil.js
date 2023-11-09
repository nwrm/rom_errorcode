// timeUtil
export const getTime = () => {
  return new Date().getTime();
};

export const TimeCalc = (date) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

    //타임슬롯: 모달창 넘버버튼
 export const timeSlots = Array.from({ length: 12 }, (_, time) => {
      const hour = time + 9;
    const endHour = hour+ 1; // 종료 시간을 시작 시간에 1을 더하여 계산
      return {
        label: `${hour < 10 ? '0' + hour : hour}:00`,
        value: time,
      };
    });




//roomUtill
export const setRoomState = (prevItems, roomname, updatedRoomTimes) => {
    return prevItems.map((room) =>
      room.name === roomname
        ? { ...room, selectTimes: updatedRoomTimes }
        : room
    );
  };

  