import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import './addcomment.css'
import { useDispatch } from 'react-redux'
import { addComment } from '../../redux/apiCalls/commentApi'
const AddComment = ({postId}) => {
    const [text,setText]=useState('')
    const dispatch=useDispatch()
  
    const handleSubmit = useCallback((e) => {
      e.preventDefault()
        text.trim()===""&&toast.error('Must be write something')
        setText("")
        dispatch(addComment({text,postId}))
      
    }, [dispatch,postId,text]);
  return (
    <form className='add-comment my-3' onSubmit={handleSubmit}>
        <input type='text' placeholder='Add Comment'
        className='add-comment-input'
        value={text}
        onChange={(e)=>setText(e.target.value)}
        />
        <button className='addcomment-btn mt-3' type='submit' >Add Comment</button>
    </form>
  )
}

export default AddComment