import React from 'react';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Pagination: React.FC = () => {
    return (
        <Flex justify="center" align="center" mt={4}>
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
    );
};

export default Pagination;
