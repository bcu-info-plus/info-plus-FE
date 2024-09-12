import React, { useState, useEffect } from 'react';
import { Box, Text, Avatar, Image, Flex, Input, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BoardSidebar from './BoardSidebar';

interface PostData {
    postId: number;
    boardType: string;
    user: {
        userId: number;
        name: string; // 작성자 이름
        major: string; // 작성자 학과
    };
    title: string;
    content: string;
    major: string;
    likesCount: number;
    commentsCount: number;
    createdAt: string;
    images: Array<{ imageUrl: string }>;
    comments: Array<{
        author: string;
        department: string;
        content: string;
        date: string;
    }>;
}

const PostDetail: React.FC = () => {
    const { postId } = useParams<{ postId: string }>(); // URL에서 postId를 가져옴
    const [postData, setPostData] = useState<PostData | null>(null); // 게시글 데이터를 상태로 관리
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // API 요청 함수
    const fetchPostData = async (id: string) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`);

            // 서버로부터 받은 데이터를 사용하여 상태 업데이트
            const postDataWithEmptyComments = {
                ...response.data,
                comments: [], // 프론트엔드에서 빈 댓글 데이터로 채워줌
            };
            setPostData(postDataWithEmptyComments);
            setLoading(false); // 로딩 상태 해제
        } catch (err) {
            setError('Failed to fetch post data.');
            setLoading(false); // 로딩 상태 해제
        }
    };

    // 컴포넌트가 렌더링될 때 postId로 API 요청
    useEffect(() => {
        if (postId) {
            fetchPostData(postId);
        }
    }, [postId]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!postData) {
        return <Text>No post found</Text>;
    }

    return (
        <Flex p={6}>
            {/* Left Sidebar Section */}
            <BoardSidebar />

            {/* Right Main Content Section (PostDetail) */}
            <Box w="75%" mx="auto" p={6} borderWidth="1px" borderRadius="md" borderColor="green.500">

                {/* 게시글 내용 영역 */}
                <Box borderBottom="1px solid #e2e8f0" pb={6} mb={6}>
                    {/* 게시글 정보 */}
                    <Flex alignItems="center" mb={4}>
                        <Avatar size="md" name={postData.user.name} />
                        <Box ml={3}>
                            <Text fontWeight="bold">{postData.user.name}</Text>
                            <Text fontSize="sm" color="gray.500">
                                {postData.user.major} | {postData.createdAt}
                            </Text>
                        </Box>
                    </Flex>

                    <Text mb={4} fontWeight="bold" fontSize="lg">
                        {postData.title}
                    </Text>

                    <Image src={postData.images.length > 0 ? postData.images[0].imageUrl : 'https://via.placeholder.com/600x400'} alt="Post Image" mb={4} />

                    <Text>{postData.content}</Text>

                    <Flex justifyContent="space-between" mb={6}>
                        <Flex alignItems="center">
                            <Button variant="ghost" size="sm">
                                댓글 {postData.commentsCount}
                            </Button>
                            <Button variant="ghost" size="sm">
                                좋아요 {postData.likesCount}
                            </Button>
                        </Flex>
                    </Flex>
                </Box>

                {/* 댓글 영역 */}
                <Box borderWidth="1px" borderRadius="md" borderColor="gray.300" p={4}>
                    {/* 댓글 리스트 */}
                    <Box mb={6}>
                        {postData.comments.length === 0 ? (
                            <Text color="gray.500">댓글이 없습니다.</Text>
                        ) : (
                            postData.comments.map((comment, index) => (
                                <Box key={index} p={4} borderBottom="1px solid #e2e8f0">
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Text fontWeight="bold">{comment.author} {comment.department}</Text>
                                            <Text mb={2}>{comment.content}</Text>
                                            <Text fontSize="xs" color="gray.500">
                                                {comment.date}
                                            </Text>
                                        </Box>
                                        <Button size="xs" variant="ghost">
                                            답글
                                        </Button>
                                    </Flex>
                                </Box>
                            ))
                        )}
                    </Box>

                    {/* 댓글 작성 */}
                    <Flex as="form" borderWidth="1px" borderRadius="md" p={4} alignItems="center">
                        <Input placeholder="댓글을 작성하세요" mr={2} />
                        <Button colorScheme="green">등록</Button>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
};

export default PostDetail;
