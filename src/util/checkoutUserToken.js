import axios from 'axios';
import { getToken } from './token';

export const checkoutUserToken = async () => {
  const token = getToken();

  try {
    const response = await axios.post('http://3.36.132.186:8000/api/logout', {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (response.status === 200) {
      localStorage.clear();
      console.log('토큰이 제거되었습니다 ->', response);
    }
  } catch (error) {
    console.error(error);
    alert(error);
  }
};
