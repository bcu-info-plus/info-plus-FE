import React from 'react';
import { Box, Flex, Text, Select } from '@chakra-ui/react';
import BoardSidebar from '../BoardSidebar';
import PostList from '../PostList';
import Pagination from '../Pagination';

const Free: React.FC = () => {
    return (
        <Box p={6}>
            <Flex>
                {/* Left Sidebar Section */}
                <BoardSidebar />

                {/* Right Main Content Section */}
                <Box w="75%">
                    {/* Posts List and Pagination should be in a vertical layout */}
                    <Box>
                        <PostList />
                        <Pagination />
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default Free;
