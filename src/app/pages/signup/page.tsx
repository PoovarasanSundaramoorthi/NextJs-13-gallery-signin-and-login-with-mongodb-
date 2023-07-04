"use client";
import { useRouter } from "next/navigation";
// components/SignInForm.js

// components/SignInForm.js

import { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Perform sign-in logic with email and password

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://next-js-13-gallery-signin-and-login-with-mongodb.vercel.app",
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Credentials': "true"
      },       // body: JSON.stringify({ title: "React POST Request Example", name: "Poovarasan" }),
      body: JSON.stringify({ email: email, password: password, userName: userName }),
    };
    fetch("http://localhost:3000/api/login/", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // this.setState({ postId: data.id })
        // router.push("pages/login");
        if (data.status === 201) {
          const headers = data.headers;
          router.push("/pages/login");
        } else {
          alert("User Already Exist");
          setEmail("");
          setUserName("");
          setPassword("");
        }
      });
    // Reset form
    // setEmail("");
    // setPassword("");
  };

  return (
    <section className="height-100">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2 style={{ textAlign: "center", margin: "10px 0px" }}>SignUp</h2>
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="userName"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-button">
          SignUp
        </button>
      </form>
    </section>
  );
};

export default SignInForm;
