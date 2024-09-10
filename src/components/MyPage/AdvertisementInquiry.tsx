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
    Stack,
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

const AdvertisementInquiry: React.FC = () => {
    const [isAgreedPrivacy, setIsAgreedPrivacy] = useState(false);
    const [isAgreedTerms, setIsAgreedTerms] = useState(false);

    const {
        isOpen: isPrivacyModalOpen,
        onOpen: onPrivacyModalOpen,
        onClose: onPrivacyModalClose,
    } = useDisclosure(); // 개인정보 모달

    const {
        isOpen: isTermsModalOpen,
        onOpen: onTermsModalOpen,
        onClose: onTermsModalClose,
    } = useDisclosure(); // 유의사항 모달

    return (
        <ChakraProvider>
            <Flex p={6} justify="center" align="start">
                <MypageSidebar/>

                <Box w="60%" p={8} borderWidth="1px" borderRadius="lg">
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>
                        광고 문의
                    </Text>

                    <FormControl mb={4}>
                        <FormLabel>이름</FormLabel>
                        <Input placeholder="이름을 입력하세요" />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>회사명</FormLabel>
                        <Input placeholder="회사명을 입력하세요" />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>전화번호</FormLabel>
                        <Input placeholder="전화번호를 입력하세요" />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>이메일</FormLabel>
                        <Input placeholder="이메일을 입력하세요" />
                    </FormControl>

                    <FormControl mb={6}>
                        <FormLabel>문의 내용</FormLabel>
                        <Stack spacing={3}>
                            <Text>1. 광고 내용</Text>
                            <Textarea placeholder="광고 내용을 입력하세요" />

                            <Text>2. 기간</Text>
                            <Textarea placeholder="광고 기간을 입력하세요" />

                            <Text>3. 예산</Text>
                            <Textarea placeholder="광고 예산을 입력하세요" />

                            <Text>4. 파일 첨부 (선택)</Text>
                            <Button colorScheme="green" leftIcon={<Box as="span" mr={2}>📂</Box>}>
                                파일 선택
                            </Button>
                        </Stack>
                    </FormControl>

                    <Stack mb={6}>
                        <Checkbox
                            isChecked={isAgreedPrivacy}
                            onChange={(e) => setIsAgreedPrivacy(e.target.checked)}
                        >
                            <Text as="span" onClick={onPrivacyModalOpen} textDecoration="underline" cursor="pointer">
                                개인정보 수집 및 이용 동의 (필수)
                            </Text>
                        </Checkbox>

                        <Checkbox
                            isChecked={isAgreedTerms}
                            onChange={(e) => setIsAgreedTerms(e.target.checked)}
                        >
                            <Text as="span" onClick={onTermsModalOpen} textDecoration="underline" cursor="pointer">
                                유의사항을 확인하였습니다. (필수)
                            </Text>
                        </Checkbox>
                    </Stack>

                    <Button
                        colorScheme="green"
                        size="lg"
                        w="full"
                        isDisabled={!isAgreedPrivacy || !isAgreedTerms} // 두 체크박스가 체크되지 않으면 비활성화
                    >
                        문의 접수하기
                    </Button>

                    {/* 개인정보 수집 및 이용 동의 모달 */}
                    <Modal isOpen={isPrivacyModalOpen} onClose={onPrivacyModalClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>개인정보 수집 및 이용 동의</ModalHeader>
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
                                <Button colorScheme="green" onClick={onPrivacyModalClose}>
                                    닫기
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                    {/* 유의사항 확인 모달 */}
                    <Modal isOpen={isTermsModalOpen} onClose={onTermsModalClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>유의사항 확인</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>
                                    접수된 문의에 대해 별도의 보상이나 회신 의무가 없습니다.<br/><br/>
                                    광고 집행, 사업 제휴와 무관한 문의나 담당자 면담을 전제로 한 문의는 반려될 수 있습니다.<br/><br/>
                                    제안된 아이디어는 이미 검토 중이거나 기존 제안된 것일 수 있습니다. 지적재산권이 포함된 내용은 권리 보호를 위해 권리 확보 후 제안해
                                    주세요.<br/><br/>
                                    문의 및 제안서 내용에 대해 비밀유지 협약을 체결하지 않으며, 영업 기밀에 대한 보안 의무가 없으므로 공개 가능한 내용만 포함해
                                    주세요.<br/><br/>
                                    회신 이후 논의가 진행되더라도 이는 제안과 관련된 약속, 계약, 신규성, 독창성, 권리를 인정하는 것이 아닙니다.
                                </Text>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="green" onClick={onTermsModalClose}>
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

export default AdvertisementInquiry;