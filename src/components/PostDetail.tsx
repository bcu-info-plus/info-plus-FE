import React, { useEffect, useState } from 'react';
import { getPostById } from '../services/postService';
import { Post } from '../interfaces/Post';
import { useParams } from 'react-router-dom';

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                const post = await getPostById(Number(id));
                setPost(post);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default PostDetail;
