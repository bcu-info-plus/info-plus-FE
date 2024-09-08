import React from 'react';
import { Box, Heading, Stack, Text, Link, Flex } from '@chakra-ui/react';

const PostsSection: React.FC = () => (
    <Box p={6}>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={6} justify="space-between">
            {/* Question Board */}
            <Box w={{ base: 'full', md: '30%' }} borderWidth="1px" borderRadius="md" boxShadow="md" p={4}>
                <Flex justify="space-between" alignItems="center" mb={4}>
                    <Heading size="md" borderBottom="2px solid green">질문 게시판</Heading>
                    <Link fontSize="sm" color="gray.500" href="#">
                        + 더보기
                    </Link>
                </Flex>
                <Stack spacing={3}>
                    <Text>DB설계 과목에서 나온 과제인데 문제에 대해 이해하지 못하겠어요 이거 어떻게......</Text>
                    {[...Array(4)].map((_, index) => (
                        <Text key={index} color="gray.500">
                            작성 내용 일부 출력 작성 내용 일부 출력 작성 내용 일부 출력
                        </Text>
                    ))}
                </Stack>
            </Box>

            {/* Free Board */}
            <Box w={{ base: 'full', md: '30%' }} borderWidth="1px" borderRadius="md" boxShadow="md" p={4}>
                <Flex justify="space-between" alignItems="center" mb={4}>
                    <Heading size="md" borderBottom="2px solid green">자유 게시판</Heading>
                    <Link fontSize="sm" color="gray.500" href="#">
                        + 더보기
                    </Link>
                </Flex>
                <Stack spacing={3}>
                    <Text>우리 학교 공학관 건물 에어컨 좀 나왔으면 좋겠는데 에어컨이 안나옴 진짜 기분 안좋다</Text>
                    {[...Array(4)].map((_, index) => (
                        <Text key={index} color="gray.500">
                            작성 내용 일부 출력 작성 내용 일부 출력 작성 내용 일부 출력
                        </Text>
                    ))}
                </Stack>
            </Box>

            {/* Tips & Sharing Board */}
            <Box w={{ base: 'full', md: '30%' }} borderWidth="1px" borderRadius="md" boxShadow="md" p={4}>
                <Flex justify="space-between" alignItems="center" mb={4}>
                    <Heading size="md" borderBottom="2px solid green">Tip&해설 공유</Heading>
                    <Link fontSize="sm" color="gray.500" href="#">
                        + 더보기
                    </Link>
                </Flex>
                <Stack spacing={3}>
                    <Text>자바 프로그래밍 3판 연습문제 해설(실습 문제)</Text>
                    {[...Array(4)].map((_, index) => (
                        <Text key={index} color="gray.500">
                            게시글 제목
                        </Text>
                    ))}
                </Stack>
            </Box>
        </Stack>
    </Box>
);

export default PostsSection;
