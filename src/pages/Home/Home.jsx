import { Link } from "react-router-dom";
import PostList from "../../components/Post/PostList";
import Sidebar from "../../components/Sidebar/Sidebar";
import './home.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  getPosts } from "../../redux/apiCalls/postApi";
const Home = () => {
    const dispatch=useDispatch()
    const {posts} =useSelector((state)=>state.posts)
    useEffect(()=>{
dispatch(getPosts(1))
    },[dispatch])
    return (
        <section className="home">
            <div className="home-hearo-header">
                <div className="home-hero-header-layout">
                    <h1 className="home-title">Welcome to Blog</h1>
                </div>
            </div>
            <div className="home-latest-post">Latest Posts</div>
            <div className="home-container">
                <PostList posts={posts} />
                <Sidebar />
            </div>
            <div className="home-see-posts-link">
                <Link className="home-link" to="/posts">
                    See All Posts
                </Link>
            </div>
        </section>
    );
};

export default Home;
