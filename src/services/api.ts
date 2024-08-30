import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const registerUser = async (email: string, password: string, nickname: string, major: string) => {
    const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        nickname,
        major
    });
    return response.data;
};

export const loginUser = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password
    });
    return response.data; // 예상되는 반환 값은 JWT 토큰입니다.
};
