import "./Auth.css";
import { useState } from "react";
import PlantImage from "../../assets/Plant.png";
import GoogleIcon from "../../assets/Google-icon.png";
import Button from "../../components/shared/Button";
import { getDateString } from "../../utils/dateUtils";
import { Link } from "react-router-dom";
import { database } from "../../utils/firebase";
import { ref, set } from "firebase/database";

const googleButton = (
  <div
    style={{
      position: "relative",
      width: "100%",
    }}
  >
    <img
      src={GoogleIcon}
      style={{
        position: "absolute",
        left: "20px",
        top: "-12px",
        height: "25px",
      }}
    />
    <span style={{ position: "absolute", left: "100px", top: "-12px" }}>
      Sign up with Google
    </span>
  </div>
);

const RegistrationPage = () => {
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const onRegisterClicked = (e) => {
    e.preventDefault();
    console.log(nameInput, passwordInput);
    saveUserData(nameInput, passwordInput);
  };

  const handleInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const saveUserData = (username, password) => {
    // Make sure the username doesn't already exists
    const userRef = ref(database, "chat/users/" + username);

    set(userRef, {
      password: password,
      dateRegistered: getDateString(),
      avatarPath: "./assets/Doraemon.png", // default
      totalPosts: 0,
    })
      .then(() => console.log("Data saved successfully!"))
      .catch(() => console.log("Encountered error"));
  };

  return (
    <div className="auth-container sign-up">
      <div className="auth-content">
        <div className="auth-styles">
          <img src={PlantImage} />
          <h2>React is so fun!</h2>
        </div>
        <div className="auth-options">
          <h2>Registration 🔥</h2>

          <div className="auth-forms-container">
            <Button
              height="50px"
              width="330px"
              color="black"
              border="delft-blue"
            >
              {googleButton}
            </Button>
            <div className="options-line">
              <span className="split-line"></span>
              <span className="split-text">or sign up with username</span>
              <span className="split-line"></span>
            </div>

            <form>
              <div className="auth-control">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={nameInput}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="auth-control">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={passwordInput}
                  onChange={handlePasswordChange}
                ></input>
              </div>
              <Button
                height="50px"
                width="330px"
                color="delft-blue"
                border="delft-blue"
                onSubmit={onRegisterClicked}
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
      <span style={{ color: "#dd3333" }}>
        (<b>Warning</b>: Please don't provide a real password of yours. It is{" "}
        <b>not</b> secured and I don't want you to start a lawsuit against me
        lol)
      </span>
    </div>
  );
};

export default RegistrationPage;
