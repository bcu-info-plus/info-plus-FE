import React from 'react';
import { Box, Text, Avatar, Image, Flex, Input, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import BoardSidebar from './BoardSidebar';

const PostDetail: React.FC = () => {
    const { postId } = useParams<{ postId: string }>(); // URL에서 postId를 가져옴

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
                        <Avatar size="md" name="홍길동" />
                        <Box ml={3}>
                            <Text fontWeight="bold">홍길동</Text>
                            <Text fontSize="sm" color="gray.500">
                                디자인과 | 2024/09/01 21:16
                            </Text>
                        </Box>
                    </Flex>

                    <Text mb={4} fontWeight="bold" fontSize="lg">
                        디자인 하다가 고양이 사진 찾았는데 귀엽지
                    </Text>

                    <Image src="https://via.placeholder.com/600x400" alt="고양이 이미지" mb={4} />

                    <Flex justifyContent="space-between" mb={6}>
                        <Flex alignItems="center">
                            <Button variant="ghost" size="sm">
                                댓글 5
                            </Button>
                            <Button variant="ghost" size="sm">
                                좋아요 134
                            </Button>
                        </Flex>
                        <Button variant="ghost" size="sm">
                            더보기
                        </Button>
                    </Flex>
                </Box>

                {/* 댓글 영역 */}
                <Box borderWidth="1px" borderRadius="md" borderColor="gray.300" p={4}>
                    {/* 댓글 리스트 */}
                    <Box mb={6}>
                        {Array(5)
                            .fill('')
                            .map((_, index) => (
                                <Box key={index} p={4} borderBottom="1px solid #e2e8f0">
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Text fontWeight="bold">이름 학과이름</Text>
                                            <Text mb={2}>
                                                내용에 따라 칸의 크기가 달라짐 내용에 따라 칸의 크기가 달라짐
                                            </Text>
                                            <Text fontSize="xs" color="gray.500">
                                                2000/00/00 00:00
                                            </Text>
                                        </Box>
                                        <Button size="xs" variant="ghost">
                                            답글
                                        </Button>
                                    </Flex>
                                </Box>
                            ))}
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
