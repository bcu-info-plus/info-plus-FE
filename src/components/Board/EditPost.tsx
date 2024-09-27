import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, Textarea, Button, useToast, Flex, Icon, Image, CloseButton } from '@chakra-ui/react';
import axios from 'axios';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useDropzone } from 'react-dropzone';

const EditPost: React.FC = () => {
    const { id, category } = useParams<{ id: string; category: string }>(); // 게시글 ID와 카테고리 파라미터
    const [content, setContent] = useState(''); // 게시글 내용 상태
    const [title, setTitle] = useState(''); // 게시글 제목 상태
    const [userId, setUserId] = useState<number | null>(null); // 사용자 ID 상태
    const [images, setImages] = useState<any[]>([]); // 이미지 파일 상태 (기존 이미지 + 새로운 이미지 모두)
    // 기존 이미지를 저장할 상태 변수
    const [uploadedImages, setUploadedImages] = useState<{ imageId: number; imageUrl: string }[]>([]);
    // 새로 추가된 이미지를 저장할 상태 변수
    const [newImages, setNewImages] = useState<File[]>([]);
    const toast = useToast(); // 알림 메시지 표시용
    const navigate = useNavigate(); // 게시글 수정 후 리다이렉트용

    // 이미지 파일 드롭 핸들러 (react-dropzone)
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setImages([...images, ...acceptedFiles]); // 기존 파일과 새로 추가된 파일을 합침
    }, [images]);

    // Dropzone에서 사용할 구성 설정
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.gif'], // 올바른 형식의 accept 사용
        },
    });

    // 기존 게시글과 사용자 정보를 불러오는 useEffect
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                // 게시글 데이터를 불러와서 상태에 저장
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`);
                const post = response.data;
                setTitle(post.title); // 기존 제목
                setContent(post.content); // 기존 내용
                setUserId(post.user.userId); // 작성자 ID 설정

                // 서버에서 받은 이미지 데이터와 새로 추가할 이미지 배열을 합침
                const uploadedImages = post.images.map((image: any) => ({
                    ...image,
                    isUploaded: true, // 기존 이미지를 구분할 수 있게 추가
                }));
                setImages(uploadedImages); // 기존 이미지를 상태에 저장
            } catch (error) {
                console.error('Error fetching post data:', error);
                toast({
                    title: '게시글 불러오기 실패',
                    description: '게시글 정보를 불러오는 중 오류가 발생했습니다.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        // 사용자 정보를 불러오는 함수
        const fetchUserData = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const user = response.data;
                    setUserId(user.userId); // 사용자 ID 설정
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

        fetchPostData(); // 기존 게시글 정보 불러오기
        fetchUserData(); // 사용자 정보 불러오기
    }, [id, toast]);

    // 이미지 삭제 핸들러 (이미지 종류에 상관없이)
    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index); // 인덱스 기반으로 이미지 삭제
        setImages(newImages); // 상태 업데이트
    };

    const handleEditSubmit = async () => {
        if (!title || !content || !userId) {
            toast({
                title: '수정 실패',
                description: '제목, 내용, 그리고 사용자 정보가 필요합니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const token = localStorage.getItem('accessToken'); // JWT 토큰
            const formData = new FormData();

            // 게시글 관련 정보 추가
            formData.append('title', title);
            formData.append('content', content);
            formData.append('boardType', category || ''); // undefined일 때 빈 문자열 사용
            formData.append('userId', userId!.toString()); // 작성자 ID

            // **기존 이미지를 유지하기 위해 기존 이미지 ID만 서버로 전송**
            images.forEach((image: any) => {
                if (image.isUploaded) {
                    formData.append('existingImages', image.imageId.toString()); // 서버로 기존 이미지 ID 전달
                } else {
                    // **새로 추가된 이미지를 추가**
                    formData.append('images', image); // 새로 추가된 이미지 전송
                }
            });

            // **axios를 통해 formData로 전송**
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/posts/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // 토큰 전송
                },
            });

            if (response.status === 200) {
                toast({
                    title: '게시글 수정 성공',
                    description: '게시글이 성공적으로 수정되었습니다.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                // 수정 후 게시글로 이동
                navigate(`/board/${category}/post/${id}`);
            }
        } catch (error) {
            console.error(error);
            toast({
                title: '게시글 수정 실패',
                description: '게시글 수정 중 오류가 발생했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };



    return (
        <Box p={8} maxW="800px" mx="auto">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                게시글 수정
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

            {/* 이미지 미리보기 */}
            <Flex wrap="wrap" mb={4}>
                {images
                    .sort((a, b) => {
                        // 서버에서 받아온 기존 이미지는 imageId로 정렬
                        if (a.isUploaded && b.isUploaded) {
                            return a.imageId - b.imageId; // 기존 이미지: imageId 기준으로 정렬
                        }
                        // 새로 추가된 이미지는 추가된 순서 유지 (이미 배열 순서대로 있으므로 정렬하지 않음)
                        if (!a.isUploaded && !b.isUploaded) {
                            return 0; // 새로 추가된 이미지 순서는 그대로 유지
                        }
                        // 기존 이미지가 새 이미지보다 앞에 오도록 설정
                        return a.isUploaded ? -1 : 1;
                    })
                    .map((image, index) => (
                        <Box key={index} position="relative" m={2}>
                            <Image
                                src={
                                    image.isUploaded
                                        ? `${process.env.REACT_APP_API_URL}${image.imageUrl}` // 기존 이미지
                                        : URL.createObjectURL(image) // 새로 추가한 이미지 미리보기
                                }
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

            {/* 게시글 수정 버튼 */}
            <Flex justifyContent="flex-end">
                <Button
                    colorScheme="blue"
                    onClick={handleEditSubmit}
                    isDisabled={!title || !content || !userId} // 제목, 내용, userId가 없을 경우 비활성화
                >
                    수정 완료
                </Button>
            </Flex>
        </Box>
    );
};

export default EditPost;
