import React, {useMemo, useRef, useState} from "react";
import Counter from "./components/Counter";
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import postItem from "./components/PostItem";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'аа', body: 'бб'},
        {id: 2, title: 'гг 2', body: 'аа'},
        {id: 3, title: 'вв 3', body: 'яя'}
    ]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    
    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
        return posts;
    }, [filter.sort, posts]);
    
    const sortedAnsSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
    }, [filter.query, sortedPosts]);
    
    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }
    
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }
    
    return (
        <div className='App'>
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <PostList remove={removePost} posts={sortedAnsSearchedPosts} title='Список постов 1'/>
        </div>
    );
}

export default App;
