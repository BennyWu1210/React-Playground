import "./App.css";
import Homepage from "./pages/Homepage";
import FunFact from "./pages/FunFact";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WeatherPage from "./pages/WeatherPage";

// this is the recommended router
// https://reactrouter.com/en/main/routers/create-browser-router
const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/fun-fact-generator", element: <FunFact /> },
  { path: "/weather-app", element: <WeatherPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
