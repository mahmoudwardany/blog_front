import './adminSide.css'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <section className='admin-sidebar'>
        <Link className='admin-sidebar-title'to='/admin'>
        <i className='bi bi-columns'></i>

          Admin</Link>
      <ul className='admin-sidebar-list'>
          <Link to='/dashboard/admin/users' className='admin-sidebar-link'>
          <i className='bi bi-person'></i>
            Users</Link>
          <Link to='/dashboard/admin/posts' className='admin-sidebar-link'>
          <i className='bi bi-file-post'></i>
            Posts</Link>
          <Link to='/dashboard/admin/categories'className='admin-sidebar-link'>
          <i className='bi bi-tag-fill'></i>   
          Categories</Link>
          <Link to='/dashboard/admin/comments'className='admin-sidebar-link'>
          <i className='bi bi-chat-left-text'></i>
            
            Comments</Link>
      </ul>

    </section>
  )
}

export default AdminSideBar