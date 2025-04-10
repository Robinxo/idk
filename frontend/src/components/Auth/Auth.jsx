import React from "react";
import AuthForm from "./AuthForm.jsx";
import { sendUserAuthRequest } from "../../Api-helper/api-helpers.js";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";

const Auth = () => {
  const dispatch = useDispatch();

  const onResReceived = (data) => {
    if (!data) {
      console.error("Error: Received null or undefined data from API");
      alert("User not found");
      return;
    }

    console.log("Received Data:", data);

    dispatch(userActions.login());

    if (data.id) {
      localStorage.setItem("userId", data.id);
    } else {
      console.error("Error: `id` is missing in API response");
    }
    
    // Store the token in localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
      console.log("Token stored in localStorage");
    } else {
      console.error("Error: `token` is missing in API response");
    }
  };

  const getData = (data) => {
    console.log("Calling API with:", data);

    sendUserAuthRequest(data.inputs, data.isSignup) // Pass the signup flag.
      .then(onResReceived)
      .catch((err) => {
        console.error("API Call Failed:", err);
      });
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
