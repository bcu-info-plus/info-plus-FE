import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Heading,
    Avatar,
    Input,
    FormControl,
    FormLabel,
    Button,
    Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import MypageSidebar from './MypageSidebar';

const MyPage: React.FC = () => {
    const [userData, setUserData] = useState({
        nickname: '',
        name: '',
        email: '',
        profileImage: '',
    });

    // Access Token과 Refresh Token 가져오기
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // 유저 데이터를 가져오는 함수
    const fetchUserData = async (token: string, refreshToken: string) => {
        try {
            // 1. Access Token으로 사용자 데이터를 가져옴
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Access Token을 헤더에 추가
                },
            });

            // 서버에서 받아온 사용자 데이터를 상태에 저장
            const { nickname, name, email, profileImage } = response.data;
            setUserData({ nickname, name, email, profileImage });

        } catch (error: any) {
            // 2. 만약 Access Token이 만료되었다면 (401 에러 발생 시)
            if (error.response && error.response.status === 401) {
                try {
                    // Refresh Token을 사용하여 Access Token을 갱신
                    const refreshResponse = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
                        refreshToken, // Refresh Token을 전송
                    });

                    // 새로운 Access Token을 localStorage에 저장
                    const newAccessToken = refreshResponse.data.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);

                    // 새로운 Access Token을 사용하여 다시 사용자 데이터를 가져옴
                    const retryResponse = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`,
                        },
                    });

                    const { nickname, name, email, profileImage } = retryResponse.data;
                    setUserData({ nickname, name, email, profileImage });

                } catch (refreshError) {
                    console.error('Failed to refresh access token:', refreshError);

                    // Refresh Token도 실패한 경우, 로그인 페이지로 리다이렉트 또는 로그아웃 처리

                    // 토큰 삭제
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');

                    window.location.href = '/login';
                }
            } else {
                // 토큰 삭제
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                console.error('Failed to fetch user data:', error);

                window.location.href = '/login';
            }
        }
    };

    // useEffect로 컴포넌트가 로드되면 사용자 데이터 가져오기
    useEffect(() => {
        if (accessToken && refreshToken) {
            fetchUserData(accessToken, refreshToken);
        } else {
            // Access Token이나 Refresh Token이 없으면 로그인 페이지로 리다이렉트
            window.location.href = '/login';
        }
    }, [accessToken, refreshToken]);

    const handleUpdate = () => {
        // 수정 요청을 보내는 로직 추가
        console.log('프로필 수정 요청');
        // 실제 수정 로직은 axios.put 등을 사용하여 구현 가능
    };

    return (
        <Flex p={6} justify="center" align="start">
            {/* Sidebar */}
            <MypageSidebar />

            {/* Profile Form Section */}
            <Box w="60%">
                {/* Profile Picture and Nickname */}
                <Flex direction="column" align="center" mb={6}>
                    <Avatar size="xl" src={userData.profileImage || 'https://via.placeholder.com/150'} mb={4} />
                    <Heading size="md">{userData.nickname}</Heading>
                </Flex>

                {/* Profile Form */}
                <Stack spacing={6}>
                    <FormControl>
                        <FormLabel>이름</FormLabel>
                        <Input type="text" value={userData.name} readOnly />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={userData.email} readOnly />
                    </FormControl>

                    <FormControl>
                        <FormLabel>비밀번호</FormLabel>
                        <Input type="password" placeholder="*********" />
                    </FormControl>

                    <Button colorScheme="green" w="100px" alignSelf="flex-end" onClick={handleUpdate}>
                        수정
                    </Button>
                </Stack>
            </Box>
        </Flex>
    );
};

export default MyPage;
