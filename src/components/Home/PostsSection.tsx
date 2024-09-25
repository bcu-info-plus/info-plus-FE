import React, { useEffect, useState } from 'react';
import { Box, Heading, Stack, Text, Link, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const PostsSection: React.FC = () => {
    const [questionPosts, setQuestionPosts] = useState([]);
    const [freePosts, setFreePosts] = useState([]);
    const [tipsPosts, setTipsPosts] = useState([]);

    useEffect(() => {
        // 질문 게시판의 게시글 불러오기
        axios.get(`${process.env.REACT_APP_API_URL}/posts`, { params: { boardType: 'questions' } })
            .then(response => {
                setQuestionPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching question posts:', error);
            });

        // 자유 게시판의 게시글 불러오기
        axios.get(`${process.env.REACT_APP_API_URL}/posts`, { params: { boardType: 'free' } })
            .then(response => {
                setFreePosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching free posts:', error);
            });

        // Tip&해설 공유 게시판의 게시글 불러오기
        axios.get(`${process.env.REACT_APP_API_URL}/posts`, { params: { boardType: 'tips' } })
            .then(response => {
                setTipsPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching tips posts:', error);
            });
    }, []);

    return (
        <Box p={6}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={6} justify="space-between">
                {/* Question Board */}
                <Box w={{ base: 'full', md: '30%' }} borderWidth="1px" borderRadius="md" boxShadow="md" p={4}>
                    <Flex justify="space-between" alignItems="center" mb={4}>
                        <Heading size="md" borderBottom="2px solid green">질문 게시판</Heading>
                        <Link as={RouterLink} to="/board/questions" fontSize="sm" color="gray.500">
                            + 더보기
                        </Link>
                    </Flex>
                    <Stack spacing={3}>
                        {questionPosts.length === 0 ? (
                            <Text>게시글이 없습니다.</Text>
                        ) : (
                            // 최신 게시글 5개만 가져오기
                            questionPosts
                                .slice() // 원본 배열을 복사하여 변형
                                .reverse() // 배열을 역순으로 정렬 (최신 게시글이 앞으로)
                                .slice(0, 5) // 그 중에서 상위 5개만 선택
                                .map((post: any, index: number) => (
                                    <Text key={index} color="gray.500">
                                        {post.title}
                                    </Text>
                                ))
                        )}
                    </Stack>
                </Box>

                {/* Free Board */}
                <Box w={{ base: 'full', md: '30%' }} borderWidth="1px" borderRadius="md" boxShadow="md" p={4}>
                    <Flex justify="space-between" alignItems="center" mb={4}>
                        <Heading size="md" borderBottom="2px solid green">자유 게시판</Heading>
                        <Link as={RouterLink} to="/board/free" fontSize="sm" color="gray.500">
                            + 더보기
                        </Link>
                    </Flex>
                    <Stack spacing={3}>
                        {freePosts.length === 0 ? (
                            <Text>게시글이 없습니다.</Text>
                        ) : (
                            // 최신 게시글 5개만 가져오기
                            freePosts
                                .slice() // 원본 배열을 복사하여 변형
                                .reverse() // 배열을 역순으로 정렬 (최신 게시글이 앞으로)
                                .slice(0, 5) // 그 중에서 상위 5개만 선택
                                .map((post: any, index: number) => (
                                    <Text key={index} color="gray.500">
                                        {post.title}
                                    </Text>
                                ))
                        )}
                    </Stack>
                </Box>

                {/* Tips & Sharing Board */}
                <Box w={{ base: 'full', md: '30%' }} borderWidth="1px" borderRadius="md" boxShadow="md" p={4}>
                    <Flex justify="space-between" alignItems="center" mb={4}>
                        <Heading size="md" borderBottom="2px solid green">Tip&해설 공유</Heading>
                        <Link as={RouterLink} to="/board/tips" fontSize="sm" color="gray.500">
                            + 더보기
                        </Link>
                    </Flex>
                    <Stack spacing={3}>
                        {tipsPosts.length === 0 ? (
                            <Text>게시글이 없습니다.</Text>
                        ) : (
                            // 최신 게시글 5개만 가져오기
                            tipsPosts
                                .slice() // 원본 배열을 복사하여 변형
                                .reverse() // 배열을 역순으로 정렬 (최신 게시글이 앞으로)
                                .slice(0, 5) // 그 중에서 상위 5개만 선택
                                .map((post: any, index: number) => (
                                    <Text key={index} color="gray.500">
                                        {post.title}
                                    </Text>
                                ))
                        )}
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default PostsSection;
