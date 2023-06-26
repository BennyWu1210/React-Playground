import "./ChatPage.css";
import AddIcon from "../../assets/add-button.png";
import Button from "../../components/shared/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { database, storage } from "../../utils/firebase";
import { ref, get, onValue, set } from "firebase/database";
import {
  ref as refStorage,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

import { getDateDiff } from "../../utils/dateUtils";
import PostPage from "./PostPage";
import { getDateString } from "../../utils/dateUtils";

const ChatPage = () => {
  const [profileURL, setProfileURL] = useState("");
  const [posts, setPosts] = useState([]);
  const [postKeys, setPostKeys] = useState([]);
  const [user, setUser] = useState({});
  const [postVisible, setPostVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    const userRef = ref(database, "chat/users/" + user.name);
    const fileName = file.name.split(".");
    const newFile = new File(
      [file],
      fileName[0] + Math.floor(Math.random() * 1000) + "." + fileName[1]
    );
    const storageRef = refStorage(
      storage,
      "gs://react-playground-387214.appspot.com/ProfilePics/" + newFile.name
    );

    uploadBytes(storageRef, newFile, { contentType: "image/" + fileName[1] })
      .then(() => {
        console.log("UPLOADED SUCCESSFULLY!");
      })
      .then(() => {
        onValue(userRef, (snapshot) => {
          const userInfo = snapshot.val();
          const newUserInfo = { ...userInfo, avatarPath: newFile.name };
          set(userRef, newUserInfo).then(() => {
            setUser((prevState) => {
              return { ...prevState, avatarPath: newUserInfo.avatarPath };
            });
            console.log("SUCCESSFULLY SET NEW PROFILE");
          });
        });
      })
      .then(() => {
        getDownloadURL(storageRef).then((url) => {
          setProfileURL(url);
        });
      });
  };

  const onSubmitPost = (input) => {
    // update total posts
    const userRef = ref(database, "chat/users/" + user.name);

    let updated = false;
    onValue(userRef, (snapshot) => {
      if (!updated) {
        updated = true; // a simple and idiotic fix to the infinite loop
        const userInfo = snapshot.val();

        const newUserInfo = {
          ...userInfo,
          totalPosts: userInfo.totalPosts + 1,
        };

        setUser((prevState) => {
          return { ...prevState, totalPosts: prevState.totalPosts + 1 };
        });

        set(userRef, newUserInfo).then(() => {
          console.log("SUCCESSFUL", newUserInfo);
        });
      }
    });

    console.log("SUBMITTED POST");
    setUser((prevState) => {
      return { ...prevState, totalPosts: prevState.totalPosts + 1 };
    });

    
    const postIDRef = ref(database, "chat/postID");

    updated = false;
    onValue(postIDRef, (snapshot) => {
      if (!updated) {
        updated = true;
        const value = snapshot.val();
        set(postIDRef, +value - 1).then(() => {

          const postRef = ref(database, "chat/posts/" + (+value - 1));

          const newPostInfo = {
            user: user.name,
            date: getDateString(),
            text: input,
          };

          set(postRef, newPostInfo).then(() => {
            retrievePosts();
            console.log("NEW POST SUCCESSFUL");
          });
        });
      }
    });

    setPostVisible(false);
  };

  const retrievePosts = () => {
    console.log("HEHHHHHHHHHH");
    const postRef = ref(database, "chat/posts");

    get(postRef).then((snapshot) => {
      if (snapshot.exists()) {
        setPosts([]);
        const chatData = snapshot.val();

        for (const key of Object.keys(chatData).sort()) {
          console.log(postKeys + " LOL!" );
          if (postKeys.includes(key)) continue;
          const post = chatData[key];

          const userRef = ref(database, "chat/users/" + post.user);

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
                setPostKeys((prevKeys) => [...prevKeys, key]);
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
  };

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

    const userRef = ref(database, "chat/users/" + location.state.user.name);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      console.log("DAAA", data);
      setUser({ ...location.state.user, totalPosts: data.totalPosts });
    });

    // retrieve chat thread
    console.log("TRIGGERED");

    // retrieve posts
    retrievePosts();
  }, []);

  useEffect(() => {
    if (user.avatarPath != undefined && user.avatarPath != null) {
      console.log("WAYYY");
      // retrive profile pic
      const userRef = ref(database, "chat/users/" + user.name);

      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        const storageRef = refStorage(
          storage,
          "gs://react-playground-387214.appspot.com/ProfilePics/" +
            data.avatarPath
        );

        getDownloadURL(storageRef).then((url) => {
          setProfileURL(url);
        });
      });
    }
  }, [user]);

  const userInfoText = (
    <div className="user-info-text">
      {postVisible && (
        <PostPage
          onClose={() => setPostVisible(false)}
          onSubmitPost={onSubmitPost}
        />
      )}
      <div className="user-avatar">
        <img src={profileURL} alt="Profile picture" />
        <form>
          <label for="profile-upload" />
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleProfileUpload}
          />
          <img src={AddIcon} />
        </form>
      </div>
      <div className="user-name">
        <span>Welcome back,</span>
        <h2>{user.name}</h2>
      </div>
      <div className="user-stats">
        <h4>Statistics:</h4>
        <span>Total Posts: {user.totalPosts} </span>
        <span>
          Registered For:{" "}
          {getDateDiff(new Date(), new Date(user.dateRegistered))} Days{" "}
        </span>
      </div>
      <div className="user-logout">
        <Button
          height="40px"
          width="128px"
          color="green"
          border="black solid 0.5px"
          onSubmit={(e) => {
            e.preventDefault();
            setPostVisible(true);
          }}
        >
          Post
        </Button>
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
