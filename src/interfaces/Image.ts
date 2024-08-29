import { Post } from './Post';
import { BoardType } from './Post';

export interface Image {
    imageId: number;
    post: Post;
    boardType: BoardType;
    imageUrl: string;
}
