import Button from "../../components/shared/Button";
import Modal from "../../components/shared/Modal";
import "./PostPage.css";
import { useState } from "react";
import listenIcon from "../../assets/listenIcon.png"

const PostPage = ({ onClose, onSubmitPost }) => {
  const [inputText, setInputText] = useState("");

  return (
    <Modal onClose={onClose} color="var(--delft-blue)">
      <form className="post-form">
        <textarea
          placeholder="Please share your thoughts..."
          className="post-input"
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />

        <div className="post-footer">
          <img src={listenIcon}/>
          <div className="post-footer-buttons">
            <Button
              height="32px"
              width="102px"
              color="powder-blue"
              border="none"
              onSubmit={onClose}
            >
              Cancel
            </Button>
            <Button
              height="32px"
              width="102px"
              color="green"
              border="none"
              onSubmit={() => onSubmitPost(inputText)}
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default PostPage;
