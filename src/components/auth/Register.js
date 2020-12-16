import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setpasswordCheck] = useState();
  const [username, setUsername] = useState();

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const newUser = { email, password, passwordCheck, username };
    await Axios.post("http://localhost:5000/users/register", newUser);
    const loginRes = await Axios.post("http://localhost:5000/users/login", {
      email,
      password,
    });
    setUserData({
        token:loginRes.data.token,
        user: loginRes.data.user
    });
    localStorage.setItem("auth-token", loginRes.data.token);
    history.push("/");
  };

  return (
    <div>
      Register
      <form onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label htmlFor="register-username">Username</label>
        <input
          id="register-username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setpasswordCheck(e.target.value)}
        ></input>

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
