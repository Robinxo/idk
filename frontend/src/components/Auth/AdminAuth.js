import React from "react";
import AuthForm from "./AuthForm.jsx";

const AdminAuth = () => {
  const getData = (data) => {};
  return (
    <div>
      <AuthForm onSubmit={getData} />
    </div>
  );
};

export default AdminAuth;
