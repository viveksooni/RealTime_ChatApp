import "react-toastify/dist/ReactToastify.css";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { registerRoute } from "../utils/API_routes";
function Register() {
 const navigate =  useNavigate();
  const toastOption = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const userName = useRef("");
  const email = useRef("");
  const password = useRef("");
  const confirm = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { data } = await axios.post(registerRoute, {
        userName: userName.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      
      if(data.status===false)
      {
        toast.error(data.msg,toastOption);
      }
      if(data.status===true)
      {
        localStorage.setItem(
          "chat-app-user",JSON.stringify(data.user)
        )
      }
      navigate("/");
    }
  };

  const handleValidation = () => {
    if (password.current.value != confirm.current.value) {
      toast.error("password and confirm password should be same", toastOption);
      return false;
    } else if (password.current.value.length < 8) {
      toast.error("password is too sort", toastOption);
      return false;
    } else if (userName.current.value.length < 3) {
      toast.error("User Name is too sort", toastOption);
      return false;
    } else if (email.current.value == "") {
      toast.error("Email is required!!", toastOption);
      return false;
    }
    return true;
  };
  return (
    <>
      <div className="formContainer">
        <form>
          <div className="brand">
            <h1>Register User</h1>
          </div>
          <input type="text" placeholder="Username" ref={userName} />
          <input type="email" placeholder="Email" ref={email} />
          <input type="password" placeholder="Password" ref={password} />
          <input type="password" placeholder="Confirm Password" ref={confirm} />
          <button onClick={handleSubmit}>Create User</button>
          <span>
            Already have an account? <Link to="/login">log-in</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
