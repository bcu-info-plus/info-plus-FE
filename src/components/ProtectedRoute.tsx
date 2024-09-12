import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken'); // Access Token 확인

    if (!accessToken) {
        return <Navigate to="/login" replace />; // Access Token이 없으면 로그인 페이지로 리다이렉트
    }

    return <>{children}</>; // Access Token이 있으면 자식 컴포넌트 렌더링
};

export default ProtectedRoute;
