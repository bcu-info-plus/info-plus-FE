import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Questions from './components/Board/Questions/Questions';
import Free from './components/Board/Free/Free';
import Tips from './components/Board/Tips/Tips';
import Market from './components/Market/Market';
import MyPage from './components/MyPage/MyPage';
import Footer from "./components/Footer";
import PurchaseItems from "./components/MyPage/PurchaseItems";
import WishlistPage from "./components/MyPage/WishlistPage";
import InquiryPage from "./components/MyPage/InquiryPage";
import AdvertisementInquiry from "./components/MyPage/AdvertisementInquiry";
import Write from "./components/Board/Write";
import PostList from "./components/Board/PostList";
import PostDetail from "./components/Board/PostDetail";

const App: React.FC = () => (
    <ChakraProvider> {/* Wrap app with ChakraProvider */}
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/board/questions" element={<Questions />} />
                <Route path="/board/free" element={<Free />} />
                <Route path="/board/tips" element={<Tips />} />
                <Route path="/board/:category/write" element={<Write />} />
                {/* 게시글 목록 */}
                <Route path="/" element={<PostList />} />

                {/* 게시글 상세 페이지 (ID를 경로 파라미터로 받음) */}
                <Route path="/post/:postId" element={<PostDetail />} />


                <Route path="/market" element={<Market />} />

                <Route path="/mypage" element={<MyPage />} />
                <Route path="/mypage/purchase" element={<PurchaseItems />} />
                <Route path="/mypage/wishlist" element={<WishlistPage />} />
                <Route path="/mypage/inquiry/service" element={<InquiryPage />} />
                <Route path="/mypage/inquiry/advertisement" element={<AdvertisementInquiry />} />
            </Routes>
            <Footer />
        </Router>
    </ChakraProvider>
);

export default App;
