import React from 'react';
import { ChakraProvider, Box, Text, Button, Checkbox, HStack, VStack, Flex, Divider, Avatar, Badge } from '@chakra-ui/react';
import MypageSidebar from "./MypageSidebar";

// Define the type for a purchase item
interface PurchaseItem {
    id: number;
    title: string;
    price: string;
}

const PurchaseItems: React.FC = () => {
    const purchaseItems: PurchaseItem[] = [
        { id: 1, title: '구매 한 물건', price: '10000원' },
        { id: 2, title: '구매 한 물건', price: '10000원' },
        { id: 3, title: '구매 한 물건', price: '10000원' },
        { id: 4, title: '구매 한 물건', price: '10000원' },
        { id: 5, title: '구매 한 물건', price: '10000원' },
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
                            구매 내역
                        </Text>
                        <Badge colorScheme="green" fontSize="lg" p={2} borderRadius="full">
                            P 200 포인트
                        </Badge>
                    </Flex>

                    <Divider my={4} />

                    {/* Purchase List */}
                    <Checkbox>전체 선택</Checkbox>

                    <VStack mt={4} spacing={4}>
                        {purchaseItems.map((item) => (
                            <HStack key={item.id} w="full" p={4} borderWidth="1px" borderRadius="lg">
                                <Avatar size="lg" />
                                <VStack align="start" spacing={2} flex={1}>
                                    <Text fontSize="md" fontWeight="bold">
                                        날짜
                                    </Text>
                                    <Text>{item.title}</Text>
                                </VStack>
                                <Text fontWeight="bold">{item.price}</Text>
                                <Button variant="ghost" colorScheme="gray">
                                    ✕
                                </Button>
                            </HStack>
                        ))}
                    </VStack>

                    {/* Pagination */}
                    <Flex mt={8} justify="space-between">
                        <Button colorScheme="green">이전</Button>
                        <Button colorScheme="green">다음</Button>
                    </Flex>
                </Box>
            </Flex>
        </ChakraProvider>
    );
};

export default PurchaseItems;
