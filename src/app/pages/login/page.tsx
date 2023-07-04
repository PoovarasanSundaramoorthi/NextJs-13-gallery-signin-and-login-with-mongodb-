// components/LoginForm.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Perform login logic with email and password
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://next-js-13-gallery-signin-and-login-with-mongodb.vercel.app",
        Cors: "true",
      },      // body: JSON.stringify({ title: "React POST Request Example", name: "Poovarasan" }),
      body: JSON.stringify({ email: email, password: password }),
    };
    fetch("http://localhost:3000/api/login/", requestOptions)
      .then((response) => response.json())
      .then(
        async (data) => {
          const login = data.login;
          if (data.status === 201) {
            await localStorage.setItem("token", login?.token);
            router.push("/pages/gallery");
          } else {
            alert("User doesn't Exist");
            setEmail("");
            setPassword("");
          }
        }
        // this.setState({ postId: data.id })
      );
    // Reset form
    // setEmail("");
    // setPassword("");
    // router.push("/pages/gallery");
  };

  // const changePath = () => {
  //   console.log("first");
  //   return <Link href="/SignInForm">Dashboard</Link>;
  // };

  return (
    <div className="login-form-container">
      {/* <form onSubmit={handleSubmit} className="login-form"> */}
      <form onSubmit={handleSubmit} className="login-form">
        <h2 style={{ marginBottom: 25, textAlign: "center" }}>Login</h2>
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
          Login
        </button>
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "10px", color: "blue" }}>
          <Link href="/pages/signup">SignUp</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
