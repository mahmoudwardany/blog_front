import {  useState } from 'react';
import './updateComment.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateComments } from '../../redux/apiCalls/commentApi';
import { toast } from 'react-toastify';

const UpdateComment = ({setupdateComment,updateCommentModel}) => {
    const [text, setText] = useState(updateCommentModel.text);
    const {isLoading}=useSelector(state=>state.posts)
  const dispatch=useDispatch()

    const handleInputChange = (event) => {
      setText(event.target.value);
    };
    const formSubmitHandler = (e) => {
      e.preventDefault();
      dispatch(updateComments(updateCommentModel._id,{text}))    
      toast.success('comment updated')
      setupdateComment(false);
      interval()
    };
    function interval(){
      const myInterval=setInterval(()=>{
        window.location.reload()
      },2000)
      return () => {
        clearInterval(myInterval);
      };
    }
  return (
    <div className="update-comment">
    <form onSubmit={formSubmitHandler} className="update-comment-form">
      {isLoading?<p>loading....</p>:
      <>
        <abbr title="close">
        <i
          onClick={() => setupdateComment(false)}
          className="bi bi-x-circle-fill update-comment-form-close"
        ></i>
      </abbr>
      <h1 className="update-comment-title">Edit Comment</h1>
      <input
        onChange={handleInputChange}
        value={text}
        type="text"
        className="update-comment-input"
      />
      <button type="submit" className="update-comment-btn">
        Update Comment
      </button>
      </>
      }
     
    </form>
  </div>
  )
}

export default UpdateComment