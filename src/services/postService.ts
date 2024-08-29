import axios from 'axios';
import { Post } from '../interfaces/Post';

const API_URL = `${process.env.REACT_APP_API_URL}/posts`;

export const getAllPosts = async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>(API_URL);
    return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
    const response = await axios.get<Post>(`${API_URL}/${id}`);
    return response.data;
};

export const createPost = async (post: Post): Promise<Post> => {
    const response = await axios.post<Post>(API_URL, post);
    return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
