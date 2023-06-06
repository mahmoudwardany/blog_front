import './post.css'
import { useEffect, useState } from 'react';
import PostList from '../../components/Post/PostList';
import Sidebar from '../../components/Sidebar/Sidebar';
import Pagination from '../../components/pagination/Pagination';
import './post.css'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts,getpostCount} from '../../redux/apiCalls/postApi';
const postsPerPage=3

const Post = () => {
    const {posts,postCount} =useSelector((state)=>state.posts)
    const [currentPage,setCurrentPage]=useState(1)
    const dispatch=useDispatch()

    const pages=Math.ceil(postCount / postsPerPage)
    useEffect(()=>{
        dispatch(getPosts(currentPage))
    window.scrollTo(0,0)
    },[dispatch,currentPage])
    useEffect(()=>{
        dispatch(getpostCount())
    },[dispatch])
    return ( 
        <>
        <section className='posts-page'>
            <PostList posts={posts}/>
            <Sidebar />
        </section>
        <Pagination pages={pages} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        />
        </>
     );
}
 
export default Post;