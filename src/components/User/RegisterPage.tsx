import React, { useState, useEffect } from 'react';
import { Box, Input, Button, Stack, Text, FormControl, FormLabel, FormErrorMessage, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // 리다이렉트를 위한 useNavigate 가져오기
import axios from 'axios';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [major, setMajor] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [formErrors, setFormErrors] = useState({ email: '', name: '', major: '', password: '', confirmPassword: '' });
    const [passwordsMatch, setPasswordsMatch] = useState(true); // 비밀번호 일치 여부 상태 추가
    const toast = useToast(); // Chakra UI의 toast를 사용하여 알림 메시지를 표시
    const navigate = useNavigate(); // 리다이렉트용 훅

    // useEffect로 비밀번호가 일치하는지 실시간 검증
    useEffect(() => {
        if (password && confirmPassword) {
            setPasswordsMatch(password === confirmPassword);
        }
    }, [password, confirmPassword]); // 비밀번호나 확인 비밀번호가 변경될 때마다 실행

    const handleRegister = async () => {
        const errors = { email: '', name: '', major: '', password: '', confirmPassword: '' };

        // 유효성 검사
        if (!email.includes('@')) errors.email = '유효한 이메일을 입력해주세요.';
        if (!name) errors.name = '이름을 입력해주세요.';
        if (!major) errors.major = '전공을 입력해주세요.';
        if (password.length < 6) errors.password = '비밀번호는 6자 이상이어야 합니다.';
        if (!passwordsMatch) errors.confirmPassword = '비밀번호가 일치하지 않습니다.';

        // 에러가 없으면 회원가입 처리
        if (Object.values(errors).every(error => error === '')) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
                    email,
                    name,
                    major,
                    password
                });

                if (response.status === 201) {
                    // 회원가입 성공 시 toast로 알림
                    toast({
                        title: '회원가입 성공',
                        description: '회원가입이 완료되었습니다. 로그인 해주세요.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });

                    // 로그인 페이지로 이동
                    navigate('/login');
                }
            } catch (error: any) {
                if (error.response && error.response.status === 400) {
                    // 중복 이메일 또는 이름에 대한 메시지 처리
                    const errorMessage = error.response.data; // 서버에서 오는 에러 메시지 (서버가 반환하는 데이터 구조에 따라 수정 필요)
                    if (errorMessage.includes('email')) {
                        toast({
                            title: '회원가입 실패',
                            description: '이메일이 중복되었습니다.',
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                        });
                    } else if (errorMessage.includes('name')) {
                        toast({
                            title: '회원가입 실패',
                            description: '이름이 중복되었습니다.',
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                        });
                    } else {
                        toast({
                            title: '회원가입 실패',
                            description: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                        });
                    }
                } else {
                    console.error(error);
                    toast({
                        title: '회원가입 실패',
                        description: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            }
        } else {
            // 에러가 있으면 에러 메시지 상태로 업데이트
            setFormErrors(errors);
        }
    };

    return (
        <Box maxW="400px" mx="auto" mt={8} mb= {8} p={4} borderWidth={1} borderRadius="md" boxShadow="lg">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
                회원가입
            </Text>

            {/* 이메일 및 비밀번호 입력 */}
            <Stack spacing={4}>
                {/* 이메일 입력 필드 */}
                <FormControl isInvalid={!!formErrors.email}>
                    <FormLabel>이메일</FormLabel>
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="md"
                        borderColor="gray.400"
                    />
                    {formErrors.email && <FormErrorMessage>{formErrors.email}</FormErrorMessage>}
                </FormControl>

                {/* 이름 입력 필드 */}
                <FormControl isInvalid={!!formErrors.name}>
                    <FormLabel>이름</FormLabel>
                    <Input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        size="md"
                        borderColor="gray.400"
                    />
                    {formErrors.name && <FormErrorMessage>{formErrors.name}</FormErrorMessage>}
                </FormControl>

                {/* 전공 입력 필드 */}
                <FormControl isInvalid={!!formErrors.major}>
                    <FormLabel>전공</FormLabel>
                    <Input
                        placeholder="Major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        size="md"
                        borderColor="gray.400"
                    />
                    {formErrors.major && <FormErrorMessage>{formErrors.major}</FormErrorMessage>}
                </FormControl>

                {/* 비밀번호 입력 필드 */}
                <FormControl isInvalid={!!formErrors.password}>
                    <FormLabel>비밀번호</FormLabel>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        size="md"
                        borderColor="gray.400"
                    />
                    {formErrors.password && <FormErrorMessage>{formErrors.password}</FormErrorMessage>}
                </FormControl>

                {/* 비밀번호 확인 필드 */}
                <FormControl isInvalid={!passwordsMatch || !!formErrors.confirmPassword}>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <Input
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        size="md"
                        borderColor="gray.400"
                    />
                    {/* 실시간 비밀번호 일치 검증 */}
                    {!passwordsMatch && <FormErrorMessage>비밀번호가 일치하지 않습니다.</FormErrorMessage>}
                    {formErrors.confirmPassword && <FormErrorMessage>{formErrors.confirmPassword}</FormErrorMessage>}
                </FormControl>

                {/* 회원가입 버튼 */}
                <Button colorScheme="green" size="md" width="full" onClick={handleRegister}>
                    만들기
                </Button>
            </Stack>
        </Box>
    );
};

export default RegisterPage;
