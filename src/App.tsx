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
import LoginPage from "./components/User/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./components/User/RegisterPage";
import SilentRefresh from "./components/SilentRefresh";

const App: React.FC = () => (
    <ChakraProvider> {/* Wrap app with ChakraProvider */}
        <Router>
            {/* SilentRefresh가 라우팅 변경 시마다 실행되도록 추가 */}
            <SilentRefresh />

            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />

                {/* 구체적인 경로를 먼저 선언 */}
                <Route path="/board/questions" element={<Questions />} />
                <Route path="/board/free" element={<Free />} />
                <Route path="/board/tips" element={<Tips />} />

                {/* 동적 경로는 나중에 선언 */}
                <Route path="/board/:category/write" element={<Write />} />
                <Route path="/board/:category" element={<PostList category=":category"/>} />

                {/* 나머지 경로들 */}
                <Route path="/board/:category/post/:postId" element={<PostDetail />} />

                <Route path="/market" element={<Market />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* 마이페이지 관련 경로 보호 */}
                <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
                <Route path="/mypage/purchase" element={<ProtectedRoute><PurchaseItems /></ProtectedRoute>} />
                <Route path="/mypage/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
                <Route path="/mypage/inquiry/service" element={<ProtectedRoute><InquiryPage /></ProtectedRoute>} />
                <Route path="/mypage/inquiry/advertisement" element={<ProtectedRoute><AdvertisementInquiry /></ProtectedRoute>} />

            </Routes>

            <Footer />
        </Router>
    </ChakraProvider>
);

export default App;
