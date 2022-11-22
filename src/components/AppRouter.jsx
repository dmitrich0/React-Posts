import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";

const AppRouter = () => {
    return (
        <Routes> 
            <Route exact path='' element={<Posts/>}/>
            <Route path="/about" element={<About/>}/>
            <Route exact path="/posts" element={<Posts/>}/>
            <Route path="/error" element={<Error/>}/>
            <Route exact path="/posts/:id" element={<PostIdPage/>}/>
            <Route path="/*" element={<Navigate to="/error" replace />} />
        </Routes>
    );
};

export default AppRouter;