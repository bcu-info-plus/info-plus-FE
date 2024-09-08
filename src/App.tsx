import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Questions from './components/Questions/Questions';
import Free from './components/Free/Free';
import Tips from './components/Tips/Tips';
import Market from './components/Market/Market';
import MyPage from './components/MyPage/MyPage';
import Footer from "./components/Footer";

const App: React.FC = () => (
    <ChakraProvider> {/* Wrap app with ChakraProvider */}
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/free" element={<Free />} />
                <Route path="/tips" element={<Tips />} />
                <Route path="/market" element={<Market />} />
                <Route path="/mypage" element={<MyPage />} />
            </Routes>
            <Footer />
        </Router>
    </ChakraProvider>
);

export default App;
