import logo from "./logo.svg";
import "./App.css";
import Home from "./components/pages/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
