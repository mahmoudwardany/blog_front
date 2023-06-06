import './create-post.css'
import { useEffect, useState } from 'react';
import {  toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { createPost } from '../../redux/apiCalls/postApi';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const CreatePost = () => {

    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const dispatch=useDispatch()
    const {isLoading,isPostCreated} =useSelector((state)=>state.posts)
    const {categories} =useSelector(state=>state.categories)
    const nav=useNavigate()
  const formHandler=(e)=>{
    e.preventDefault()
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");

    const formData=new FormData()
    formData.append('image',file)
    formData.append('title',title)
    formData.append('description',description)
    formData.append('category',category)
  dispatch(createPost(formData))
  }
  console.log(categories)
  useEffect(()=>{
isPostCreated&&nav('/')
  },[nav,isPostCreated])
    return ( 
        <section className='create-post'>
        <h1 className="text-center mt-3">Create Post</h1>
        <form onSubmit={formHandler} className="create-post-form">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Post Title"
          className="create-post-input"
        />
        <select
          className="create-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories?.map((category) => (
          <option value={category.title} key={category._id}>{category.title}</option>
          ))}
        </select>
        <textarea
          className="create-post-textarea"
          placeholder="Post Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        ></textarea>
        <input
          className="create-post-upload"
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          {isLoading?    <ClipLoader
        color={'blue'}
        loading={isLoading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> :"Create"}
        </button>
      </form>
        </section>
     );
}
 
export default CreatePost;