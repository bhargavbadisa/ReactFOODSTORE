import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logInUser } from './store';
import './Signing.css'; // 👈 Import CSS file

function Signing() {
  let { register, handleSubmit } = useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let myFunc = (data) => {
    dispatch(logInUser(data));
    navigate("/Home");
  }

  return (
    <div className="signing-container">
      <h2 className="signing-title">User Sign In</h2>
      <form className="signing-form" onSubmit={handleSubmit(myFunc)}>
        <input
          className="signing-input"
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        <input
          className="signing-input"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <button className="signing-button" type="submit">Sign In</button>
      </form>
      <p className="signing-footer">
        New user?{" "}
        <Link className="signup-link" to="/SignUp">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Signing;
