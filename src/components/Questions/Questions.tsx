import React from 'react';
import {
    Box,
    Button,
    Input,
    Stack,
    Text,
    List,
    ListItem,
    Flex,
    IconButton,
    Select,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaHeart, FaCommentDots } from 'react-icons/fa';

const Questions: React.FC = () => {
    return (
        <Box p={6}>
            <Flex>
                {/* Left Sidebar Section */}
                <Box w="25%" p={4} borderWidth="1px" borderRadius="md" mr={4}>
                    {/* 게시하기 Button aligned to the left and smaller */}
                    <Button colorScheme="green" size="md" w="full" mb={4}>
                        게시하기
                    </Button>

                    {/* 검색어 입력 */}
                    <Input placeholder="검색어를 입력해 주세요..." mb={4} />

                    {/* 지금 주목받는 게시글 */}
                    <Box borderWidth="1px" borderRadius="md" p={3} borderColor="green.500">
                        <Text mb={2} fontWeight="bold">
                            지금 주목받는 게시글!
                        </Text>
                        <List spacing={2}>
                            {[...Array(5)].map((_, index) => (
                                <ListItem key={index} fontSize="sm" color="gray.700">
                                    인기글 내용 출력 인기글 내용 출력
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>

                {/* Right Main Content Section */}
                <Box w="75%">
                    <Flex justify="space-between" align="center" mb={4}>
                        <Text fontSize="lg" fontWeight="bold">
                            최신순
                        </Text>
                        <Select w="100px" size="sm">
                            <option value="latest">최신순</option>
                            <option value="popular">인기순</option>
                        </Select>
                    </Flex>

                    {/* Posts List */}
                    <Box borderWidth="1px" borderRadius="md" borderColor="green.500">
                        {Array(10)
                            .fill('')
                            .map((_, index) => (
                                <Flex
                                    key={index}
                                    borderBottom={index === 9 ? 'none' : '1px solid gray'}
                                    p={4}
                                    alignItems="center"
                                >
                                    <Box flex="1">
                                        <Text fontSize="md" fontWeight="bold" isTruncated>
                                            내용 최대 두줄 출력 내용 최대 두줄 출력 내용 최대 두줄 출력
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

                    {/* Pagination */}
                    <Flex justify="center" align="center" mt={4}>
                        <IconButton
                            aria-label="Previous page"
                            icon={<ChevronLeftIcon />}
                            size="sm"
                            mr={4}
                            colorScheme="green"
                        />
                        <Text>1</Text>
                        <IconButton
                            aria-label="Next page"
                            icon={<ChevronRightIcon />}
                            size="sm"
                            ml={4}
                            colorScheme="green"
                        />
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default Questions;
