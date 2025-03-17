import { useState } from "react"
import { Route, Routes } from "react-router";
import Auth from "./components/Auth/Auth.jsx";
import AdminProfile from "./Profile/AdminProfile.jsx";
import Admin from "./components/Admin/Admin";
import "./App.css";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
      <h1>Hello</h1>
        <section>
  <Routes>
        <Route path="/auth" element={<Auth/>} />
        <Route path="/userAdmin" element={<AdminProfile/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
        </section>
      </div>
    </>
  );
}

export default App;
