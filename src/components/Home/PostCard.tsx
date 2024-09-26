import React from 'react';
import { Box, Flex, Avatar, Text, Heading, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
    id: number;
    title: string;    // 게시글 제목
    user: string;     // 작성자 이름 (user.name)
    major: string;    // 작성자의 학과
    boardType: string; // 게시판 종류
    content: string;  // 게시글 내용
}

const PostCard: React.FC<PostCardProps> = ({ id, title, user, major, boardType, content }) => {
    // 내용이 너무 길 경우 자르기
    const truncatedContent = content.length > 100 ? `${content.slice(0, 100)}...` : content;
    const navigate = useNavigate();  // useNavigate 훅 사용

    // 클릭 시 게시글로 이동하는 함수
    const handleClick = () => {
        navigate(`/board/${boardType.toLowerCase()}/post/${id}`);
    };

    return (
        <Box
            p={4}
            bg="white"
            boxShadow="md"
            borderRadius="lg"
            maxW="400px"
            border="1px solid"
            borderColor="gray.200"
            onClick={handleClick}  // 클릭 이벤트 추가
            cursor="pointer"  // 클릭 가능하도록 커서 스타일 설정
            _hover={{ bg: 'gray.100' }} // 호버 시 배경색 변경
        >
            <Flex justify="space-between">
                {/* 작성자 아바타 및 정보 */}
                <Flex>
                    <Avatar name={user} src="https://bit.ly/broken-link" /> {/* user 이름에 따라 아바타 표시 */}
                    <Stack spacing={0} ml={3}>
                        <Heading size="sm">{user}</Heading> {/* user (작성자 이름) */}
                        <Text fontSize="sm" color="gray.500">{major}</Text> {/* 학과 이름 */}
                    </Stack>
                </Flex>

                {/* 게시판 종류 */}
                <Text fontSize="sm" color="gray.500">{boardType}</Text>
            </Flex>

            {/* 게시글 제목 및 내용 */}
            <Box mt={4}>
                <Text fontWeight="bold">{title}</Text> {/* 게시글 제목 */}
                <Text mt={2}>{truncatedContent}</Text> {/* 게시글 내용 */}
            </Box>
        </Box>
    );
};

export default PostCard;
