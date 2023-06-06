import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderRight = () => {
  const nav=useNavigate()
  const {user} =useSelector((state)=>state.auth)
const[dropDown,setDown]=useState(false)
const dispatch=useDispatch()
const logoutHandler=()=>{
dispatch(logoutUser())
nav('/login')
setDown(false)
}
  return (
    <div className="header-right">
      {user? (
      <>
      <div className="header-right-user-info">
      <span className="header-right-username"
      onClick={()=>setDown(prev => !prev)}
      >
        {user?.username}
        </span>
<img src={user?.profilePhoto.url} className="header-right-user-photo" alt={user.username}/>
{dropDown&&<div className="header-right-dropdown"

>
  <Link className="header-dropdown-item"
  to={`/profile/${user?._id}`}
  onClick={()=>setDown(false)}
  >
    <i className="bi bi-file-person"></i>
    <span>Profile</span>
  </Link>
<div className="header-dropdown-item" onClick={logoutHandler}>
    <i className="bi bi-box-arrow-in-left"></i>
    <span>Logout</span>
</div>
</div>}

      </div>
      </>
      )
      :(
        <>
          <Link className="header-right-link" to="/login">
        <i className="bi bi-box-arrow-in-right"></i>
        <span>Login</span>
      </Link>
      <Link className="header-right-link" to="/register">
        <i className="bi bi-person-plus"></i>
        <span>Register</span>
      </Link>
      </>
      )}
    
    </div>
  );
};

export default HeaderRight;
