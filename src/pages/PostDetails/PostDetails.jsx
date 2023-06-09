import './postDetails.css'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import'./postDetails.css'
import { toast  } from 'react-toastify';
import AddComment from '../../components/comments/AddComment';
import CommentList from '../../components/comments/CommentList';
import swal from 'sweetalert';
import UpdatePost from './UpdatePost';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPostDetails, updatePostImage } from '../../redux/apiCalls/postApi';
const PostDetails = () => {
    const { id } = useParams();
    const nav=useNavigate()
    const dispatch=useDispatch()
    const {post} =useSelector((state)=>state.posts)
    const {user} =useSelector((state)=>state.auth)
const [file,setFile]=useState(null)
const [updatePostState,setupdatePost]=useState(false)
    useEffect(()=>{
dispatch(getPostDetails(id))
window.scrollTo(0,0)
    },[dispatch,id])
    const updateImageSubmitHandler = (e) => {
        e.preventDefault();
        if(!file) return toast.warning("there is no file!");
    const formData=new FormData()
    formData.append("image",file)
    dispatch(updatePostImage(formData,post?._id))
      }

      const handleDelete=()=>{
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this Comment!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((isOk) => {
          if (isOk) {
            dispatch(deletePost(post?._id))
            nav('/')
          } else {
            swal("Something went Wrong!");
          }
        })
      }
  return (
    <div className="post-details">
    <div className="post-details-image-wrapper">
      <img 
      loading='lazy'
      src={file ? URL.createObjectURL(file) : post?.image?.url}
        alt=""
        className="post-details-image" />
      {user?._id === post?.user._id&&
      <form  className="update-post-image-form mt-2 mb-5" onSubmit={updateImageSubmitHandler}>
        <label className="update-post-image" htmlFor="file">
        <i className="fa-regular fa-image"></i> select new image
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          name="file"
          id="file"
          onChange={e => setFile(e.target.files[0])}

        />
        <button type="submit">upload</button>
      </form>}
    </div>
    <h1 className="post-details-title">{post?.title}</h1>
    <div className="post-details-user-info">
      <img 
        loading='lazy'
        src={post?.user?.profilePhoto?.url} 
        alt="" 
        className="post-details-user-image" />
      <div className="post-details-user">
        <strong>
          <Link to={`/profile/${post?.user?._id}`}>{post?.user?.username}</Link>
        </strong>
        <span>{new Date (post?.createdAt).toDateString()}</span>
      </div>
    </div>
    <p className="post-details-description">
      {post?.description}
    </p>
    
    <div className="post-details-icon-wrapper">

      {user?._id === post?.user._id || user?.isAdmin?
      <div>
        <i
          onClick={()=>setupdatePost(true)}
          className="bi bi-pencil-square"
        ></i>
        <i  className="bi bi-trash-fill" onClick={handleDelete}></i>
      </div>:""}
    </div>
    {user? <AddComment postId={post?._id}/> :
    <p className='text-center text-danger fw-bolder fs-2'>Please Login to Write Comment</p>
    }
    
    {updatePostState&&<UpdatePost setupdatePost={setupdatePost} post={post}/>}
<CommentList comments={post?.comments}  postId={post?._id}/>
  </div>
  )
}

export default PostDetails