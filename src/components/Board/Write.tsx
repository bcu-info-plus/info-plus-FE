import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, Textarea, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';

const Write: React.FC = () => {
    const { category } = useParams<{ category: string }>(); // URL의 카테고리 파라미터를 가져옴
    const [content, setContent] = useState(''); // 게시글 내용 상태
    const [title, setTitle] = useState(''); // 게시글 제목 상태
    const [userId, setUserId] = useState<number | null>(null); // 사용자 ID 상태
    const toast = useToast(); // 알림 메시지 표시용
    const navigate = useNavigate(); // 게시글 작성 후 리다이렉트용

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 JWT 토큰을 가져옴

            if (token) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더로 전송
                        }
                    });

                    // 서버로부터 사용자 정보를 받아와 userId 설정
                    const user = response.data;
                    setUserId(user.userId); // 사용자 ID를 상태에 저장
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

        fetchUserData(); // 컴포넌트가 마운트될 때 사용자 정보를 불러옴
    }, [toast]);

    const handlePostSubmit = async () => {
        if (!title || !content || !userId) {
            toast({
                title: '작성 실패',
                description: '제목, 내용, 그리고 사용자 정보가 필요합니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts`, {
                title,
                content,
                boardType: category, // 카테고리 정보를 게시글 타입으로 보냄
                userId: userId, // 사용자 ID만 숫자로 전송
            });

            if (response.status === 200) {
                toast({
                    title: '게시글 작성 성공',
                    description: '게시글이 성공적으로 작성되었습니다.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                // 작성 후 게시판 목록으로 리다이렉트
                navigate(`/board/${category}`);
            }
        } catch (error) {
            console.error(error);
            toast({
                title: '게시글 작성 실패',
                description: '게시글 작성 중 오류가 발생했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={8} maxW="800px" mx="auto">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {category === 'question' ? '질문 게시글 작성' : category === 'announcement' ? '공지사항 작성' : '게시글 작성'}
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

            {/* 게시글 작성 버튼 */}
            <Button
                colorScheme="green"
                onClick={handlePostSubmit}
                isDisabled={!title || !content || !userId} // 제목, 내용, userId가 없을 경우 비활성화
            >
                작성 완료
            </Button>
        </Box>
    );
};

export default Write;
