import "./ChatPage.css";
import Avatar from "../../assets/Doraemon.png";
import Button from "../../components/shared/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useEffect, useState } from "react";
import { database, storage } from "../../utils/firebase";
import { ref, get, onValue } from "firebase/database";
import { ref as refStorage, getDownloadURL } from "firebase/storage";

const ChatPage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // retrieve user info
    if (!location.state) {
      return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "500",
            fontSize: "30px",
          }}
        >
          <p>You're not logged in!! But good try :)</p>
          <Link to="/chat/login">Here's the Login Page</Link>
        </div>
      );
    }

    setUser(location.state.user);

    // retrieve chat thread

    console.log("TRIGGERED");
    
    const postRef = ref(database, "chat/posts");

    get(postRef).then((snapshot) => {
      if (snapshot.exists()) {
        const chatData = snapshot.val();

        setPosts([]);
        console.log("data", chatData);
        for (const key of Object.keys(chatData)) {
          const post = chatData[key];

          const userRef = ref(database, "chat/users/" + post.user);
          console.log("USERRR:", userRef);

          onValue(userRef, (snapshot) => {
            const userData = snapshot.val();

            const profileRef = refStorage(
              storage,
              "gs://react-playground-387214.appspot.com/ProfilePics/" +
                userData.avatarPath
            );

            getDownloadURL(profileRef)
              .then((url) => {
                setPosts((prevPost) => [
                  ...prevPost,
                  <div className="chat-post" id={post.user} key={key}>
                    <header>
                      <img src={url} alt="profile picture" />
                      <span className="post-user">{post.user}</span>
                      <span className="post-date">{post.date}</span>
                    </header>
                    <body>{post.text}</body>
                  </div>,
                ]);
              })

              .catch((error) => {
                console.log(error);
              });
          });
        }
      } else {
        console.log("CANNOT FIND SNAPSHOT");
      }
    });
  }, []);

  const userInfoText = (
    <div className="user-info-text">
      <div className="user-avatar">
        <img src={Avatar} alt="Profile picture" />
      </div>
      <div className="user-name">
        <span>Welcome back,</span>
        <h2>{user.name}</h2>
      </div>
      <div className="user-stats">
        <h4>Statistics:</h4>
        <span>Total Posts: {user.totalPosts} </span>
        <span>Registered For: {user.totalDays} Days </span>
      </div>
      <div className="user-logout">
        <Button
          height="40px"
          width="128px"
          color="delft-blue"
          border="black solid 0.5px"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/", { replace: true });
          }}
        >
          Log out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="chat-container">
      <div className="chat-boxes">
        <div className="user-info">
          <div className="user-background" />
          {userInfoText}
        </div>
        <div className="chat-thread">
          <div className="chat-background" />
          <div className="chat-thread-text">{posts}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
