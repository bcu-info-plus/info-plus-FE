import React from 'react';
import { Box, HStack, Link, Input, Image, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => (
    <Box as="nav" bg="gray.100" py={4} px={10} boxShadow="md">
        <HStack spacing={8} justify="space-between">
            {/* Logo */}
            <RouterLink to="/">
                <Image src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo"/>
            </RouterLink>

            {/* Navigation Links */}
            <HStack spacing={6}>
                <Link as={RouterLink} to="/board/questions" fontWeight="medium">질문 게시판</Link>
                <Link as={RouterLink} to="/board/free" fontWeight="medium">자유 게시판</Link>
                <Link as={RouterLink} to="/board/tips" fontWeight="medium">Tip&해설 공유</Link>
                <Link as={RouterLink} to="/market" fontWeight="medium">장터</Link>
                <Link as={RouterLink} to="/mypage" fontWeight="medium">마이페이지</Link>
            </HStack>

            <RouterLink to="/mypage">
                <Image src={`${process.env.PUBLIC_URL}/images/profile_green.png`} alt="logo"/>
            </RouterLink>
        </HStack>
    </Box>
);

export default Navbar;
