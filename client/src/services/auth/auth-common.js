import axios from "axios";
import authHeader from "./auth/auth.header";

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: authHeader()
});