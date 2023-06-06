import React, { useEffect } from 'react'
import swal from 'sweetalert';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, fetchAllComments } from '../../redux/apiCalls/commentApi';

export const CommentsTable = () => {
  const {comments} =useSelector(state=>state.comments)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchAllComments())
      },[dispatch])
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId))
      } else {
        swal("Something went wrong!");
      }
    });
  };
  return (
    <div className="table-container">
      <AdminSideBar />
      <div className="table-wrapper">
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((item) => (
              <tr key={item._id}>
                <td>{item?._id}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item?.user?.profilePhoto.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item?.username}</span>
                  </div>
                </td>
                <td>
                  <b>{item?.text}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={()=>deleteCommentHandler(item?._id)}>
                      Delete Comment
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
