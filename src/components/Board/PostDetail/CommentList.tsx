import React, { useState, useEffect } from 'react';
import { Box, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import CommentItem from './CommentItem'; // CommentItem 컴포넌트 추가
import CommentForm from './CommentForm'; // CommentForm 추가

interface Comment {
    commentId: number;
    userId: number;
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

export default CommentList;
