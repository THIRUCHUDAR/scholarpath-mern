const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://scholarpath-mern.vercel.app";

export default API_BASE_URL;
