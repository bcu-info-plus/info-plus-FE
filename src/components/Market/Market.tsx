import React from 'react';
import {
    Box,
    Button,
    Image,
    Text,
    Flex,
    SimpleGrid,
    Input,
    IconButton,
    Select,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaHeart } from 'react-icons/fa';
import AdSection from "../Home/AdSection";

const items = [
    {
        id: 1,
        title: '전공책 팔아요',
        description: '사용감 있습니다.',
        price: '5000원',
        date: '24.07.04 18:07',
        imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URLs
    },
    {
        id: 2,
        title: '전공책 팝니다',
        description: '문의주세요',
        price: '10000원',
        date: '날짜/시간',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        title: '제목',
        description: '설명',
        price: '가격',
        date: '날짜/시간',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 4,
        title: '제목',
        description: '설명',
        price: '가격',
        date: '날짜/시간',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 5,
        title: '제목',
        description: '설명',
        price: '가격',
        date: '날짜/시간',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 6,
        title: '제목',
        description: '설명',
        price: '가격',
        date: '날짜/시간',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 7,
        title: '제목',
        description: '설명',
        price: '가격',
        date: '날짜/시간',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 8,
        title: '제목',
        description: '설명',
        price: '가격',
        date: '날짜/시간',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 9,
        title: '개커엽',
        description: '으하하',
        price: '2000원',
        date: '날짜/시간',
        imageUrl: 'https://via.placeholder.com/150',
    },
];

const Market: React.FC = () => (
    <Box p={6}>
        <AdSection />

        {/* Search and Favorite */}
        <Flex justify="space-between" align="center" mt={10} mb={4}>
            <Input placeholder="검색어를 입력해 주세요..." size="md" w="30%" />
            <Flex align="center">
                <Select w="120px" mr={4} size="sm">
                    <option value="latest">인기순</option>
                    <option value="priceAsc">낮은 가격순</option>
                    <option value="priceDesc">높은 가격순</option>
                </Select>
                <IconButton
                    aria-label="Favorite"
                    icon={<FaHeart />}
                    size="lg"
                    colorScheme="red"
                    variant="outline"
                />
            </Flex>
        </Flex>

        {/* Item Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {items.map((item) => (
                <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                    <Image src={item.imageUrl} alt={item.title} borderRadius="md" mb={3} />
                    <Text fontWeight="bold" fontSize="md" mb={1}>
                        {item.title}
                    </Text>
                    <Text color="gray.500" mb={1}>
                        {item.description}
                    </Text>
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text fontWeight="bold" color="gray.800">
                            {item.price}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            {item.date}
                        </Text>
                    </Flex>
                    <Button colorScheme="green" size="sm" w="full">
                        구매
                    </Button>
                </Box>
            ))}
        </SimpleGrid>

        {/* Pagination */}
        <Flex justify="center" align="center" mt={8}>
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
);

export default Market;
