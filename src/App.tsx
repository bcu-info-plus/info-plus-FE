import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/create">Create Post</Link>
                        </li>
                    </ul>
                </nav>
                <h1>My Blog</h1>
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/create" element={<PostForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
