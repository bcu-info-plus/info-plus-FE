import React from 'react';
import { ChakraProvider, Box, Text, Button, Checkbox, HStack, VStack, Flex, Divider, Avatar, Badge, IconButton } from '@chakra-ui/react';
import { FaHeart, FaTimes } from 'react-icons/fa';
import MypageSidebar from "./MypageSidebar";

// Define the type for a wishlist item
interface WishlistItem {
    id: number;
    title: string;
    price: string;
}

const WishlistPage: React.FC = () => {
    const wishlistItems: WishlistItem[] = [
        { id: 1, title: '구매 할 물건', price: '10000원' },
        { id: 2, title: '구매 할 물건', price: '10000원' },
        { id: 3, title: '구매 할 물건', price: '10000원' },
        { id: 4, title: '구매 할 물건', price: '10000원' },
        { id: 5, title: '구매 할 물건', price: '10000원' },
    ];

    return (
        <ChakraProvider>
            <Flex p={6} justify="center" align="start">
                {/* Sidebar */}
                <MypageSidebar />

                <Box p={8} w="60%">
                    {/* Header Section */}
                    <Flex justify="space-between" align="center">
                        <Text fontSize="2xl" fontWeight="bold">
                            찜목록
                        </Text>
                        <Badge colorScheme="green" fontSize="lg" p={2} borderRadius="full">
                            P 200 포인트
                        </Badge>
                    </Flex>

                    <Divider my={4} />

                    {/* Select All Checkbox */}
                    <Checkbox>전체 선택</Checkbox>

                    {/* Wishlist Items */}
                    <VStack mt={4} spacing={4}>
                        {wishlistItems.map((item) => (
                            <HStack key={item.id} w="full" p={4} borderWidth="1px" borderRadius="lg" bg="gray.100">
                                {/* Checkbox */}
                                <Checkbox />

                                {/* Product Image (Placeholder Avatar) */}
                                <Avatar size="lg" bg="gray.300" />

                                {/* Product Info */}
                                <VStack align="start" spacing={2} flex={1}>
                                    <Text fontSize="md" fontWeight="bold">
                                        {item.title}
                                    </Text>
                                </VStack>

                                {/* Price */}
                                <Text fontWeight="bold">{item.price}</Text>

                                {/* Favorite Icon */}
                                <IconButton
                                    aria-label="Add to favorites"
                                    icon={<FaHeart />}
                                    colorScheme="red"
                                    variant="ghost"
                                />

                                {/* Remove Icon */}
                                <IconButton
                                    aria-label="Remove item"
                                    icon={<FaTimes />}
                                    colorScheme="gray"
                                    variant="ghost"
                                />
                            </HStack>
                        ))}
                    </VStack>

                    {/* Pagination */}
                    <Flex mt={8} justify="space-between">
                        <Button colorScheme="green" leftIcon={<Text>‹</Text>}>
                            이전
                        </Button>
                        <Button colorScheme="green" rightIcon={<Text>›</Text>}>
                            다음
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </ChakraProvider>
    );
};

export default WishlistPage;
