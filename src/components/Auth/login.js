import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const make_login = (e) => {
    e.preventDefault();
    const payload = {
      user: {
        email: email,
        password: password,
      },
    };
    const login_url = "http://localhost:3002/login";
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    };
    fetch(login_url, options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  return (
    <form onSubmit={make_login} method="post">
      <input
        type="email"
        placeholder="Enter the email"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter the password"
        value={password}
        password="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

export default Login;
