import React, { useEffect } from 'react'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getAllCategories } from '../../redux/apiCalls/categoryApi';
import Table from 'react-bootstrap/Table';

const CategoriesTable = () => {
  const {categories} =useSelector(state=>state.categories)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getAllCategories())
      },[dispatch])
  const deleteCategoryHandler = (catId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
          dispatch(deleteCategory(catId))
      } else {
        swal("Something went wrong!");
      }
    });
  };
  return (
    <div className="table-container">
    <AdminSideBar />
    <div className="table-wrapper">
      <h1 className="table-title">Categories</h1>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Number</th>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories?.map((item)=>(
          <>
          <tr key={item._id}>
            <td>{item?._id}</td>
          <td>{item.title}</td>
          <td>
        <button className='btn btn-danger'
        onClick={()=>deleteCategoryHandler(item._id)}
        >Delete Category</button>
</td>
        </tr>
          </>
        ))}
        
      </tbody>
    </Table>
    </div>
  </div>
  )
}

export default CategoriesTable