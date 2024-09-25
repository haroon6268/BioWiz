import axios from "axios";
let baseUrl = "http://localhost:3000/api";
export async function getRequest(path) {}

export async function postRequest(path, options) {
  let response;
  axios
    .post(baseUrl + path, options)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return response;
}
