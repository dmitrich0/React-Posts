import React, {useEffect, useState} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";


function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAnsSearchedPosts = usePosts(posts, filter.sort, filter.query);
    
    const [fetchPosts, arePostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })
    
    useEffect(() => {
        fetchPosts(limit, page);
    }, []);
    
    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }
    
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }
    
    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page);
    }
    
    return (<div className='App'>
            <MyButton style={{marginTop: 20}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError && <h1>Произошла ошибка ${postError}</h1>}
            {arePostsLoading ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div> :
                <PostList remove={removePost} posts={sortedAnsSearchedPosts} title='Список постов 1'/>}
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}/>
        </div>);
}

export default Posts;
