import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const host = "http://localhost:5000";

    const [credentials, setcredentials] = useState({email: "", password: ""})
    let navigate = useNavigate();

  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email : credentials.email, password: credentials.password }),
    });

    const json = await response.json();
    // console.log(json);

    if(json.hasOwnProperty("errors")){
        alert("invalid credentials");
    }
    else{
        // save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          aria-describedby="emailHelp"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Login;