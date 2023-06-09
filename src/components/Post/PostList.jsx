import { useSelector } from "react-redux";
import "./post.css";
import PostItem from "./PostItems";
import { SyncLoader } from 'react-spinners';

    const PostList = ({ posts }) => {
    const {isLoading} =useSelector((state)=>state.posts)

  return (
    <div className="post-list">
      {isLoading?<div className='loading'>
            <SyncLoader 
            color="#021ef3" 
            className='loading'   
            size={30}
/>   
        </div>
        :
      posts.map((item) => (
        <PostItem key={item._id} post={item} />
      ))
    }
    </div>
  );
};

export default PostList;