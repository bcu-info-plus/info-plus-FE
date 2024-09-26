import React, { useEffect, useState } from 'react';
import { Box, Button, Input, List, ListItem, Text, Flex } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {FaHeart} from "react-icons/fa";

interface Post {
    postId: number;
    title: string;
    likesCount: number;
}

const Sidebar: React.FC = () => {
    const [popularPosts, setPopularPosts] = useState<Post[]>([]);
    const location = useLocation(); // 현재 경로 가져오기
    const navigate = useNavigate();  // 경로 이동을 위한 useNavigate 사용

    const handlePostClick = (postId: number) => {
        const currentPath = location.pathname;
        const newPath = `${currentPath}/post/${postId}`.replace(/\/{2,}/g, '/'); // 중복된 슬래시 방지
        navigate(newPath); // postId를 포함한 경로로 이동
    };

    // 게시글 작성 경로를 미리 계산하여 상태에 저장
    const currentPath = location.pathname;
    const postWritePath = currentPath
        .replace(/\/\d+$/, '') // 마지막 숫자를 제거한 후 남은 경로
        .replace(/\/post$/, '') // "/post" 제거
        .concat('/write')       // 경로에 "/write" 추가
        .replace(/\/{2,}/g, '/'); // 중복된 슬래시를 하나로 변환

    useEffect(() => {
        // 카테고리 경로를 계산
        const pathSegments = currentPath.split('/'); // '/'로 경로를 분리
        const lastSegment = pathSegments.pop(); // 마지막 경로 요소 추출 (예: '2' 또는 'questions')

        // 마지막 요소가 숫자 (예: post ID)인 경우, 두 번째 마지막 요소를 건너뛰고 세 번째 마지막 요소를 categoryPath로 설정
        const categoryPath = isNaN(Number(lastSegment)) ? lastSegment : pathSegments[pathSegments.length - 2];



        const fetchPopularPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
                    params: {
                        boardType: categoryPath
                    },
                });

                // likesCount 기준으로 내림차순 정렬 후 상위 5개만 선택
                const top5Posts = response.data
                    .sort((a: Post, b: Post) => b.likesCount - a.likesCount)
                    .slice(0, 5);

                setPopularPosts(top5Posts); // 상태에 저장
            } catch (error) {
                console.error('Error fetching popular posts:', error);
            }
        };

        fetchPopularPosts();
    }, [currentPath]); // currentPath가 변경될 때마다 데이터 갱신

    const handlePostButtonClick = () => {
        navigate(postWritePath); // 지정된 경로로 이동
    };

    return (
        <Box w="25%" p={4} borderWidth="1px" borderRadius="md" mr={4}>
            {/* 게시하기 Button aligned to the left and smaller */}
            <Button colorScheme="green" size="md" w="full" mb={4} onClick={handlePostButtonClick}>
                게시하기
            </Button>

            {/* 검색어 입력 */}
            <Input placeholder="검색어를 입력해 주세요..." mb={4} />

            {/* 지금 주목받는 게시글 */}
            <Box borderWidth="1px" borderRadius="md" p={3} borderColor="green.500">
                <Text mb={2} fontWeight="bold">
                    지금 주목받는 게시글!
                </Text>
                <List spacing={2}>
                    {popularPosts.length === 0 ? (
                        <Text>인기 게시글이 없습니다.</Text>
                    ) : (
                        popularPosts.map((post) => (
                            <ListItem key={post.postId} fontSize="sm" color="gray.700">
                                <Flex align="center"
                                      cursor="pointer"
                                      _hover={{ bg: 'gray.100' }}
                                      onClick={() => handlePostClick(post.postId)}>
                                    <Text>[{post.title}]</Text>
                                    <Text ml={2}>{post.likesCount}</Text>
                                    <FaHeart color="gray.500" style={{ marginLeft: '4px' }} />
                                </Flex>
                            </ListItem>
                        ))
                    )}
                </List>
            </Box>
        </Box>
    );
};

export default Sidebar;
