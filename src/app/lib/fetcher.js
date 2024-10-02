import axios from "axios";
let baseUrl = "http://localhost:3000/api";

export async function postRequest(path, options) {
  try {
    let res = await axios.post(baseUrl + path, options);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getRequest(path, options) {
  try {
    const req = await axios.get(baseUrl + path, {
      ...options,
      withCredentials: true,
    });
    return req;
  } catch (err) {
    return err;
  }
}
