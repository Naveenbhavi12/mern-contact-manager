import axios from "axios";

export const api = axios.create({
  baseURL: "https://mern-contact-manager-wzuw.onrender.com/api"
});
