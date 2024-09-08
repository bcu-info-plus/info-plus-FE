import React from 'react';
import { Box, Heading, SimpleGrid, Flex, Link } from '@chakra-ui/react';
import PostCard from './PostCard'; // Import the PostCard component

const LatestPosts: React.FC = () => (
    <Box p={6}>
        {/* Title and "더보기" link */}
        <Flex justify="space-between" align="center" mb={4}>
            <Box>
                <Heading size="md" mb={1}>
                    최신 게시물
                </Heading>
                <Box h="2px" w="90px" bg="green.500" mt="-2px"></Box> {/* Small green underline */}
            </Box>
            <Link href="#" fontSize="sm" color="gray.600">
                + 더보기
            </Link>
        </Flex>

        {/* Post grid */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
            {[...Array(4)].map((_, index) => (
                <PostCard key={index} />
            ))}
        </SimpleGrid>
    </Box>
);

export default LatestPosts;
