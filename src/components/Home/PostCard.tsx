import React from 'react';
import { Box, Flex, Avatar, Text, Heading, Stack } from '@chakra-ui/react';

const PostCard: React.FC = () => (
    <Box
        p={4}
        bg="white"
        boxShadow="md"
        borderRadius="lg"
        maxW="400px"
        border="1px solid"
        borderColor="gray.200"
    >
        <Flex justify="space-between">
            {/* Left side with Avatar and Name/Department */}
            <Flex>
                <Avatar name="User Name" src="https://bit.ly/broken-link" />
                <Stack spacing={0} ml={3}>
                    <Heading size="sm">이름</Heading>
                    <Text fontSize="sm" color="gray.500">학과 이름</Text>
                </Stack>
            </Flex>

            {/* Right side with Board type */}
            <Text fontSize="sm" color="gray.500">자유 게시판</Text>
        </Flex>

        {/* Post Content */}
        <Box mt={4}>
            <Text>질문 내용</Text>
            <Text>질문 내용</Text>
            <Text>질문 내용</Text>
        </Box>
    </Box>
);

export default PostCard;
