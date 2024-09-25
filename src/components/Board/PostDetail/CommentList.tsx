import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, useToast, Input } from '@chakra-ui/react';
import axios from 'axios';
import CommentForm from './CommentForm'; // CommentForm 추가

interface Comment {
    commentId: number;
    authorName: string;
    authorMajor: string;
    content: string;
    createdAt: string;
    parentId?: number; // 부모 댓글 ID (최상위 댓글이면 undefined)
    replies?: Comment[]; // 답글 리스트
}

interface CommentListProps {
    postId: string;
    onFetchComments?: () => void; // 외부에서 호출할 수 있는 댓글 갱신 함수
}

const CommentList: React.FC<CommentListProps> = ({ postId, onFetchComments }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const toast = useToast();

    // 댓글 불러오기 함수
    const fetchComments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/post/${postId}`);
            setComments(response.data);
        } catch (err) {
            toast({
                title: "댓글을 불러오는 데 실패했습니다.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        fetchComments(); // 초기 로드 시 댓글 목록을 불러옴
        if (onFetchComments) {
            onFetchComments();
        }
    }, [postId, onFetchComments]);

    // 댓글 계층 깊이 계산 함수
    const getDepth = (comment: Comment, depth = 0): number => {
        if (comment.parentId) {
            const parentComment = comments.find(c => c.commentId === comment.parentId);
            return parentComment ? getDepth(parentComment, depth + 1) : depth;
        }
        return depth;
    };

    // 계층형으로 댓글을 렌더링하는 재귀 함수
    const renderComments = (commentList: Comment[], parentId: number | null = null) => {
        return commentList
            .filter((comment) => comment.parentId === parentId) // 부모 ID가 맞는 댓글만 필터링
            .map((comment) => (
                <CommentItem
                    key={comment.commentId}
                    comment={comment}
                    postId={postId}
                    depth={getDepth(comment)} // 깊이 계산하여 전달
                    onReplySubmit={fetchComments} // 답글 작성 후 댓글 목록 새로고침
                >
                    {renderComments(commentList, comment.commentId)} {/* 답글 렌더링 */}
                </CommentItem>
            ));
    };

    return (
        <Box>
            {/* 댓글을 먼저 렌더링 */}
            {comments.length === 0 ? (
                <Text color="gray.500">댓글이 없습니다.</Text>
            ) : (
                <Box mt={4}>
                    {renderComments(comments)} {/* 최상위 댓글부터 렌더링 */}
                </Box>
            )}

            {/* CommentForm을 댓글 목록 아래에 위치 */}
            <CommentForm postId={postId} onSubmitSuccess={fetchComments} />
        </Box>
    );
};

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
    const toast = useToast();

    const handleReplySubmit = async () => {
        console.log('Submitting reply for parentId:', comment.commentId); // 로그로 parentId 확인

        if (replyContent.trim() === '') {
            toast({
                title: "답글 내용을 입력하세요.",
                status: "warning",
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
                title: "답글이 등록되었습니다.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            toast({
                title: "답글 등록 중 오류 발생",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };


    // content가 직렬화된 문자열이라면 파싱
    let parsedContent;
    try {
        parsedContent = JSON.parse(comment.content).content;
    } catch (error) {
        parsedContent = comment.content; // 파싱 실패하면 원래 문자열을 사용
    }

    return (
        <Box
            mb={4}
            pl={4 * depth} // 깊이에 따른 들여쓰기
            borderLeft={depth > 0 ? "2px solid #CBD5E0" : "none"} // 깊이에 따른 선 색상
            borderRadius="md"
            backgroundColor={depth === 0 ? "gray.50" : "gray.100"} // 최상위 댓글과 답글 배경색 차별화
            p={4}
            boxShadow="sm"
        >
            <Flex justifyContent="space-between" alignItems="center">
                <Box>
                    <Text fontWeight="bold" fontSize="lg" color="gray.800" display="inline">
                        {comment.authorName}
                    </Text>
                    <Text as="span" fontSize="sm" color="gray.500" ml={2} display="inline">
                        {comment.authorMajor}
                    </Text>
                    <Text mt={2} color="gray.700" fontSize="md">
                        {parsedContent}
                    </Text>
                    <Text fontSize="xs" color="gray.500" mt={1}>
                        {new Date(comment.createdAt).toLocaleString()}
                    </Text>
                </Box>
                <Button size="xs" variant="outline" colorScheme="green" onClick={() => setShowReplyForm(!showReplyForm)}>
                    답글
                </Button>
            </Flex>

            {/* 답글 입력 폼 */}
            {showReplyForm && (
                <Box mt={4}>
                    <Input
                        placeholder="답글을 작성하세요"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        size="sm"
                        mb={2}
                        focusBorderColor="blue.500"
                        backgroundColor="white"
                        borderRadius="md"
                        shadow="xs"
                    />
                    <Button colorScheme="green" size="sm" onClick={handleReplySubmit}>
                        등록
                    </Button>
                </Box>
            )}

            {/* 자식 댓글(답글) */}
            {children}
        </Box>

    );
};

export default CommentList;
