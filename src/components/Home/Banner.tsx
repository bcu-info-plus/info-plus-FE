import React, { useState, useEffect } from 'react';
import { Box, Image, IconButton, HStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const banners = [
    `${process.env.PUBLIC_URL}/images/banner1.png`,
    `${process.env.PUBLIC_URL}/images/banner2.png`,
    `${process.env.PUBLIC_URL}/images/banner3.png`
];

const Banner: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!isHovering) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovering]);

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
    };

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % banners.length);
    };

    return (
        <Box
            position="relative"
            w="full"
            overflow="visible"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Image src={banners[currentIndex]} alt="Banner" w="full" h="400px" objectFit="cover" />

            <IconButton
                aria-label="Previous slide"
                icon={<ChevronLeftIcon fontSize="40px" />}
                position="absolute"
                left="-50px"
                top="50%"
                transform="translateY(-50%)"
                bg="transparent"
                color="gray.500"
                _hover={{ bg: 'gray.200', color: 'gray.700' }}
                onClick={prevSlide}
                zIndex={10}
                size="lg"
            />

            <IconButton
                aria-label="Next slide"
                icon={<ChevronRightIcon fontSize="40px" />}
                position="absolute"
                right="-50px"
                top="50%"
                transform="translateY(-50%)"
                bg="transparent"
                color="gray.500"
                _hover={{ bg: 'gray.200', color: 'gray.700' }}
                onClick={nextSlide}
                zIndex={10}
                size="lg"
            />

            <HStack position="absolute" bottom="10px" w="full" justify="center">
                {banners.map((_, index) => (
                    <Box
                        key={index}
                        w={index === currentIndex ? '12px' : '8px'}
                        h={index === currentIndex ? '12px' : '8px'}
                        bg={index === currentIndex ? 'green.500' : 'gray.300'}
                        borderRadius="50%"
                        mx={1}
                        cursor="pointer"
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </HStack>
        </Box>
    );
};

export default Banner;
