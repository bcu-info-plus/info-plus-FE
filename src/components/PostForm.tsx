import React, { useState } from 'react';
import { createPost } from '../services/postService';
import { Post, BoardType, IsDeleted } from '../interfaces/Post';

const PostForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [boardType, setBoardType] = useState<BoardType>(BoardType.FreeBoard);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newPost: Post = {
            postId: 0,
            title,
            content,
            boardType,
            user: {
                userId: 1, // 임시 사용자 ID (로그인 구현 시 변경 필요)
                email: 'example@example.com',
                nickname: 'exampleUser',
                password: '',
                major: 'Computer Science',
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
