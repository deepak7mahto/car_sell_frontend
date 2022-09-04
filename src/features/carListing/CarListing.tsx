import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Car, getAllCars } from "./carSlice";

const CarListing = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cars: Car[] = useAppSelector((state) => {
    return state.cars.allCars;
  });

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <div>
      Car Listing
      <div>
        <div>
          <button onClick={() => navigate("/admin")}>Admin</button>
        </div>
        {cars.map((item: Car, index: number) => {
          const { carMake } = item;
          return <div key={index}>{carMake}</div>;
        })}
      </div>
    </div>
  );
};

export default CarListing;
