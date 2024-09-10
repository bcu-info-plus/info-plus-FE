import React from 'react';
import {Box, Flex, Select, Text} from '@chakra-ui/react';
import { FaHeart, FaCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PostList: React.FC = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const handlePostClick = (postId: number) => {
        // 게시글 클릭 시 해당 postId로 상세 페이지 이동
        navigate(`/post/${postId}`);
    };

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                    최신순
                </Text>
                <Select w="100px" size="sm">
                    <option value="latest">최신순</option>
                    <option value="popular">인기순</option>
                </Select>
            </Flex>

            <Box borderWidth="1px" borderRadius="md" borderColor="green.500">
            {Array(10)
                .fill('')
                .map((_, index) => (
                    <Flex
                        key={index}
                        borderBottom={index === 9 ? 'none' : '1px solid gray'}
                        p={4}
                        alignItems="center"
                        cursor="pointer"
                        _hover={{ bg: 'gray.100' }}
                        onClick={() => handlePostClick(index + 1)} // 게시글 클릭 시 이동
                    >
                        <Box flex="1">
                            <Text fontSize="md" fontWeight="bold" isTruncated>
                                게시글 제목 내용 최대 두 줄 출력 내용 최대 두 줄 출력
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                                컴퓨터소프트웨어과
                            </Text>
                        </Box>

                        {/* Post Date and Stats */}
                        <Box w="120px" textAlign="right">
                            <Text fontSize="xs" color="gray.500">
                                09/01
                            </Text>
                            <Flex justify="flex-end" align="center" mt={2}>
                                <Text fontSize="xs" mr={2}>
                                    99+
                                </Text>
                                <FaCommentDots color="gray.500" />
                                <Text fontSize="xs" mx={2}>
                                    99+
                                </Text>
                                <FaHeart color="gray.500" />
                            </Flex>
                        </Box>
                    </Flex>
                ))}
            </Box>
        </Box>
    );
};

export default PostList;
