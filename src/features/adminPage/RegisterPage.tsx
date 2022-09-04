import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { doRegister, UserRegisterObject } from "./userSlice";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState<UserRegisterObject>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [userLogin]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, username, password, confirmPassword } = userLogin;

    if (
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      name === ""
    ) {
      setError("Fields cannot be empty");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password Should Match");
      return;
    }

    dispatch(doRegister(userLogin));
  };

  return (
    <div>
      Register
      <form onSubmit={onFormSubmit}>
        <div>
          <label>Name</label>
          <input
            required
            placeholder="Name"
            name="name"
            onChange={(e) =>
              setUserLogin({ ...userLogin, name: e.target.value })
            }
          />
        </div>
        <div>
          <label>User name</label>
          <input
            required
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
            type="password"
            required
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setUserLogin({ ...userLogin, password: e.target.value })
            }
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            required
            placeholder="Confirm Password"
            name="confirmpassword"
            onChange={(e) =>
              setUserLogin({ ...userLogin, confirmPassword: e.target.value })
            }
          />
        </div>
        <div>{error}</div>
        <button type="submit">Register</button>
        <button onClick={() => navigate("/login")}>Login</button>
      </form>
    </div>
  );
};

export default RegisterPage;
