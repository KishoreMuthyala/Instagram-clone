import React, { useState } from "react";
import M from "materialize-css";
import { Link, useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  //const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postData = () => {
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        //console.log(res);
        // console.log(email);
        if (res.message)
          M.toast({ html: res.message, classes: "#e53935 red darken-1" });
        else {
          M.toast({
            html: "signedIn Successfully",
            classes: "#43a047 green darken-1",
          });
          history.push("/");
        }
      });
  };

  return (
    <div>
      <div className="card signin">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Enter Username or Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button class="btn waves-effect waves-light" onClick={postData}>
          Login
        </button>
        <h6>
          Don't have an Account? <Link to="/signup">SignUp</Link>
        </h6>
      </div>
    </div>
  );
};

export default Login;
