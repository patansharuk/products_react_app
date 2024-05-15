import { useEffect, useState } from "react";
import Login from "./components/Auth/login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Products from "./components/Products/products";

const App = () => {
  const [profile_name, setProfileName] = useState("");
  const [message, setMessage] = useState("");
  const [jwtToken, setToken] = useState("");

  useEffect(() => {
    const do_login = () => {
      const login_url = "http://localhost:3002/login";
      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user: {
            email: "sharukhan@webkorps.com",
            password: "123456",
          },
        }),
      };
      fetch(login_url, options)
        .then((res) => {
          console.log(res.headers.get("Authorization"));
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setMessage(data.message);
        });
    };

    // do_login();

    const do_signup = () => {
      const signup_url = "http://localhost:3002/signup";
      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user: {
            email: "sharukhan@webkorps.com",
            password: "123456",
          },
        }),
      };
      fetch(signup_url, options)
        .then((res) => res.json())
        .then((data) => console.log(data));
    };

    // do_signup()
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
