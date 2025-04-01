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

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");

  const res = await axios.get(`/users/${id}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const respData = await res.data;
  console.log(respData);
  return respData;
};

export const sendUserAuthRequest = async (authData, signup) => {
  try {
    console.log("Sending request with data:", authData); // ✅ Debug input data

    const response = await axios.post(`/users/${signup ? "signup" : "login"}`, {
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
        showings: data.showings,
        ticketPrice: data.ticketPrice,
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

export const getMoviedetails = async (id) => {
  const res = await axios.get(`/movies/${id}`).catch((err) => {
    console.log(err);
  });
  if (res.status !== 200) {
    return console.log("unexpected error");
  }
  const resData = await res.data;
  return resData;
};
export const deleteMovie = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const res = await axios.delete("/movies/delete", {
      // URL without title
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        // Send the title in the request body
        title: data.title,
      },
    });

    const resData = res.data;
    return resData;
  } catch (err) {
    console.error(err);
    throw err;
  }
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

export const newBooking = async (data) => {
  const res = await axios
    .post("/bookings/bookMovie", {
      movie: data.movie,
      user: locvalStorage.getItem("userId"),
      showingDate,
      seats: bookedSeats,
      totalPrice,
    })
    .catch((err) => console.log(err));
  const resData = await res.data;
  return resData;
};
