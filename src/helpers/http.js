import axios from "axios";

const http = () => {
  let options = {
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
      "Content-type": "application/json",

      Accept: "application/json",

      "Access-Control-Allow-Origin": "*",
    },
  };

  if (localStorage.getItem("token")) {
    options.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return axios.create(options);
};

export default http;
