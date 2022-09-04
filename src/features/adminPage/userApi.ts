import axios from "axios";
import { rootUrl } from "../../utils";
import { Car } from "../carListing/carSlice";
import {
  UserLoginObject,
  UserRegisterObject,
  UserRegisterResponse,
  UserLoginResponse,
  AddAdminCarResponse,
} from "./userSlice";

export function doLoginApi(data: UserLoginObject): Promise<UserLoginResponse> {
  return new Promise<UserLoginResponse>(async (resolve, reject) => {
    try {
      const { username, password } = data;
      let response = await axios.post(
        rootUrl + "/api",
        {
          query: `mutation {  loginUser( username : "${username}" , password :  "${password}" ) { message token user { userName name } }}`,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      resolve(response.data.data.loginUser);
    } catch (error) {
      console.log(error);
      reject("error");
    }
  });
}

export function doRegisterApi(
  data: UserRegisterObject
): Promise<UserRegisterResponse> {
  return new Promise<UserRegisterResponse>(async (resolve, reject) => {
    try {
      const { username, password, name } = data;
      let response = await axios.post(
        rootUrl + "/api",
        {
          query: `mutation {  registerUser(name :  "${name}" , username : "${username}" , password :  "${password}" ) {    userName    message  }}`,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      resolve(response.data.data.registerUser);
    } catch (error) {
      console.log(error);
      reject("error");
    }
  });
}

export function getAdminCarsApi() {
  return new Promise(async (resolve, reject) => {
    try {
      let token: string = localStorage.getItem("token") || "";

      let response = await axios.post(
        rootUrl + "/api",
        {
          query:
            "{ adminCars { id carMake carModel carYear carPictureUrl carSalePrice additionalNotes addedBy sold __typename }}",
        },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      );

      resolve(response.data.data.adminCars);
    } catch (error) {
      console.log(error);
      reject("error");
    }
  });
}

export function addAdminCarApi(car: Car) {
  return new Promise<AddAdminCarResponse>(async (resolve, reject) => {
    try {
      let token: string = localStorage.getItem("token") || "";

      const {
        additionalNotes,
        carMake,
        carModel,
        carPictureUrl,
        carSalePrice,
        carYear,
      } = car;

      let response = await axios.post(
        rootUrl + "/api",
        {
          query: `mutation {  addAdminCar( carMake :  "${carMake}", additionalNotes : "${additionalNotes}" , carModel : "${carModel}" , carPictureUrl :  "${carPictureUrl}", carSalePrice : ${carSalePrice}, carYear : "${carYear}" ) {  message  }}`,
        },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      );

      resolve(response.data.data.message);
    } catch (error) {
      console.log(error);
      reject("error");
    }
  });
}

export function updateAdminCar() {
  return new Promise((resolve, reject) => {
    try {
      resolve("");
    } catch (error) {
      console.log(error);
      reject("error");
    }
  });
}

export function deleteAdminCar() {
  return new Promise((resolve, reject) => {
    try {
      resolve("");
    } catch (error) {
      console.log(error);
      reject("error");
    }
  });
}
