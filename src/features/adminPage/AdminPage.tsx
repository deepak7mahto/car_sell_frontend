import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AddCar from "./AddCar";
import { getAdminCars, doLogOut } from "./userSlice";

const AdminPage: React.FC = () => {
  const name = useAppSelector((state) => state.user.user.name);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAdminCars());
  }, []);

  return (
    <div>
      Admin Page
      <div>
        <button onClick={() => navigate("/")}>Home</button>
        <button
          onClick={() => {
            dispatch(doLogOut());
          }}
        >
          Logout
        </button>
      </div>
      <div>Hello {name}</div>
      <div>
        <AddCar />
      </div>
    </div>
  );
};

export default AdminPage;
