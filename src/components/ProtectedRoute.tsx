import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token'); // JWT 토큰 확인

    if (!token) {
        return <Navigate to="/login" replace />; // 토큰이 없으면 로그인 페이지로 리다이렉트
    }

    return <>{children}</>; // 토큰이 있으면 자식 컴포넌트 렌더링
};

export default ProtectedRoute;
