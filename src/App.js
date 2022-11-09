import React, {useEffect, useMemo, useRef, useState} from "react";
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
import MyModal from "./components/UI/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";

function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAnsSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [arePostsLoading, setArePostLoading] = useState(false);
    
    useEffect(() => {
        fetchPosts();
    }, []);
    
    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }
    
    async function fetchPosts() {
        setArePostLoading(true);
        const posts = await PostService.getAll();
        setPosts(posts); 
        setArePostLoading(false);
    }
    
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }
    
    return (
        <div className='App'>
            <MyButton style={{marginTop: 20}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {arePostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAnsSearchedPosts} title='Список постов 1'/>
            }
        </div>
    );
}

export default App;
