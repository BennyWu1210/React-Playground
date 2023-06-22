import "./Auth.css";
import PlantImage from "../../assets/Flower.png";
import GoogleIcon from "../../assets/Google-icon.png";
import Button from "../../components/shared/Button";
import { Link, redirect, useNavigate } from "react-router-dom";
import { database } from "../../utils/firebase";
import { onValue, ref } from "firebase/database";
import { useState } from "react";

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
      Sign in with Google
    </span>
  </div>
);

const LoginPage = ({ history }) => {
  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const onLoginClicked = async (e) => {
    e.preventDefault();
    const userDataRef = ref(database, "chat/users/" + nameInput);
    onValue(userDataRef, (snapshot) => {
      const userData = snapshot.val();

      if (!userData) {
        console.log("NOT VALID USER!");
      } else {
        if (userData.password == passwordInput) {
          console.log("HUH");
          navigate("/chat", {
            state: {
              user: {
                name: "Bruh",
                totalPosts: 1,
                totalDays: 3,
                avatarPath: "./assets/Doraemon.png",
                posts: [],
              },
            },
          });
        } else {
          console.log("INCORRECT PASSWORD");
        }
      }

      setPasswordInput("");
    });
  };

  const handleInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  return (
    <div className="auth-container sign-in">
      <div className="auth-content">
        <div className="auth-styles">
          <img src={PlantImage} />
          <h2>React is so fun!</h2>
        </div>
        <div className="auth-options">
          <h2>Login 🚀</h2>
          <Link to="/chat/registration">
            <p className="auth-signup">No account yet? Sign up here!</p>
          </Link>
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
              <span className="split-text">or sign in with username</span>
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
                onSubmit={onLoginClicked}
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

export default LoginPage;
