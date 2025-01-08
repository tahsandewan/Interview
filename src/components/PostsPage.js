import React, { useState, useEffect } from 'react';
import './PostsPage.css';
import { connect } from "react-redux";
import {dataFetch} from "../actions/postAction"
const PostsPage = (props) => {
    useEffect(() => {
        props.dataFetch()
      
      }, []);
    const [posts, setPosts] = useState([]);
  
    console.log("checking_call props",props.data)

  return (
    <div className="container">
      <header className="header">
        <h1>Posts</h1>
      </header>
      <main className="posts">
        {props?.data&& props?.data?.map((post) => (
          <article className="post" key={post?.id}>
            <h2 className="post-title">{post?.title}</h2>
            <p className="post-description">{post?.userId}</p>
          </article>
        ))}
      </main>
    </div>
  );
};


const mapStateToProps = (state) => ({
    data: state.post.data,
    dataLoader: state.post.datafetchLoading,

   
  });
  
  const mapDispatchToProps = (dispatch) => ({
    dataFetch: () => dispatch(dataFetch()),
  
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
  