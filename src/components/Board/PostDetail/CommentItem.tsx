import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, Input, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';

interface Comment {
    commentId: number;
    userId : number;
    authorName: string;
    authorMajor: string;
    content: string;
    createdAt: string;
    parentId?: number; // 부모 댓글 ID (최상위 댓글이면 undefined)
}

interface CommentItemProps {
    comment: Comment;
    postId: string;
    children?: React.ReactNode;
    onReplySubmit: () => void;
    depth: number; // 댓글의 깊이를 나타내는 값
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, postId, children, onReplySubmit, depth }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content); // 수정할 내용 상태
    const [isOwner, setIsOwner] = useState(false); // 본인 여부 확인
    const toast = useToast();

    // 로그인한 사용자의 ID를 가져와서 댓글 작성자와 비교
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const user = response.data;
                    if (user.userId === comment.userId) {
                        setIsOwner(true); // 본인이 작성한 댓글일 경우
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, [comment.authorName]);

    const handleReplySubmit = async () => {
        if (replyContent.trim() === '') {
            toast({
                title: '답글 내용을 입력하세요.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const token = localStorage.getItem('accessToken'); // JWT 토큰 가져오기

            await axios.post(
                `${process.env.REACT_APP_API_URL}/comments/post/${postId}`,
                {
                    content: replyContent,
                    parentId: comment.commentId, // 부모 댓글 ID를 함께 전송
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
                    },
                }
            );
            setReplyContent(''); // 입력 필드 초기화
            setShowReplyForm(false); // 답글 폼 숨기기
            onReplySubmit(); // 답글 작성 후 댓글 목록 새로고침
            toast({
                title: '답글이 등록되었습니다.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            toast({
                title: '답글 등록 중 오류 발생',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleDeleteComment = async () => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

        if (!confirmDelete) {
            return; // 사용자가 취소를 누르면 삭제를 취소
        }

        try {
            const token = localStorage.getItem('accessToken');
            await axios.delete(`${process.env.REACT_APP_API_URL}/comments/${comment.commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // JWT 토큰으로 인증
                },
            });
            toast({
                title: '댓글이 삭제되었습니다.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onReplySubmit(); // 댓글 삭제 후 목록 갱신
        } catch (err) {
            toast({
                title: '댓글 삭제 중 오류 발생',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleEditSubmit = async () => {
        if (editContent.trim() === '') {
            toast({
                title: '댓글 내용을 입력하세요.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/comments/${comment.commentId}`,
                { content: editContent },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT 토큰
                    },
                }
            );

            const updatedComment = response.data; // 서버로부터 반환된 수정된 댓글 정보

            // 수정된 댓글로 상태 업데이트

            setIsEditing(false); // 수정 완료 후 수정 모드 해제
            onReplySubmit(); // 수정 후 댓글 목록 새로고침

            toast({
                title: '댓글이 수정되었습니다.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            toast({
                title: '댓글 수정 중 오류 발생',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };


    return (
        <Box
            mb={4}
            pl={4 * depth} // 깊이에 따른 들여쓰기
            borderLeft={depth > 0 ? '2px solid #CBD5E0' : 'none'} // 깊이에 따른 선 색상
            borderRadius='md'
            backgroundColor={depth === 0 ? 'gray.50' : 'gray.100'} // 최상위 댓글과 답글 배경색 차별화
            p={4}
            boxShadow='sm'
        >
            <Flex justifyContent='space-between' alignItems='center'>
                <Box>
                    <Text fontWeight='bold' fontSize='lg' color='gray.800' display='inline'>
                        {comment.authorName}
                    </Text>
                    <Text as='span' fontSize='sm' color='gray.500' ml={2} display='inline'>
                        {comment.authorMajor}
                    </Text>
                    {isEditing ? (
                        <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            size='sm'
                            mb={2}
                        />
                    ) : (
                        <Text mt={2} color='gray.700' fontSize='md'>
                            {comment.content}
                        </Text>
                    )}
                    <Text fontSize='xs' color='gray.500' mt={1}>
                        {new Date(comment.createdAt).toLocaleString()}
                    </Text>
                </Box>

                <Flex>
                    <Button size='xs' variant='outline' colorScheme='green' onClick={() => setShowReplyForm(!showReplyForm)}>
                        답글
                    </Button>

                    {isOwner && (
                        <>
                            {isEditing ? (
                                <>
                                    <Button size='xs' colorScheme='blue' onClick={handleEditSubmit} ml={2}>
                                        저장
                                    </Button>
                                    <Button size='xs' variant='outline' onClick={() => setIsEditing(false)} ml={2}>
                                        취소
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button size='xs' colorScheme='blue' onClick={() => setIsEditing(true)} ml={2}>
                                        수정
                                    </Button>
                                    <Button size='xs' colorScheme='red' onClick={handleDeleteComment} ml={2}>
                                        삭제
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </Flex>
            </Flex>

            {/* 답글 입력 폼 */}
            {showReplyForm && (
                <Box mt={4}>
                    <Input
                        placeholder='답글을 작성하세요'
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        size='sm'
                        mb={2}
                        focusBorderColor='blue.500'
                        backgroundColor='white'
                        borderRadius='md'
                        shadow='xs'
                    />
                    <Button colorScheme='green' size='sm' onClick={handleReplySubmit}>
                        등록
                    </Button>
                </Box>
            )}

            {/* 자식 댓글(답글) */}
            {children}
        </Box>
    );
};

export default CommentItem;
