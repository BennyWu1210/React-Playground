import ReactDOM from "react-dom";
import "./Modal.css";

const Backdrop = (props) => {
  return <div className="modal-backdrop" onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal" style={{backgroundColor: props.color}}>
      {/* Need to write CSS for content */}
      <div className="modal-content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay {...props}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};
export default Modal;
