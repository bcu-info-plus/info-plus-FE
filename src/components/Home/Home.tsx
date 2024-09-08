import React from 'react';
import { Box } from '@chakra-ui/react';
import Banner from './Banner';  // Example of a component import
import PopularPosts from './PopularPosts';      // Example of a component import
import LatestPosts from './LatestPosts';        // Example of a component import
import Footer from '../Footer';
import AdSection from "./AdSection";
import PostsSection from "./PostsSection";                  // Example of a component import

const Main: React.FC = () => (
    <Box
        maxW="1200px"
        mx="auto"
        p={10}
    >
            {/* Your components */}
            <Banner />
            <PopularPosts />
            <LatestPosts />
            <AdSection />
            <PostsSection />
    </Box>
);

export default Main;
