import { useState } from 'react';
import './updateComment.css'
import { updateComment } from '../../redux/apiCalls/commentApi';
import { useDispatch } from 'react-redux';
const UpdateComment = ({setupdateComment,updateCommentModel}) => {
    const [text, setText] = useState(updateCommentModel.text);
    const dispatch=useDispatch()

    const formSubmitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateComment(updateCommentModel?._id,{text}))
        setupdateComment(false)
        window.location.reload()
    }
  return (
    <div className="update-comment">
    <form onSubmit={formSubmitHandler} className="update-comment-form">
      <abbr title="close">
        <i
          onClick={() => setupdateComment(false)}
          className="bi bi-x-circle-fill update-comment-form-close"
        ></i>
      </abbr>
      <h1 className="update-comment-title">Edit Comment</h1>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        className="update-comment-input"
      />
      <button type="submit" className="update-comment-btn">
        Update Comment
      </button>
    </form>
  </div>
  )
}

export default UpdateComment