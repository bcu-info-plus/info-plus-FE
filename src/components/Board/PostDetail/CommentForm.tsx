import React, { useState } from 'react';
import { Box, Button, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';

interface CommentFormProps {
    postId: string;
    parentId?: number; // 대댓글의 경우 parentId가 필요할 수 있음
    onSubmitSuccess: () => void; // 댓글 작성 성공 시 호출되는 함수
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, parentId, onSubmitSuccess }) => {
    const [content, setContent] = useState('');
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (content.trim() === '') {
            toast({
                title: '댓글 내용을 입력해주세요.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/comments/post/${postId}`,
                { content, parentId }, // parentId는 대댓글의 경우만 포함
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setContent(''); // 입력 필드 초기화

            // 댓글 작성 성공 시 호출
            onSubmitSuccess(); // CommentList의 fetchComments를 실행

            toast({
                title: '댓글이 등록되었습니다.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: '댓글 등록 중 오류가 발생했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <Input
                placeholder="댓글을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                mb={2}
            />
            <Button type="submit" colorScheme="green">
                댓글 등록
            </Button>
        </Box>
    );
};

export default CommentForm;
