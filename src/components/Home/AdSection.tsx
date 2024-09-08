import React from 'react';
import { Box, Image, SimpleGrid } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

const AdSection: React.FC = () => (
    <Box p={6}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <RouterLink to="/">
                <Image
                    src={`${process.env.PUBLIC_URL}/images/banner1.png`}
                    alt="Banner 1"
                    objectFit="cover"
                    w="100%"
                    h="auto" // Ensure the height adjusts automatically
                    borderRadius="md" // Rounded corners for a more polished look
                    boxShadow="md" // Optional shadow for a polished look
                />
            </RouterLink>

            <RouterLink to="/">
                <Image
                    src={`${process.env.PUBLIC_URL}/images/banner2.png`}
                    alt="Banner 2"
                    objectFit="cover"
                    w="100%"
                    h="auto"
                    borderRadius="md"
                    boxShadow="md"
                />
            </RouterLink>

            <RouterLink to="/">
                <Image
                    src={`${process.env.PUBLIC_URL}/images/banner3.png`}
                    alt="Banner 3"
                    objectFit="cover"
                    w="100%"
                    h="auto"
                    borderRadius="md"
                    boxShadow="md"
                />
            </RouterLink>
        </SimpleGrid>
    </Box>
);

export default AdSection;
