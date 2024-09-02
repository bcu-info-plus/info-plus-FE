// components/PostCard.tsx
import React from 'react';
import { Post } from '../interfaces/Post';

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div className="post-card">
            <div className="post-header">
                <span className="post-author">{post.user.nickname}</span> {/* Assuming User has a name field */}
                <span className="post-category">{post.boardType === 'QuestionBoard' ? '질문 게시판' : '자유 게시판'}</span>
            </div>
            <div className="post-body">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
            </div>
            <div className="post-footer">
                <span>{new Date(post.localDateTime).toLocaleString()}</span>
                {post.isDeleted === 'deleted' && <span>(Deleted)</span>}
            </div>
            <div className="post-images">
                {post.images && post.images.length > 0 ? (
                    post.images.map((image, index) => (
                        <img key={index} src={image.imageUrl} alt={`Image ${index + 1}`}/>
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>
        </div>
    );
};

export default PostCard;
