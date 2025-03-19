import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios.get("/movies/getMovies").catch((err) => {
    console.log(err);
  });
  if (res.status !== 200) {
    return console.log("No data");
  }
  const data = await res.data;
  return data;
};

export const sendUserAuthRequest = async (authData, signup) => {
  try {
    console.log("Sending request with data:", authData); // ✅ Debug input data

    const response = await axios.post(`/user/${signup ? "signup" : "login"}`, {
      username: signup ? authData.username : "",
      email: authData.email,
      password: authData.password,
    });

    console.log("API Response:", response); // ✅ Debug full response

    if (!response.data) {
      throw new Error("No data received from API");
    }

    return response.data; // ✅ Ensure valid data is returned
  } catch (error) {
    console.error("API Request Error:", error.response?.data || error.message);
    return null; // Return null if there's an error
  }
};
export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movies/add",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    )
    .catch((err) => console.log(err));
  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected error occurred.");
  }
  const resData = await res.data;
  return resData;
};
