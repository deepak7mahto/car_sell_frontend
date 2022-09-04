import axios from "axios";
import { resolve } from "path";
import { rootUrl } from "../../utils";
import {
  UserLoginObject,
  UserRegisterObject,
  UserRegisterResponse,
  UserResponse,
} from "./userSlice";

export function doLoginApi(data: UserLoginObject): Promise<UserResponse> {
  return new Promise<UserResponse>((resolve, reject) => {
    try {
      const { username, password } = data;
      const response: UserResponse = { token: "" };
      resolve(response);
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
          query: `mutation {\n  registerUser(name : \"${name}\", username :\"${username}\", password : \"${password}\") {\n    userName\n    message\n  }\n}\n`,
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

export function getAdminCars() {
  return new Promise((resolve, reject) => {
    try {
      resolve([]);
    } catch (error) {
      console.log(error);
      reject("error");
    }
  });
}

export function addAdminCar() {
  return new Promise((resolve, reject) => {
    try {
      resolve("");
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
