import './adminDash.css'
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminMain from "./AdminMain";

const AdminDashboard = () => {
    return ( 
        <section className="admin-dashboard">
        <AdminSideBar  />
        <AdminMain />
      </section>
     );
}
 
export default AdminDashboard;