import axios from "axios";
import { rootUrl } from "../../utils";
import { Car } from "./carSlice";

export async function getAllCarsApi(): Promise<Car[]> {
  try {
    let response = await axios.post(
      rootUrl + "/api",
      {
        query:
          "{ cars { id carMake carModel carYear carPictureUrl carSalePrice additionalNotes addedBy sold __typename }}",
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data.data.cars;
  } catch (error) {
    console.log(error);
  }
  return [];
}
