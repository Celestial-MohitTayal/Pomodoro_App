import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    // const { token } = useSelector((state) => state.auth);
    navigate('/home');
  };

  // useEffect(() => {
  //   console.log("Token updated:", token);
  //   if (token) {
  //     navigate("/home"); // Redirect to home after successful login
  //   }
  // }, [token, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" {...register("email")} required />
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        required
      />
      <button type="submit" disabled={loading}>
        Login
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
