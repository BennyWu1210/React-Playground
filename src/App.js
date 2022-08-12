import "./App.css";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
