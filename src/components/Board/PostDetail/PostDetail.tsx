// PostDetail.tsx
import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Avatar, Image, Button, useToast } from '@chakra-ui/react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // useNavigate 훅 사용
import axios from 'axios';
import BoardSidebar from '../BoardSidebar';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { jwtDecode } from 'jwt-decode';  // 중괄호로 임포트

const PostDetail: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [postData, setPostData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [likesCount, setLikesCount] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false); // 좋아요 상태
    const toast = useToast();
    const location = useLocation();
    const [commentCount, setCommentCount] = useState<number>(0);
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [isOwner, setIsOwner] = useState<boolean>(false); // 작성자 여부

    // DecodedToken 인터페이스 선언
    interface DecodedToken {
        userId: string;  // JWT 토큰에서 가져올 사용자 ID
    }

    // JWT 디코드하여 사용자 ID 가져오기
    const getUserIdFromToken = (token: string | null) => {
        if (!token) return null;
        try {
            const decoded: DecodedToken = jwtDecode(token); // JWT 디코딩
            return decoded.userId; // 사용자 ID 추출
        } catch (error) {
            return null;
        }
    };
    const token = localStorage.getItem('accessToken');
    const currentUserId = getUserIdFromToken(token); // 현재 로그인한 사용자 ID 추출

    // 좋아요 상태 확인하기
    const fetchIsLiked = async (id: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}/isliked`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsLiked(response.data); // 서버에서 받은 좋아요 상태를 설정
        } catch (err) {
            toast({
                title: '좋아요 상태를 불러오는 데 실패했습니다.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    // 게시글 삭제
    const handleDelete = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast({
                title: '로그인이 필요합니다.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        // 삭제 확인 알림창
        const isConfirmed = window.confirm('정말로 게시글을 삭제하시겠습니까?');
        if (!isConfirmed) {
            return;  // 사용자가 취소하면 삭제 중단
        }

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({
                title: '게시글이 삭제되었습니다.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // 현재 경로의 상위 경로로 이동 (예: '/board/~~~'로 이동)
            const currentPath = location.pathname.split('/').slice(0, -2).join('/');
            navigate(currentPath); // 삭제 후 메인 페이지로 이동
        } catch (err) {
            toast({
                title: '게시글 삭제에 실패했습니다.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };


// 수정 버튼 클릭 시 수정 페이지로 이동하는 함수
    const handleEdit = () => {
        navigate(`${location.pathname}/edit`);  // 현재 경로에 /edit 추가하여 수정 페이지로 이동
    };

    // 좋아요 수 조회하기
    const fetchLikeCount = async (id: string) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}/likes`);
            setLikesCount(response.data); // 서버에서 받은 좋아요 수를 설정
        } catch (err) {
            toast({
                title: '좋아요 수를 불러오는 데 실패했습니다.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    // 좋아요 토글하기
    const handleLike = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast({
                title: '로그인이 필요합니다.',
                description: '좋아요를 누르기 위해서는 로그인이 필요합니다.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/posts/${postId}/like`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // 좋아요가 토글되면 상태 업데이트
            const message = response.data; // 서버에서 전송한 메시지 ("좋아요가 추가되었습니다." 또는 "좋아요가 취소되었습니다.")
            if (message === "좋아요가 추가되었습니다.") {
                setIsLiked(true); // 좋아요 상태로 설정
                setLikesCount((prevCount) => prevCount + 1); // 좋아요 수 증가
            } else {
                setIsLiked(false); // 좋아요 취소 상태로 설정
                setLikesCount((prevCount) => prevCount - 1); // 좋아요 수 감소
            }
        } catch (err) {
            toast({
                title: '좋아요 처리 중 오류가 발생했습니다.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    // 게시글 데이터 불러오기
    const fetchPostData = async (id: string) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`);
            const fetchedData = response.data;
            setPostData({
                ...fetchedData,
                images: fetchedData.images || [],
            });
            setLoading(false);

            // 게시글 작성자 ID와 현재 로그인된 사용자 ID 비교하여 작성자 여부 확인
            if (currentUserId && fetchedData.user.userId === currentUserId) {
                setIsOwner(true); // 작성자가 맞으면 isOwner를 true로 설정
            }

        } catch (err) {
            setError('게시글을 불러오는 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };

    // 댓글 수 불러오기
    const fetchCommentCount = async (id: string) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/post/${id}/count`);
            setCommentCount(response.data); // 서버에서 받은 댓글 수를 설정
        } catch (err) {
            toast({
                title: '댓글 수를 불러오는 데 실패했습니다.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        if (postId) {
            fetchPostData(postId);
            fetchCommentCount(postId);
            fetchIsLiked(postId); // 좋아요 상태 불러오기
            fetchLikeCount(postId); // 좋아요 수 불러오기
        }
    }, [postId]);


    // 댓글 갱신 핸들러
    const handleCommentSubmitSuccess = () => {
        fetchCommentCount(postId!);
    };

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;
    if (!postData) return <Text>No post found</Text>;

    return (
        <Flex p={6}>
            <BoardSidebar />
            <Box w="75%" mx="auto" p={6} borderWidth="1px" borderRadius="md" borderColor="green.500">
                {/* 게시글 데이터 렌더링 */}
                <Box borderBottom="1px solid #e2e8f0" pb={6} mb={6}>
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

                    {postData.images && postData.images.length > 0 ? (
                        <Flex direction="column" wrap="nowrap">  {/* 방향을 수직(column)으로 설정 */}
                            {postData.images
                                .sort((a: any, b: any) => a.imageId - b.imageId)  // imageId로 정렬
                                .map((image: any, index: number) => (
                                    <Image
                                        key={image.imageId}  // 고유한 imageId를 key로 사용
                                        src={`${process.env.REACT_APP_API_URL}${image.imageUrl}`}
                                        alt={`Post Image ${index}`}
                                        mb={4}  // 각 이미지 간의 간격 추가
                                        objectFit="cover"
                                        m={2}  // 이미지 사이에 마진 추가
                                    />
                                ))
                            }
                        </Flex>
                    ) : (
                        <Image
                            src="https://via.placeholder.com/600x400"
                            alt="Placeholder Image"
                            mb={4}
                        />
                    )}


                    <Text>{postData.content}</Text>

                    <Flex justifyContent="space-between" mb={6}>
                        <Flex alignItems="center">
                            <Button variant="ghost" size="sm">
                                댓글 {commentCount}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleLike}>
                                {isLiked ? '좋아요 취소' : '좋아요'} {likesCount}
                            </Button>
                        </Flex>
                        {isOwner && (
                            <Flex>
                                <Button colorScheme="blue" size="sm" mr={2} onClick={handleEdit}>
                                    수정
                                </Button>
                                <Button colorScheme="red" size="sm" onClick={handleDelete}>
                                    삭제
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                </Box>

                {/* 댓글 리스트와 댓글 작성 폼 */}
                <CommentList postId={postId!} />
            </Box>
        </Flex>
    );
};

export default PostDetail;
