import React, { useState, useEffect } from 'react';
import { Box, Flex, Select, Text, Spinner } from '@chakra-ui/react';
import { FaHeart, FaCommentDots } from 'react-icons/fa';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

interface Post {
    postId: number;
    title: string;
    department: string;
    localDateTime: string;
    commentsCount: number;
    likesCount: number;
}
const PostList: React.FC<{ category: string }> = ({ category }) => {
    useEffect(() => {
        console.log('Category from props:', category); // props로 받은 category 값 확인
    }, [category]);

    const navigate = useNavigate();
    const location = useLocation();

    const [posts, setPosts] = useState<Post[]>([]); // 게시글 목록을 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 관리

    useEffect(() => {
        const fetchPosts = async () => {
            console.log('Fetching posts...'); // 디버깅 로그

            try {
                if (!process.env.REACT_APP_API_URL) {
                    throw new Error("API URL is missing from environment variables!");
                }

                console.log('Category:', category); // 현재 카테고리 로그
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
                    params: { boardType: category } // API 요청 시 boardType을 쿼리 파라미터로 보냄
                });

                console.log('API Response:', response.data); // API 응답 로그

                if (response.data.length === 0) {
                    // 게시글이 없으면 "내용 없음" 상태 설정
                    setError('게시글이 없습니다.');
                    console.log('No posts available.'); // 디버깅 로그
                } else {
                    // 게시글이 있으면 데이터 설정
                    setPosts(response.data);
                    setError(null); // 에러 상태 초기화
                }
            } catch (error: any) {
                console.error('Error fetching posts:', error.message || error);
                setError('게시글을 불러오는 중 오류가 발생했습니다.');
            } finally {
                console.log('Setting loading to false');
                setLoading(false); // 로딩 상태 종료
            }
        };

        if (category) {
            console.log('Category changed, fetching new posts...'); // 카테고리 변경 시 로그
            fetchPosts(); // 카테고리가 변경될 때마다 게시글을 다시 불러옴
        }
    }, [category]); // category가 변경될 때마다 useEffect 실행

    const handlePostClick = (postId: number) => {
        const currentPath = location.pathname;
        const newPath = `${currentPath}/post/${postId}`.replace(/\/{2,}/g, '/'); // 중복된 슬래시 방지
        console.log('Navigating to:', newPath); // 경로 이동 로그
        navigate(newPath); // postId를 포함한 경로로 이동
    };

    if (loading) {
        console.log('Loading is true, displaying spinner...'); // 로딩 상태 로그
        return <Spinner size="xl" />; // 로딩 중일 때 스피너 표시
    }

    if (error) {
        console.log('Error occurred:', error); // 에러 상태 로그
        return <Text color="red.500" textAlign="center">{error}</Text>; // 에러 또는 "내용 없음" 메시지 출력
    }

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                    최신순
                </Text>
                <Select w="100px" size="sm">
                    <option value="latest">최신순</option>
                    <option value="popular">인기순</option>
                </Select>
            </Flex>

            <Box borderWidth="1px" borderRadius="md" borderColor="green.500">
                {posts.map((post) => (
                    <Flex
                        key={post.postId}
                        borderBottom="1px solid gray"
                        p={4}
                        alignItems="center"
                        cursor="pointer"
                        _hover={{ bg: 'gray.100' }}
                        onClick={() => handlePostClick(post.postId)} // 게시글 클릭 시 이동
                    >
                        <Box flex="1">
                            <Text fontSize="md" fontWeight="bold" isTruncated>
                                {post.title}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                                {post.department}
                            </Text>
                        </Box>

                        <Box w="120px" textAlign="right">
                            <Text fontSize="xs" color="gray.500">
                                {new Date(post.localDateTime).toLocaleDateString()}
                            </Text>
                            <Flex justify="flex-end" align="center" mt={2}>
                                <Text fontSize="xs" mr={2}>
                                    {post.commentsCount}
                                </Text>
                                <FaCommentDots color="gray.500" />
                                <Text fontSize="xs" mx={2}>
                                    {post.likesCount}
                                </Text>
                                <FaHeart color="gray.500" />
                            </Flex>
                        </Box>
                    </Flex>
                ))}
            </Box>
        </Box>
    );
};

export default PostList;
