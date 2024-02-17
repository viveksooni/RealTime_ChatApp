import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { loginRoute } from "../utils/API_routes";
function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  const toastOption = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const userName = useRef("");
  const password = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { data } = await axios.post(loginRoute, {
        userName: userName.current.value,
        password: password.current.value,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    if (password.current.value === "") {
      toast.error("UserName or Password is required!", toastOption);
      return false;
    } else if (userName.current.value === "") {
      toast.error("UserName or Password is required!", toastOption);
      return false;
    }
    return true;
  };
  return (
    <>
      <div className="formContainer">
        <form>
          <div className="brand">
            <h1>Login User</h1>
          </div>

          <input type="text" placeholder="User Name" ref={userName} />
          <input type="password" placeholder="Password" ref={password} />

          <button onClick={handleSubmit}>Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
