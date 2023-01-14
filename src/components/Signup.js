import React , {useState} from "react";
import { useNavigate } from "react-router-dom";


const Signup = (props) => {
  const host = "http://localhost:5000";

  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: ""
  });

  let navigate = useNavigate();


  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password, cpassword} = credentials;

    if(password !== cpassword)
    {
      return alert("passwords do not match");
    }

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password})
    });

    const json = await response.json();
    // console.log(json);

    if(json.hasOwnProperty("errors")){
        props.showAlert("error occoured", "danger");
    }
    else{
        // save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        navigate('/');
        props.showAlert("Acount created successfully", "success");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          aria-describedby="nameHelp"
          id="name"
          name="name"
          onChange={handleChange}
        />
      </div>

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
          minLength={5}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          name="cpassword"
          id="cpassword"
          value={credentials.cpassword}
          onChange={handleChange}
          minLength={5}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Signup;
