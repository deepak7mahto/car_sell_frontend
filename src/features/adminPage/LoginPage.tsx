import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { doLogin, UserLoginObject } from "./userSlice";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState<UserLoginObject>({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [userLogin]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = userLogin;

    if (username === "" || password === "") {
      setError("Check Username and Password");
      return;
    }

    dispatch(doLogin(userLogin));
  };

  return (
    <div>
      Login
      <form onSubmit={onFormSubmit}>
        <div>
          <label>User name</label>
          <input
            placeholder="User Name"
            name="username"
            onChange={(e) =>
              setUserLogin({ ...userLogin, username: e.target.value })
            }
          />
        </div>
        <div>
          <label>Password</label>
          <input
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setUserLogin({ ...userLogin, password: e.target.value })
            }
          />
        </div>
        <div>{error}</div>
        <button type="submit">Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
