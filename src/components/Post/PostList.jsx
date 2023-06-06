import "./post.css";
import PostItem from "./PostItems";

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((item) => (
        <PostItem key={item._id} post={item} />
      ))}
    </div>
  );
};

export default PostList;