import React, { useEffect, useState } from 'react';
import { Post } from '../interfaces/Post';
import { getAllPosts } from '../services/postService';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await getAllPosts();
                setPosts(posts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="post-list">
            <Link to="/create">
                <button>Create New Post</button>
            </Link>
            <h1>Posts</h1>
            {posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                posts.map((post) => <PostItem key={post.postId} post={post} />)
            )}
        </div>
    );
};

export default PostList;
