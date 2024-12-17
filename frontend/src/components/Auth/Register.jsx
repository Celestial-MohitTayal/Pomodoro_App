import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../store/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    navigate('/home');
  };

  // useEffect(() => {
  //   console.log('Token updated:', token);
  //   if (token) {
  //     navigate('/home'); // Redirect to home after successful login
  //   }
  // }, [token, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
      <input type="text" placeholder="Name" {...register('name')} required />
      <input type="email" placeholder="Email" {...register('email')} required />
      <input type="password" placeholder="Password" {...register('password')} required />
      <button type="submit" disabled={loading}>Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
