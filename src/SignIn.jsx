import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logInUser } from './store';
import './SignIn.css';

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(logInUser(data));
    setTimeout(() => {
      setLoading(false);
      navigate("/Home");
    }, 1000); // Simulating API delay
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">User Sign In</h2>
      <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="signin-input"
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <span className="error">{errors.username.message}</span>}

        <div className="password-container">
          <input
            className="signin-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <span className="error">{errors.password.message}</span>}

        <button className="signin-button" type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <p className="signin-footer">
        New user?{" "}
        <Link className="signup-link" to="/SignUp">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
