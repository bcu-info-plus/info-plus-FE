// src/components/SilentRefresh.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAccessToken, isTokenExpired, refreshAccessToken } from '../services/TokenService';

const SilentRefresh: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            const accessToken = getAccessToken();

            if (accessToken && isTokenExpired(accessToken)) {
                try {
                    await refreshAccessToken();
                    console.log('Access token refreshed successfully');
                } catch (error) {
                    console.error('Failed to refresh access token, redirecting to login');
                    window.location.href = '/login'; // 로그인이 필요하면 로그인 페이지로 이동
                }
            }
        };

        checkAndRefreshToken();
    }, [location]); // location이 변경될 때마다 실행

    return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default SilentRefresh;
