import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import Register from './components/Register';
import Login from './components/Login';
import PostCard from './components/PostCard';
import { Post, BoardType, IsDeleted } from './interfaces/Post';
import './App.css';  // Import the CSS file

const App: React.FC = () => {
    // Sample data
    const posts = [
        {
            postId: 1,
            boardType: BoardType.QuestionBoard,
            user: {
                userId: 1,
                nickname: 'JohnDoe',
                email: 'john@example.com',
                password: 'securePassword123',
                major: 'Computer Science',
            },
            title: '첫 번째 질문',
            content: '첫 번째 질문 내용',
            localDateTime: '2024-08-30T14:30:00Z',
            isDeleted: IsDeleted.live,
        },
        {
            postId: 2,
            boardType: BoardType.QuestionBoard,
            user: {
                userId: 2,
                nickname: 'JohnDoe2',
                email: 'john2@example.com',
                password: 'securePassword1234',
                major: 'Computer Science',
            },
            title: '두 번째 질문',
            content: '두 번째 질문 내용',
            localDateTime: '2024-08-29T14:30:00Z',
            isDeleted: IsDeleted.live,
        }
    ]
    return (
        <Router>
            <div className="App">
                <header className="app-header">
                    <div className="logo">
                        <Link to="/"><img src={`${process.env.PUBLIC_URL}/images/로고.png`} alt="logo"/></Link>
                    </div>
                    <nav className="main-nav">
                        <ul>
                        <li><Link to="/question-board">질문 게시판</Link></li>
                            <li><Link to="/free-board">자유 게시판</Link></li>
                            <li><Link to="/tips">Tip&해설 공유</Link></li>
                            <li><Link to="/market">장터</Link></li>
                            <li><Link to="/mypage">마이페이지</Link></li>
                        </ul>
                    </nav>
                    <div className="profile-icon">
                        <Link to = "/mypage"><img src={`${process.env.PUBLIC_URL}/images/profile_green.png`} alt="Profile"/></Link>
                    </div>
                </header>

                <main className="content">
                    <section className="popular-posts">
                        <h2>인기 게시물</h2>
                        <div className="post-list">
                            {posts.map((post) => (
                                <PostCard key={post.postId} post={post}/>
                            ))}
                        </div>
                    </section>

                    <section className="latest-posts">
                        <h2>최신 게시물</h2>
                        <div className="post-list">
                            {posts.map((post) => (
                                <PostCard key={post.postId} post={post}/>
                            ))}
                        </div>
                    </section>


                    <section className="banners">
                        {/* Image banners can be added here */}
                        <img src= {`${process.env.PUBLIC_URL}/images/banner1.png`} alt="Banner 1" className="banner"/>
                        <img src= {`${process.env.PUBLIC_URL}/images/banner2.png`} alt="Banner 2" className="banner"/>
                        <img src= {`${process.env.PUBLIC_URL}/images/banner3.png`} alt="Banner 3" className="banner"/>
                    </section>
                </main>
            </div>
        </Router>
    );
};

export default App;
