import React, { useState, useEffect } from 'react';
import { Box, Flex, Select, Text, Spinner, useToast } from '@chakra-ui/react';
import { FaHeart, FaCommentDots } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface Post {
    postId: number;
    title: string;
    user: {
        userId: number;
        name: string; // 작성자 이름
        major: string; // 작성자 학과
    };
    localDateTime: string;
    likesCount: number;
}

const PostList: React.FC<{ category: string }> = ({ category }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
    const [posts, setPosts] = useState<Post[]>([]); // 게시글 목록을 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 관리
    const [commentCounts, setCommentCounts] = useState<{ [postId: number]: number }>({}); // 각 게시글의 댓글 수 상태

    // API에서 게시글 목록을 가져오는 함수
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if (!process.env.REACT_APP_API_URL) {
                    throw new Error("API URL is missing from environment variables!");
                }

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
                    params: { boardType: category } // boardType을 쿼리 파라미터로 보냄
                });

                setPosts(response.data);
                setError(null);
                // 게시글 목록이 있으면 각각의 댓글 수를 불러옴
                response.data.forEach((post: Post) => {
                    fetchCommentCount(post.postId); // 각 게시글의 댓글 수를 가져옴
                });
            } catch (error: any) {
                console.error('Error fetching posts:', error.message || error);
                setError('게시글을 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchPosts();
        }
    }, [category]);

    // 댓글 수를 불러오는 함수 (각 게시글에 대해 호출)
    const fetchCommentCount = async (postId: number) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/post/${postId}/count`);
            setCommentCounts((prevCounts) => ({
                ...prevCounts,
                [postId]: response.data, // postId에 해당하는 댓글 수를 저장
            }));
        } catch (err) {
            toast({
                title: "댓글 수를 불러오는 데 실패했습니다.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handlePostClick = (postId: number) => {
        const currentPath = location.pathname;
        const newPath = `${currentPath}/post/${postId}`.replace(/\/{2,}/g, '/'); // 중복된 슬래시 방지
        navigate(newPath); // postId를 포함한 경로로 이동
    };

    if (loading) {
        return <Spinner size="xl" />;
    }

    if (error) {
        return <Text color="red.500" textAlign="center">{error}</Text>;
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
                        onClick={() => handlePostClick(post.postId)}
                    >
                        <Box flex="1">
                            <Text fontSize="md" fontWeight="bold" isTruncated>{post.title}</Text>

                            {/* name과 major를 한 줄로 배치 */}
                            <Flex fontSize="xs" color="gray.500">
                                <Text>{post.user.name}</Text>
                                <Text mx={2}>|</Text> {/* 이름과 학과 사이에 구분자 또는 여백을 추가 */}
                                <Text>{post.user.major}</Text>
                            </Flex>
                        </Box>

                        <Box w="120px" textAlign="right">
                            <Text fontSize="xs" color="gray.500">
                                {new Date(post.localDateTime).toLocaleDateString()}
                            </Text>
                            <Flex justify="flex-end" align="center" mt={2}>
                                <Text fontSize="xs" mr={2}>
                                    {commentCounts[post.postId] ?? 0} {/* 댓글 수 표시 */}
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
