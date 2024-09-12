import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Input, Checkbox, Flex, Text, Link, Stack, Divider, Image, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState(''); // 이메일 상태
    const [password, setPassword] = useState(''); // 비밀번호 상태
    const toast = useToast(); // toast를 사용하여 알림 메시지를 표시
    const navigate = useNavigate(); // 로그인 성공 시 리다이렉트용

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                email,
                password
            });

            if (response.status === 200) {
                // Access Token과 Refresh Token을 구분하여 저장
                const { accessToken, refreshToken } = response.data; // 서버에서 반환된 토큰들
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                // 성공 알림 표시
                toast({
                    title: '로그인 성공',
                    description: '성공적으로 로그인하였습니다.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                // 로그인 후 리다이렉트
                navigate('/'); // 원하는 경로로 리다이렉트
            }
        } catch (error: any) {
            if (error.response) {
                const { status } = error.response;

                // 상태 코드에 따른 처리
                if (status === 404) {
                    // 가입된 정보가 없는 경우
                    toast({
                        title: '로그인 실패',
                        description: '가입된 정보가 없습니다. 이메일을 확인해주세요.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                } else if (status === 401) {
                    // 로그인 정보가 틀린 경우
                    toast({
                        title: '로그인 실패',
                        description: '이메일 또는 비밀번호가 잘못되었습니다.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                } else if (status === 500) {
                    // 서버에서 기타 예외가 발생한 경우
                    toast({
                        title: '서버 오류',
                        description: '서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                } else {
                    // 기타 처리되지 않은 오류
                    toast({
                        title: '로그인 실패',
                        description: '로그인 중 알 수 없는 오류가 발생했습니다.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } else {
                // 서버로부터 응답이 없거나 네트워크 오류인 경우
                toast({
                    title: '로그인 실패',
                    description: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Flex align="center" justify="center" h="100vh" bg="white">
            <Box
                w="400px"
                p={8}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
                textAlign="center"
            >
                {/* 로그인 텍스트 */}
                <Text fontSize="2xl" fontWeight="bold" mb={6}>
                    로그인
                </Text>

                {/* 소셜 로그인 버튼 */}
                <Stack spacing={4}>
                    <Button
                        colorScheme="gray"
                        variant="outline"
                        leftIcon={<Image src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Google_2015_logo.svg" boxSize="20px" />}
                    >
                        Continue with Google
                    </Button>

                    <Button
                        colorScheme="gray"
                        variant="outline"
                        leftIcon={<Image src="https://upload.wikimedia.org/wikipedia/commons/4/48/KakaoTalk_logo.svg" boxSize="20px" />}
                    >
                        Continue with Kakao
                    </Button>
                </Stack>

                {/* 구분선 */}
                <Divider my={6} />

                {/* 이메일 및 비밀번호 입력 */}
                <Stack spacing={4}>
                    <Input
                        placeholder="Email"
                        size="md"
                        borderColor="gray.400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // 이메일 입력 값 업데이트
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        size="md"
                        borderColor="gray.400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 값 업데이트
                    />
                    <Button colorScheme="green" size="md" width="full" onClick={handleLogin}>
                        로그인
                    </Button>
                </Stack>

                {/* 이메일 기억하기 체크박스 및 비밀번호 찾기 */}
                <Flex mt={4} justify="space-between" align="center">
                    <Checkbox>이메일 기억하기</Checkbox>
                    <Link color="gray.500" fontSize="sm">
                        비밀번호를 잊으셨나요?
                    </Link>
                </Flex>

                {/* 이미 계정이 있는 경우 회원가입 링크 */}
                <Text mt={4} fontSize="sm" color="gray.600">
                    계정이 없으신가요?{' '}
                    <Link as={RouterLink} to="/register" color="black" fontWeight="bold">
                        회원가입
                    </Link>
                </Text>
            </Box>
        </Flex>
    );
};

export default LoginPage;
