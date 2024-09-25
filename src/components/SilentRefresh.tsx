import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAccessToken, isTokenExpired, refreshAccessToken } from '../services/TokenService';

const SilentRefresh: React.FC = () => {
    const location = useLocation(); // URL 경로 변경 감지

    useEffect(() => {
        console.log('Current location:', location.pathname);

        const checkAndRefreshToken = async () => {
            const accessToken = getAccessToken();
            console.log('Access Token from localStorage:', accessToken);

            if (accessToken && isTokenExpired(accessToken)) {
                try {
                    await refreshAccessToken();
                    console.log('Access token refreshed successfully');
                } catch (error: any) {
                    // 여기서 error 처리
                    if (error.response && error.response.status === 500) {
                        // 서버에서 UsernameNotFoundException 반환한 경우
                        console.error('User not found, deleting tokens and redirecting to login.');

                        // 토큰 삭제
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');

                        // 로그 출력
                        console.log('Tokens removed. Redirecting to login.');

                        // 로그인 페이지로 리디렉션
                        window.location.href = '/login';
                    } else {
                        console.error('Failed to refresh access token, deleting tokens and redirecting to login.');

                        // 토큰 확인 후 삭제
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');

                        console.log('Tokens removed. Redirecting to login.');
                        window.location.href = '/login'; // 로그인 페이지로 리디렉션
                    }
                }
            }
        };

        checkAndRefreshToken(); // 매번 location이 변경될 때마다 호출
    }, [location]); // location이 변경될 때마다 useEffect 실행

    return null; // UI 렌더링 없이 로직만 처리
};

export default SilentRefresh;
