import "./App.css";
import Homepage from "./pages/Homepage";
import FunFact from "./pages/FunFact";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WeatherPage from "./pages/WeatherPage";
import FoodPage from "./pages/FoodPage";
import LoginPage from "./pages/HouseChat/LoginPage";
import RegistrationPage from "./pages/HouseChat/RegistrationPage";
import ChatPage from "./pages/HouseChat/ChatPage";

// this is the recommended router
// https://reactrouter.com/en/main/routers/create-browser-router
const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/fun-fact-generator", element: <FunFact /> },
  { path: "/weather-app", element: <WeatherPage /> },
  { path: "/food-ordering", element: <FoodPage /> },
  { path: "/chat/login", element: <LoginPage /> },
  { path: "/chat/registration", element: <RegistrationPage /> },
  { path: "/chat", element: <ChatPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
