import  axios from "axios";

export const getAllMovies = async () => {
    const res = await axios.get("/movies/getMovies")
    .catch((err) => {
        console.log(err)
    })
    if(res.status !== 200) {
        return console.log("No data")
    }
    const data = await res.data;
    return data;
};

export const sendUserAuthRequest = async (authData, signup) => {
    try {
        console.log("Sending request with data:", authData); // ✅ Debug input data

        const response = await axios.post(
            `/user/${signup ? "signup" : "login"}`,{
            username: signup ? data.username : "",
            email: data.email,
            password: data.password
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
