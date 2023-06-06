import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { addNewCategory } from '../../redux/apiCalls/categoryApi';
import { useDispatch } from 'react-redux';

const AddCategory = () => {
    const [title, setTitle] = useState("");
    const dispatch=useDispatch()
    // From Submit Handler
    const formSubmitHandler = (e) => {
      e.preventDefault();
      if (title.trim() === "") return toast.error("Category Title is required");
  
      dispatch (addNewCategory({ title }));
      setTitle("")
    };
  return (
    <div className="add-category">
    <h6 className="add-category-title">Add New Category</h6>
    <form onSubmit={formSubmitHandler} className="add-category-form">
      <div className="add-category-form-group">
        <label htmlFor="title">Category Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
          placeholder="Enter Category Title"
        />
      </div>
      <button type="submit" className="add-category-btn">
        Add
      </button>
    </form>
  </div>
  )
}

export default AddCategory