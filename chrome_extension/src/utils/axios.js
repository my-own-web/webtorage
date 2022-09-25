import axios from "axios";

export const TodoApi = axios.create({
    //baseURL: process.env.NODE_ENV === "development" ? "http://localhost:3001/api" : "/api"
    baseURL: "http://localhost:3001/api",
    withCredentials: true
});