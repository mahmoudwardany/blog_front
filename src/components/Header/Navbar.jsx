import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ toggle, setToggle }) => {
  const {user} =useSelector((state)=>state.auth)

  return (
    <nav
      style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="navbar"
    >
      <ul className="nav-links">
        <Link onClick={() => setToggle(false)} to="/" className="nav-link">
          <i className="fa-solid fa-house"></i>
          Home
        </Link>
        <Link onClick={() => setToggle(false)} to="/posts" className="nav-link">
          <i className="fa-solid fa-note-sticky"></i>
          Posts
        </Link>
        <Link
          onClick={() => setToggle(false)}
          to="/posts/create"
          className="nav-link"
        >
          <i className="fa-solid fa-book"></i>
          Create
        </Link>
        {user?.isAdmin ? (
            <Link
            onClick={() => setToggle(false)}
            to="/admin"
            className="nav-link"
          >
            <i className="fa-solid fa-user-check"></i>
            Admin Dashboard
          </Link>
        ):""}
      
      </ul>
    </nav>
  );
};

export default Navbar;
