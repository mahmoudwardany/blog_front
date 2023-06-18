import React, { useEffect, useState } from 'react'
import './profile.css'
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import UpdateProfileModal from './UpdateProfileModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile, getProfile, uploadPhotoProfile } from '../../redux/apiCalls/profileApi';
import PostItem from '../../components/Post/PostItems';
import ClipLoader from "react-spinners/ClipLoader";
import { logoutUser } from '../../redux/apiCalls/authApiCall';

const Profile = () => {
  const {user} =useSelector((state)=>state.auth)
  
  const {id}=useParams()
  const dispatch=useDispatch()
    const [updateProfile, setUpdateProfile] = useState(false);
    const [file, setFile] = useState(null)
    const {profile,isPrfoileDeleted,isLoading} =useSelector((state)=>state.profile)
    const nav=useNavigate()
    useEffect(() => {
dispatch(getProfile(id))
      window.scrollTo(0, 0);
      }, [dispatch,id]);

      const formSubmitHandler = (e) => {
        e.preventDefault();
        if(!file) return toast.warning("there is no file!");
        const formData=new FormData();
        formData.append("image",file&&file)
        dispatch(uploadPhotoProfile(formData))
      }
        // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id))
        dispatch(logoutUser())
      } 
    });
  }
  useEffect(()=>{
    if(isPrfoileDeleted) {
        nav('/')
    }

  },[isPrfoileDeleted,nav])
console.log(profile,'profile')
console.log(user,'user')
  return (
    <section className="profile">
    <div className="profile-header">
      <div className="profile-image-wrapper">
        <img 
      loading='lazy'
        src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url} 
        alt="" 
        className="profile-image mb-5" />
        {user?._id === profile?._id&&
        <form onSubmit={formSubmitHandler}>
        <abbr title="choose profile photo">
          <label
            htmlFor="file"
            className="fa-solid fa-camera upload-profile-photo-icon "
            style={{color:"#2850a0"}}
          ></label>
        </abbr>
          <input
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
            onChange={e => setFile(e.target.files[0])}
          />
          <button type="submit" className="upload-profile-photo-btn">upload</button>
        </form>
}
      </div>
      <h1 className="profile-username mt-3">{profile?.username} 
      </h1>
      {user?.isAdmin=== profile?.isAdmin?<span className=' admin'>Admin</span> :"User"}
      <p className="profile-bio">
        {profile?.bio}
      </p>
      <div className="user-date-joined">
        <strong>Date Joined: </strong>
        <span>{new Date (profile?.createdAt).toDateString()}</span>
      </div>
      {user?._id === profile?._id&&
      <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
        <i className="fa-solid fa-user"></i>
        Update Profile
      </button>
}
    </div>
    <div className="profile-posts-list">
      <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
      {profile?.posts?.map((post)=>(
        <PostItem 
        key={post._id}
        post={post}
        username={profile?.username}
        userId={profile?._id}
        />
      ))}
    </div>
    {user?._id === profile?._id&&
      
    <button onClick={deleteAccountHandler} className="delete-account-btn">
        {isLoading?    
          <ClipLoader
          color={'dark'}
          loading={isLoading}
          size={120}
          aria-label="Loading Spinner"
          data-testid="loader"
        />:"Delete Account"}
    </button>
}
    {updateProfile && <UpdateProfileModal setUpdateProfile={setUpdateProfile} profile={profile}/>}
  </section>
  )
}

export default Profile