import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { createPost } from '../services/postService';
import { Post, BoardType, IsDeleted } from '../interfaces/Post';

interface DecodedToken {
    userId: number;
    email: string;
    nickname: string;
    major: string;
    // 필요한 경우, 다른 사용자 정보도 추가할 수 있습니다.
}

const PostForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [boardType, setBoardType] = useState<BoardType>(BoardType.FreeBoard);
    const [user, setUser] = useState<DecodedToken | null>(null);

    useEffect(() => {
        // localStorage에서 JWT 토큰을 가져옵니다.
        const token = localStorage.getItem('token');

        if (token) {
            const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
            setUser(decoded);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!user) {
            console.error('User information is not available');
            return;
        }

        const newPost: Post = {
            postId: 0,
            title,
            content,
            boardType,
            user: {
                userId: user.userId,
                email: user.email,
                nickname: user.nickname,
                password: '', // JWT 토큰에서는 비밀번호를 제공하지 않습니다.
                major: user.major,
            },
            localDateTime: new Date().toISOString(),
            isDeleted: IsDeleted.live,
            images: [],
        };

        try {
            const createdPost = await createPost(newPost);
            console.log('Post created successfully:', createdPost);
        } catch (error) {
            console.error('Failed to create post:', error);
        }

        setTitle('');
        setContent('');
        setBoardType(BoardType.FreeBoard);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div>
                <label>Board Type:</label>
                <select value={boardType} onChange={(e) => setBoardType(e.target.value as BoardType)}>
                    <option value={BoardType.FreeBoard}>Free Board</option>
                    <option value={BoardType.QuestionBoard}>Question Board</option>
                </select>
            </div>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default PostForm;
