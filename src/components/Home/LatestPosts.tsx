import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Flex, Link } from '@chakra-ui/react';
import PostCard from './PostCard'; // Import the PostCard component
import axios from 'axios';

interface User {
    name: string; // User 객체 안의 name 속성
}

interface Post {
    id: number;
    title: string;
    user: User;   // user는 객체로 정의
    major: string;
    boardType: string;
    content: string;
}

const LatestPosts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]); // 게시글 데이터 상태 관리

    useEffect(() => {
        // 최신 게시글 API 호출
        axios.get(`${process.env.REACT_APP_API_URL}/posts`)
            .then(response => {
                setPosts(response.data); // API로부터 데이터를 받아 상태에 저장
            })
            .catch(error => {
                console.error('Error fetching latest posts:', error);
            });
    }, []);

    return (
        <Box p={6}>
            {/* Title and "더보기" link */}
            <Flex justify="space-between" align="center" mb={4}>
                <Box>
                    <Heading size="md" mb={1}>
                        최신 게시물
                    </Heading>
                    <Box h="2px" w="90px" bg="green.500" mt="-2px"></Box> {/* Small green underline */}
                </Box>
                <Link href="#" fontSize="sm" color="gray.600">
                    + 더보기
                </Link>
            </Flex>

            {/* Post grid */}
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
                {posts.length === 0 ? (
                    <Box>게시글이 없습니다.</Box>
                ) : (
                    posts
                        .slice() // 원본 배열을 복사하여 변형
                        .reverse() // 최신 게시물이 앞에 오도록 배열을 역순으로 정렬
                        .slice(0, 4) // 그 중 상위 4개의 게시글만 선택
                        .map((post) => ( // 최신 4개의 게시글만 표시
                            <PostCard
                                key={post.id}
                                title={post.title}
                                user={post.user.name}
                                major={post.major}
                                boardType={post.boardType}
                                content={post.content}
                            />
                        ))
                )}
            </SimpleGrid>
        </Box>
    );
};

export default LatestPosts;
