import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Check if login was successful
        if (response.ok) {
            const body = await response.json();
            localStorage.setItem('token', body.token);
            console.log("Data:", data); // <-- Add this line
            navigate('/success', {
                state: { 
                    username: data.username, 
                    email: data.email 
                }
            });
        } else {
            console.log('Login failed!');
        }
    };

    return (
        <div className="section">
            <div className="container">
                <div className="form-title">
                    <h2>Login</h2>
                </div>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-text">
                        <label htmlFor="email">Enter Email</label>
                        <input type="email" {...register("email", { required: true })} id="email" placeholder="Enter email"
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email?.type === 'required' && <p style={{ fontSize: '12px', color: 'red' }} role="alert">Email is required</p>}
                    </div>
                    <div className="input-text">
                        <label htmlFor="password">Enter Password</label>
                        <input type="password" {...register("password", { required: true })} id="password" placeholder="Enter password"
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password?.type === 'required' && <p style={{ fontSize: '12px', color: 'red' }} role="alert">Password is required</p>}
                    </div>
                    <div className="forgot-pass">
                        <a href="#/" className="forgot">Forgot Password ?</a>
                    </div>
                    {/* {errorMessage && <p style={{ paddingLeft: '10px' }}>{errorMessage}</p>} */}
                    <div className="form-btn">
                        <button type="submit" className="btn">Login</button>
                    </div>
                </form>
                <div className="divider">
                    <p>OR</p>
                </div>
                <div className="login-wrapper">
                    <button type="submit" onClick={() => navigate("/register")} className="btn-secondary-login">Register</button>
                </div>
            </div>

            <div className="image-container">
                <div className="image-wrapper">
                    <h3 className="text-pic">
                        LMS
                    </h3>
                    <p className="text-screen">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
        </div>
    )
}