import axios from "axios";

const API_URL = "http://3.36.132.186:8000";

// 최종 예약하기
export const bookRoom = async (roomId, userId, bookDate, bookTime, durationHours, token,) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/books`,{
        roomId,
        userId,
        bookDate,
        bookTime,
        durationHours,
        token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // 헤더에 토큰을 포함시킴
        }
      }
    );    
    
    if (response.status === 200) 
    console.log("Booking Response:", response.data);
    return response.data
  } catch (error) {
    console.error("Booking error:", error);
    throw error;
  }
};

// 예약 내역 조회
export const fetchReservationHistory = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/userinfo2/${id}`);
    console.log("Reservation History Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservation history:", error);
    throw error;
  }
};