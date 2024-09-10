import React from 'react';
import { Box, Button, Input, List, ListItem, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation(); // 현재 경로 가져오기
    const navigate = useNavigate();  // 경로 이동을 위한 useNavigate 사용

    const handlePostButtonClick = () => {
        // 현재 경로를 바탕으로 게시글 작성 경로 설정
        const currentPath = location.pathname;
        const postWritePath = currentPath
            .replace(/\/\d+$/, '') // 마지막 숫자를 제거한 후 남은 경로
            .replace(/\/post$/, '') // "/post" 제거
            .concat('/write')       // 경로에 "/write" 추가
            .replace(/\/{2,}/g, '/'); // 중복된 슬래시를 하나로 변환
        navigate(postWritePath); // 지정된 경로로 이동
    };

    return (
        <Box w="25%" p={4} borderWidth="1px" borderRadius="md" mr={4}>
            {/* 게시하기 Button aligned to the left and smaller */}
            <Button colorScheme="green" size="md" w="full" mb={4} onClick={handlePostButtonClick}>
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
    );
};

export default Sidebar;
