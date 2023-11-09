// 회원가입 및 로그인 관련 유효성 검사 코드 (API)

//  아이디 유효성 검사
export const validateUserId = (id) => {
  if (id.length === 0) {
    return true;
  }

  if (id.length < 7 || id.length > 12) {
    return false;
  }

  if (!/\d/.test(id)) {
    return false;
  }

  const regex = /^[a-zA-Z0-9]*$/;
  return regex.test(id);
};

// 비밀번호 유효성 검사
export const validatePassword = (password) => {
  if (password.length === 0) {
    return true;
  }

  if (password.length < 8) {
    return false;
  }

  const regex = /[\W_]/;
  if (!regex.test(password)) {
    return false;
  }

  return true;
};
