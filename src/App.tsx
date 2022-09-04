import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import PrivateRoute from "./app/PrivateRoute";
import AdminPage from "./features/adminPage/AdminPage";
import LoginPage from "./features/adminPage/LoginPage";
import RegisterPage from "./features/adminPage/RegisterPage";
import { clearMessage, clearRedirect } from "./features/adminPage/userSlice";
import CarListing from "./features/carListing/CarListing";

let timeOut: any;

function App() {
  const message = useAppSelector((state) => state.user.message);
  const redirect = useAppSelector((state) => state.user.redirect);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    timeOut = setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [message]);

  useEffect(() => {
    if (redirect !== "") {
      navigate(redirect.toString());
      dispatch(clearRedirect());
    }
  }, [redirect]);

  // const state = useAppSelector((state) => state);

  // console.log({ state });

  return (
    <div className="App">
      {message}
      <Routes>
        <Route path="/" element={<CarListing />} />
        <Route path="/admin" element={<PrivateRoute component={AdminPage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
