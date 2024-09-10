import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, Link, Collapse } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const MypageSidebar: React.FC = () => {
    const location = useLocation();
    const [isInquiryOpen, setInquiryOpen] = useState(false);

    // 페이지가 '/mypage/inquiry' 경로 하위에 있을 때 드롭다운 메뉴를 열어줌
    useEffect(() => {
        if (location.pathname.startsWith('/mypage/inquiry')) {
            setInquiryOpen(true);
        } else {
            setInquiryOpen(false);
        }
    }, [location.pathname]);

    const toggleInquiryMenu = () => {
        setInquiryOpen(!isInquiryOpen);
    };

    return (
        <Box w="20%" pr={6}>
            <List spacing={4}>
                <ListItem>
                    <Link
                        as={RouterLink}
                        to="/mypage"
                        fontWeight="bold"
                        color={location.pathname === '/mypage' ? 'green.500' : 'black'}
                    >
                        내정보
                    </Link>
                </ListItem>
                <ListItem>
                    <Link
                        as={RouterLink}
                        to="/mypage/purchase"
                        fontWeight="bold"
                        color={location.pathname === '/mypage/purchase' ? 'green.500' : 'black'}
                    >
                        구매 내역
                    </Link>
                </ListItem>
                <ListItem>
                    <Link
                        as={RouterLink}
                        to="/mypage/wishlist"
                        fontWeight="bold"
                        color={location.pathname === '/mypage/wishlist' ? 'green.500' : 'black'}
                    >
                        찜목록
                    </Link>
                </ListItem>
                <ListItem>
                    <Link
                        fontWeight="bold"
                        color={isInquiryOpen || location.pathname.startsWith('/mypage/inquiry') ? 'green.500' : 'black'}
                        onClick={toggleInquiryMenu} // 드롭다운 토글
                        style={{ cursor: 'pointer' }}
                    >
                        문의
                    </Link>

                    {/* 서브메뉴 (Collapse 이용) */}
                    <Collapse in={isInquiryOpen}>
                        <List pl={4} mt={2} spacing={2}>
                            <ListItem>
                                <Link
                                    as={RouterLink}
                                    to="/mypage/inquiry/service"
                                    fontWeight="normal"
                                    color={location.pathname === '/mypage/inquiry/service' ? 'green.500' : 'black'}
                                >
                                    서비스 이용 문의
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link
                                    as={RouterLink}
                                    to="/mypage/inquiry/advertisement"
                                    fontWeight="normal"
                                    color={location.pathname === '/mypage/inquiry/advertisement' ? 'green.500' : 'black'}
                                >
                                    광고 문의
                                </Link>
                            </ListItem>
                        </List>
                    </Collapse>
                </ListItem>
            </List>
        </Box>
    );
};

export default MypageSidebar;
