import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Input, Checkbox, Flex, Text, Link, Stack, Divider, Image } from '@chakra-ui/react';

const LoginPage: React.FC = () => {
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
                    <Input placeholder="Email" size="md" borderColor="gray.400" />
                    <Input type="password" placeholder="Password" size="md" borderColor="gray.400" />
                    <Button colorScheme="green" size="md" width="full">
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

                {/* 이미 계정이 있는 경우 로그인 링크 */}
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
