import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, Textarea, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';

const EditPost: React.FC = () => {
    const { id, category } = useParams<{ id: string; category: string }>(); // 게시글 ID와 카테고리 파라미터
    const [content, setContent] = useState(''); // 게시글 내용 상태
    const [title, setTitle] = useState(''); // 게시글 제목 상태
    const [userId, setUserId] = useState<number | null>(null); // 사용자 ID 상태
    const toast = useToast(); // 알림 메시지 표시용
    const navigate = useNavigate(); // 게시글 수정 후 리다이렉트용

    // 기존 게시글과 사용자 정보를 불러오는 useEffect
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                // 게시글 데이터를 불러와서 상태에 저장
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`);
                const post = response.data;
                setTitle(post.title); // 기존 제목
                setContent(post.content); // 기존 내용
                setUserId(post.userId); // 작성자 ID
            } catch (error) {
                console.error('Error fetching post data:', error);
                toast({
                    title: '게시글 불러오기 실패',
                    description: '게시글 정보를 불러오는 중 오류가 발생했습니다.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        // 사용자 정보를 불러오는 함수
        const fetchUserData = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const user = response.data;
                    setUserId(user.userId); // 사용자 ID 설정
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    toast({
                        title: '사용자 정보 불러오기 실패',
                        description: '로그인이 필요합니다.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            }
        };

        fetchPostData(); // 기존 게시글 정보 불러오기
        fetchUserData(); // 사용자 정보 불러오기
    }, [id, toast]);

    // 게시글 수정 처리
    const handleEditSubmit = async () => {
        if (!title || !content || !userId) {
            toast({
                title: '수정 실패',
                description: '제목, 내용, 그리고 사용자 정보가 필요합니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const token = localStorage.getItem('accessToken'); // JWT 토큰
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
                title,
                content,
                boardType: category, // 수정된 카테고리 값
                userId, // 작성자 ID
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // 토큰 전송
                },
            });

            if (response.status === 200) {
                toast({
                    title: '게시글 수정 성공',
                    description: '게시글이 성공적으로 수정되었습니다.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                // 수정 후 게시글로 이동
                navigate(`/board/${category}/post/${id}`);
            }
        } catch (error) {
            console.error(error);
            toast({
                title: '게시글 수정 실패',
                description: '게시글 수정 중 오류가 발생했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={8} maxW="800px" mx="auto">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                게시글 수정
            </Text>

            {/* 제목 입력 */}
            <Textarea
                placeholder="제목을 입력하세요..."
                mb={4}
                value={title}
                onChange={(e) => setTitle(e.target.value)} // 제목 상태 업데이트
            />

            {/* 게시글 내용 입력 */}
            <Textarea
                placeholder="게시글 내용을 입력하세요..."
                mb={4}
                value={content}
                onChange={(e) => setContent(e.target.value)} // 내용 상태 업데이트
            />

            {/* 게시글 수정 버튼 */}
            <Button
                colorScheme="blue"
                onClick={handleEditSubmit}
                isDisabled={!title || !content || !userId} // 제목, 내용, userId가 없을 경우 비활성화
            >
                수정 완료
            </Button>
        </Box>
    );
};

export default EditPost;
