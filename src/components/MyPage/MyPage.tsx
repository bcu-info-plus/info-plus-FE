import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Avatar,
    Input,
    FormControl,
    FormLabel,
    Button,
    Stack,
    List,
    ListItem,
    Text,
    Link,
} from '@chakra-ui/react';
import MypageSidebar from "./MypageSidebar";

const MyPage: React.FC = () => {
    return (
        <Flex p={6} justify="center" align="start">
            {/* Sidebar */}
            <MypageSidebar />

            {/* Profile Form Section */}
            <Box w="60%">
                {/* Profile Picture and Nickname */}
                <Flex direction="column" align="center" mb={6}>
                    <Avatar size="xl" src="https://via.placeholder.com/150" mb={4} />
                    <Heading size="md">닉네임</Heading>
                </Flex>

                {/* Profile Form */}
                <Stack spacing={6}>
                    <FormControl>
                        <FormLabel>이름</FormLabel>
                        <Input type="text" defaultValue="카리나" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" defaultValue="hello@n.com" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>비밀번호</FormLabel>
                        <Input type="password" defaultValue="*********" />
                    </FormControl>

                    <Button colorScheme="gray" w="100px" alignSelf="flex-end">
                        수정
                    </Button>
                </Stack>
            </Box>
        </Flex>
    );
};

export default MyPage;
