import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, Textarea, Button, useToast, Flex, Icon, Image, CloseButton } from '@chakra-ui/react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const Write: React.FC = () => {
    const { category } = useParams<{ category: string }>(); // URL의 카테고리 파라미터를 가져옴
    const [content, setContent] = useState(''); // 게시글 내용 상태
    const [title, setTitle] = useState(''); // 게시글 제목 상태
    const [userId, setUserId] = useState<number | null>(null); // 사용자 ID 상태
    const [images, setImages] = useState<File[]>([]); // 이미지 파일 상태 (드롭된 파일 관리)
    const toast = useToast(); // 알림 메시지 표시용
    const navigate = useNavigate(); // 게시글 작성 후 리다이렉트용

    // 사용자 정보를 가져오는 로직
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 JWT 토큰을 가져옴

            if (token) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더로 전송
                        }
                    });

                    // 서버로부터 사용자 정보를 받아와 userId 설정
                    const user = response.data;
                    setUserId(user.userId); // 사용자 ID를 상태에 저장
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    toast({
                        title: '사용자 정보 불러오기 실패',
                        description: '로그인이 필요합니다.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            }
        };

        fetchUserData(); // 컴포넌트가 마운트될 때 사용자 정보를 불러옴
    }, [toast]);

    // 게시글 작성 핸들러
    const handlePostSubmit = async () => {
        if (!title || !content || !userId) {
            toast({
                title: '작성 실패',
                description: '제목, 내용, 그리고 사용자 정보가 필요합니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('boardType', category || ''); // 카테고리 정보를 게시글 타입으로 보냄
            formData.append('userId', userId.toString()); // 사용자 ID를 문자열로 전송

            // 이미지가 있으면 이미지 파일 추가
            if (images.length > 0) {
                images.forEach((image) => {
                    formData.append('images', image); // 여러 이미지를 FormData에 추가
                });
            }

            // axios를 통해 formData로 전송
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                toast({
                    title: '게시글 작성 성공',
                    description: '게시글이 성공적으로 작성되었습니다.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                // 작성 후 게시판 목록으로 리다이렉트
                navigate(`/board/${category}`);
            }
        } catch (error) {
            console.error(error);
            toast({
                title: '게시글 작성 실패',
                description: '게시글 작성 중 오류가 발생했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // 이미지 파일 드롭 핸들러 (react-dropzone)
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setImages([...images, ...acceptedFiles]); // 기존 파일과 새로 추가된 파일을 합침
    }, [images]);

    // 이미지 삭제 핸들러
    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index); // 해당 인덱스 이미지를 삭제
        setImages(newImages); // 상태 업데이트
    };

    // react-dropzone에서 수정된 accept 형식 사용
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.gif'], // 올바른 형식의 accept 사용
        },
    });

    return (
        <Box p={8} maxW="800px" mx="auto">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {category === 'question' ? '질문 게시글 작성' : category === 'announcement' ? '공지사항 작성' : '게시글 작성'}
            </Text>

            {/* 제목 입력 */}
            <Textarea
                placeholder="제목을 입력하세요..."
                mb={4}
                value={title}
                onChange={(e) => setTitle(e.target.value)} // 제목 상태 업데이트
            />

            {/* 게시글 내용 입력 */}
            <Textarea
                placeholder="게시글 내용을 입력하세요..."
                mb={4}
                value={content}
                onChange={(e) => setContent(e.target.value)} // 내용 상태 업데이트
                rows={20}
            />

            {/* 업로드한 이미지 미리보기 및 삭제 기능 */}
            <Flex wrap="wrap" mb={4}>
                {images.map((file, index) => (
                    <Box key={index} position="relative" m={2}>
                        <Image
                            src={URL.createObjectURL(file)} // 이미지를 미리보기
                            alt={`uploaded image ${index}`}
                            boxSize="100px"
                            objectFit="cover"
                            borderRadius="md"
                        />
                        <CloseButton
                            position="absolute"
                            top="0"
                            right="0"
                            onClick={() => handleRemoveImage(index)} // 이미지 삭제
                        />
                    </Box>
                ))}
            </Flex>

            {/* 드래그 앤 드롭 또는 파일 선택 */}
            <Box
                {...getRootProps()}
                p={8}
                border="2px dashed"
                borderColor={isDragActive ? 'green.400' : 'gray.200'}
                borderRadius="md"
                textAlign="center"
                mb={4}
                _hover={{ borderColor: 'green.400' }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <Text>파일을 여기에 드롭하세요...</Text>
                ) : (
                    <Flex direction="column" alignItems="center" justifyContent="center">
                        <Icon as={AiOutlineCloudUpload} boxSize={10} color="gray.500" />
                        <Text>이미지를 드래그 앤 드롭 하거나 클릭하여 파일을 선택하세요</Text>
                    </Flex>
                )}
            </Box>

            {/* 게시글 작성 버튼을 오른쪽으로 정렬 */}
            <Flex justifyContent="flex-end">
                <Button
                    colorScheme="green"
                    onClick={handlePostSubmit}
                    isDisabled={!title || !content || !userId} // 제목, 내용, userId가 없을 경우 비활성화
                >
                    작성 완료
                </Button>
            </Flex>
        </Box>
    );
};

export default Write;
