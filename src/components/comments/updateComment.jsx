import {  useState } from 'react';
import './updateComment.css'
import { useSelector } from 'react-redux';

const UpdateComment = ({setupdateComment,updateCommentModel,onDataReceived}) => {
    const [text, setText] = useState(updateCommentModel.text);
    const {isLoading}=useSelector(state=>state.posts)
    const handleInputChange = (event) => {
      setText(event.target.value);
    };
    const formSubmitHandler = (e) => {
      e.preventDefault();
      onDataReceived(updateCommentModel?._id, text);
      setupdateComment(false);
    };
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