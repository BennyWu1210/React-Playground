import "./App.css";
import Homepage from "./pages/Homepage";
import FunFact from "./pages/FunFact";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { isMobile } from "react-device-detect";
import WeatherPage from "./pages/WeatherPage";
import FoodPage from "./pages/FoodPage";
import LoginPage from "./pages/HouseChat/LoginPage";
import RegistrationPage from "./pages/HouseChat/RegistrationPage";
import ChatPage from "./pages/HouseChat/ChatPage";

const DUMMY_USER = {
  name: "Doraemon",
  totalPosts: 1,
  totalDays: 3,
  avatarPath: "./assets/Doraemon.png",
  posts: [
    {
      user: "Benny_Cooldkid",
      avatarPath: "./assets/Doraemon.png",
      text: "I really hope I can pull thsi through. The design looks great but I don't know what will happen when I program it out lol",
      date: "2023-06-10",
    },
    {
      user: "KevinWang",
      avatarPath: "./assets/Doreamon.png",
      text: "I love Benny",
      date: "2023-06-09",
    },
    {
      user: "Pournasrola",
      avatarPath: "./assets/Doreamon.png",
      text: "Oyaya is an attitude toward life.\n \
      It is resistance to the era of involution. \n \
      It symbolizes the resistance against captilism \n \
      Only by mastering the spirit of oyaya, \n \
      can you truly enjoy your life.",
      date: "2023-06-09",
    },
    {
      user: "Jilao",
      avatarPath: "./assets/Doraemon.png",
      text: "ababab",
      date: "2023-06-08",
    },
  ],
};

// this is the recommended router
// https://reactrouter.com/en/main/routers/create-browser-router
const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/fun-fact-generator", element: <FunFact /> },
  { path: "/weather-app", element: <WeatherPage /> },
  { path: "/food-ordering", element: <FoodPage /> },
  { path: "/chat/login", element: <LoginPage /> },
  { path: "/chat/registration", element: <RegistrationPage /> },
  { path: "/chat", element: <ChatPage user={DUMMY_USER} /> }, // Dummy Data
]);

function App() {
  if (isMobile) {
    return (
      <>
        <h3>Bummer..😔</h3>
        <p>
          Please go access this on a computer! The styling is somewhat off on a
          mobile phone so I am disabling it hehe. Didn't get a chance to fix it
          yet..🫢 unless you're down to help me out!! Love ya :)
        </p>
      </>
    );
  }
  return <RouterProvider router={router} />;
}

export default App;
