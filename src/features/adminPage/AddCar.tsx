import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Car } from "../carListing/carSlice";
import { addAdminCar } from "./userSlice";

const AddCar: React.FC = () => {
  const [car, setCar] = useState<Car>({
    carMake: "",
    carModel: "",
    carPictureUrl: "",
    carSalePrice: 0,
    additionalNotes: "",
    carYear: "",
  });

  const dispatch = useAppDispatch();

  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [car]);

  const submitCar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      additionalNotes,
      carMake,
      carModel,
      carPictureUrl,
      carSalePrice,
      carYear,
    } = car;

    if (
      additionalNotes === "" ||
      carMake === "" ||
      carModel === "" ||
      carPictureUrl === "" ||
      carSalePrice === 0 ||
      carYear === ""
    ) {
      console.log(car);

      setError("Please Check Data");
      return;
    }

    dispatch(addAdminCar(car));
  };

  return (
    <div>
      Add Car
      <div>{error}</div>
      <form onSubmit={submitCar}>
        <span>
          <label>Car Make</label>
          <input
            onChange={(e) => {
              setCar({ ...car, carMake: e.target.value });
            }}
          />
        </span>
        <span>
          <label>Car Model</label>
          <input
            onChange={(e) => {
              setCar({ ...car, carModel: e.target.value });
            }}
          />
        </span>
        <span>
          <label>Car Year</label>
          <input
            onChange={(e) => {
              setCar({ ...car, carYear: e.target.value });
            }}
          />
        </span>
        <span>
          <label>Car Picture Url</label>
          <input
            onChange={(e) => {
              setCar({ ...car, carPictureUrl: e.target.value });
            }}
          />
        </span>
        <span>
          <label>Car Sale Price</label>
          <input
            type="number"
            onChange={(e) => {
              setCar({ ...car, carSalePrice: parseInt(e.target.value) });
            }}
          />
        </span>
        <span>
          <label>Car Additonal Notes</label>
          <textarea
            onChange={(e) => {
              setCar({ ...car, additionalNotes: e.target.value });
            }}
          />
        </span>
        <button>Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
