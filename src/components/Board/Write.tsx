import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Textarea, Button } from '@chakra-ui/react';

const Write: React.FC = () => {
    const { category } = useParams<{ category: string }>(); // URL의 카테고리 파라미터를 가져옴

    return (
        <Box p={8} maxW="800px" mx="auto">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {category === 'question' ? '질문 게시글 작성' : category === 'announcement' ? '공지사항 작성' : '게시글 작성'}
            </Text>
            <Textarea placeholder="게시글 내용을 입력하세요..." mb={4} />
            <Button colorScheme="green">작성 완료</Button>
        </Box>
    );
};

export default Write;
