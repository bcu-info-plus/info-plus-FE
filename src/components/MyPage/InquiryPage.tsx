import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@chakra-ui/react';
import MypageSidebar from "./MypageSidebar";

const InquiryPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal 관리 훅
    const [isAgreed, setIsAgreed] = useState(false); // 개인정보 동의 체크 상태 관리

    return (
        <ChakraProvider>
            <Flex p={6} justify="center" align="start">
                <MypageSidebar/>

                <Box w="60%" p={8} borderWidth="1px" borderRadius="lg">
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>
                        문의하기
                    </Text>

                    <FormControl mb={4}>
                        <FormLabel>내용</FormLabel>
                        <Textarea placeholder="문의 내용을 입력하세요." bg="gray.100" />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>파일 첨부</FormLabel>
                        <Button colorScheme="green" leftIcon={<Box as="span" mr={2}>📂</Box>}>
                            파일 선택
                        </Button>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>연락 받을 이메일</FormLabel>
                        <Input placeholder="이메일을 입력하세요" bg="gray.100" />
                    </FormControl>

                    <Box mb={6}>
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                            개인정보 수집 및 이용
                        </Text>
                        <Checkbox
                            isChecked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                        >
                            <Text as="span" onClick={onOpen} textDecoration="underline" cursor="pointer">
                                개인정보 수집 및 이용 동의 (필수)
                            </Text>
                        </Checkbox>
                    </Box>

                    <Button
                        colorScheme="green"
                        size="lg"
                        w="full"
                        isDisabled={!isAgreed} // 동의하지 않으면 비활성화
                    >
                        문의 접수하기
                    </Button>

                    {/* 개인정보 수집 및 이용 동의 팝업 */}
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>개인정보 수집 및 이용</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>
                                    저희 서비스는 고객님께 더 나은 서비스를 제공하기 위해 개인정보를 수집합니다. <br/><br/>
                                    수집된 정보에는 이름, 이메일 등의 필수 정보가 포함됩니다. <br/><br/>
                                    해당 정보는 서비스 제공을 위해 사용되며, 일정 기간 동안 보관됩니다. <br/><br/>
                                    개인정보는 관련 법령에 따라 보호되며, 사용 목적 이외의 용도로는 사용되지 않습니다.
                                </Text>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="green" onClick={onClose}>
                                    닫기
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Flex>
        </ChakraProvider>
    );
};

export default InquiryPage;
