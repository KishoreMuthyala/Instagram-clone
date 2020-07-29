import React, { useState } from "react";
import M from "materialize-css";
import { Link, useHistory } from "react-router-dom";
const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postData = () => {
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          M.toast({ html: "Invalid email", classes: "#e53935 red darken-1" });
          return;
        }
        if (res.error)
          M.toast({ html: res.error, classes: "#e53935 red darken-1" });
        else {
          M.toast({ html: res.message, classes: "#43a047 green darken-1" });
          history.push("/signin");
        }
      });
  };
  return (
    <div>
      <div className="card signin">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Email"
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
          SignUp
        </button>
        <h6>
          Already have an Account? <Link to="/signin">Signin</Link>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
