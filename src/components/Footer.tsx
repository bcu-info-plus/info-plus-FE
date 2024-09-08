import React from 'react';
import { Box, Stack, Heading, Text, List, ListItem, Link, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => (
    <Box as="footer" bg="gray.100" py={10} px={6}>
        <Box maxW="1200px" mx="auto">  {/* Limit width and center content */}
            <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="flex-start" spacing={8}>
                <Box flex="1">
                    <Heading as="h3" size="lg" mb={2}>info+</Heading>
                    <Text maxW="400px">
                        대한민국의 대학들을 연결하고, 그 영향을 느낄 수 있는 커뮤니티
                    </Text>
                    <Stack direction="row" mt={4} spacing={3}>
                        <IconButton
                            as="a"
                            href="https://facebook.com"
                            aria-label="Facebook"
                            icon={<FaFacebook />}
                            bg="gray.300"
                            _hover={{ bg: 'gray.400' }}
                            size="lg"
                        />
                        <IconButton
                            as="a"
                            href="https://twitter.com"
                            aria-label="Twitter"
                            icon={<FaTwitter />}
                            bg="gray.300"
                            _hover={{ bg: 'gray.400' }}
                            size="lg"
                        />
                        <IconButton
                            as="a"
                            href="https://instagram.com"
                            aria-label="Instagram"
                            icon={<FaInstagram />}
                            bg="gray.300"
                            _hover={{ bg: 'gray.400' }}
                            size="lg"
                        />
                    </Stack>
                </Box>

                <Stack direction="row" spacing={12} flex="1" justify="space-around">
                    <Box>
                        <Heading as="h4" size="md" mb={3}>개인 정보</Heading>
                        <List spacing={2}>
                            <ListItem>
                                <Link href="/terms-of-service">이용 약관</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="/privacy-policy">개인정보처리방침</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="/cookie-policy">쿠키 정책</Link>
                            </ListItem>
                        </List>
                    </Box>

                    <Box>
                        <Heading as="h4" size="md" mb={3}>Company</Heading>
                        <List spacing={2}>
                            <ListItem>
                                <Link href="/about">About</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="/careers">Careers</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="/contact">Contact</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="/press">Press</Link>
                            </ListItem>
                        </List>
                    </Box>
                </Stack>
            </Stack>

            <Text textAlign="center" fontSize="sm" color="gray.600" mt={10}>
                © {new Date().getFullYear()} info+. All rights reserved.
            </Text>
        </Box>
    </Box>
);

export default Footer;
