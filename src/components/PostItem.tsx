import React from 'react';
import { Post } from '../interfaces/Post';

interface PostItemProps {
    post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    return (
        <div className="post-item">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Posted by: {post.user.nickname}</p>
            <p>Email: {post.user.email}</p>
            <p>Major: {post.user.major}</p>
            <p>Date: {new Date(post.localDateTime).toLocaleString()}</p>
            <p>Status: {post.isDeleted === 'deleted' ? 'Deleted' : 'Active'}</p>
            <p>Board Type: {post.boardType === 'QuestionBoard' ? 'Question Board' : 'Free Board'}</p>
            {post.images.length > 0 && (
                <div className="images">
                    <h3>Images:</h3>
                    <ul>
                        {post.images.map((image) => (
                            <li key={image.imageId}>
                                <img src={image.imageUrl} alt={`Image ${image.imageId}`} />
                                <p>Board Type: {image.boardType}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PostItem;
