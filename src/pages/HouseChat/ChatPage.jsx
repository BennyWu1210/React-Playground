import "./ChatPage.css";
import Avatar from "../../assets/Doraemon.png";
import Button from "../../components/shared/Button";

const ChatPage = ({ user }) => {
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
        <h4>Statistics</h4>
        <span>Total Posts: {user.totalPosts} </span>
        <span>Registered For: {user.totalDays} Days </span>
      </div>
      <div className="user-logout">
        <Button
          height="40px"
          width="128px"
          color="delft-blue"
          border="black solid 0.5px"
          onSubmit={() => {}}
        >
          Log out
        </Button>
      </div>
    </div>
  );

  const chatThread = user.posts.map((post) => (
    <div className="chat-post" id={post.user}>
      <header>
        <img src={Avatar} alt="profile picture" />
        <span className="post-user">{post.user}</span>
        <span className="post-date">{post.date}</span>
      </header>
      <body>{post.text}</body>
    </div>
  ));

  console.log(chatThread);

  console.log(chatThread);
  return (
    <div className="chat-container">
      <div className="chat-boxes">
        <div className="user-info">
          <div className="user-background" />
          {userInfoText}
        </div>
        <div className="chat-thread">
          <div className="chat-background" />
          <div className="chat-thread-text">{chatThread}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
