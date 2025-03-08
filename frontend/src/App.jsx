import { useState } from "react"
import { Route, Routes } from "react-router";
import Auth from "./components/Auth/Auth.jsx";
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
        </Routes>
        </section>
      </div>
    </>
  );
}

export default App;
