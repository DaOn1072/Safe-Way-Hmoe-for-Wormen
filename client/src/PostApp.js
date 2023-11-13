import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostMain from './page/post/PostMain';
import PostView from './page/post/PostView';

function PostApp() {
  return (
    <div className="PostApp">
      <Routes>
        <Route path='/post/:no' element={<PostView />} />
        <Route path='/' element={<PostMain />} />
      </Routes>
    </div>
  );
}

export default PostApp;