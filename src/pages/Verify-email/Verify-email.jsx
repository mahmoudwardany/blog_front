import { Link, useParams } from "react-router-dom";
import "./verify-email.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";
const Verifyemail = () => {
  const { isVerifiedEmail } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { userId, token } = useParams();
  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  },[userId,token,dispatch]);
  return (
    <section className="verify-email">
      {isVerifiedEmail ? (
        <>
          <i className="bi bi-patch-check verify-email-icon"></i>
          <h1 className="verify-email-title">
            Your email address has been successfully
          </h1>
          <Link to="/login" className="link">
            Go to Log in Page
          </Link>
        </>
      ) : (
        <>
          <h1 className="verify-email-not-found">Your Email Not Found</h1>
        </>
      )}
    </section>
  );
};

export default Verifyemail;
