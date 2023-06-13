import "./Auth.css";
import PlantImage from "../../assets/Plant.png";
import GoogleIcon from "../../assets/Google-icon.png";
import Button from "../../components/shared/Button";
import { Link } from "react-router-dom";

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
              <span className="split-text">or sign up with email</span>
              <span className="split-line"></span>
            </div>

            <form>
              <div className="auth-control">
                <label htmlFor="email">Email</label>
                <input type="text" id="email"></input>
              </div>
              <div className="auth-control">
                <label htmlFor="password">Password</label>
                <input type="text" id="password"></input>
              </div>
              <Button
                height="50px"
                width="330px"
                color="delft-blue"
                border="delft-blue"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
