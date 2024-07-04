import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import { loginRoute } from "../utils/APIRoutes";
import "../styles/login.css";

function Login(props) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = inputs;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem("userDetails", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { username, password } = inputs;
    if (username === "") {
      toast.error("Username and Password is required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="formContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={logo} alt="Logo" />
            <h1 className="title">Snap</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            min="3"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Do not have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
