import { User } from './User';
import { Image } from './Image';

export enum BoardType {
    QuestionBoard = 'QuestionBoard',
    FreeBoard = 'FreeBoard',
}

export enum IsDeleted {
    deleted = 'deleted',
    live = 'live',
}

export interface Post {
    postId: number;
    boardType: BoardType;
    user: User;
    title: string;
    content: string;
    localDateTime: string; // ISO 형식의 문자열로 표현
    isDeleted: IsDeleted;
    images?: Image[] | null; // images 필드를 nullable로 설정
}
