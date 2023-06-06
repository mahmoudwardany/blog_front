import "./admintable.css"
import { Link } from "react-router-dom";
import swal from "sweetalert";
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePost, fetchAllPosts } from "../../redux/apiCalls/postApi";

const PostsTable = () => {
  const {posts} =useSelector(state=>state.posts)
  console.log(posts)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchAllPosts())
      },[dispatch])
   // Delete Post Handler
    const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(postId))
      } else {
        swal("Something went wrong!");
      }
    });
  };

  return (
    <div className="table-container">
      <AdminSideBar />
      <div className="table-wrapper">
        <h1 className="table-title">Posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item?.user?.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item?.user?.username}</span>
                  </div>
                </td>
                <td>
                  <b>{item?.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/posts/details/${item?._id}`}>View Post</Link>
                    </button>
                    <button onClick={()=>deletePostHandler(item?._id)}>Delete Post</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostsTable;