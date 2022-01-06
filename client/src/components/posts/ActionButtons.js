import viewIcon from "../../assets/eye-solid.svg";
import deleteIcon from "../../assets/trash.svg";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

import PostService from "../../services/PostService";

let postService = PostService.getInstance();

const ActionButtons = ({ _id }) => {
  const { setShowUpdatePostModal, setShowDeletePostModal } =
    useContext(ModalContext);

  const choosePost = (postId) => {
    postService.setPost(postId);
    setShowUpdatePostModal(true);
  };

  const confirmDelete = (postId) => {
    postService.setPost(postId);
    setShowDeletePostModal(true);
  };

  return (
    <>
      <Button onClick={choosePost.bind(this, _id)} className="post-button">
        <img
          className="view-icon"
          src={viewIcon}
          alt="editIcon"
          width="32"
          height="32"
        />
      </Button>
      <Button onClick={confirmDelete.bind(this, _id)} className="post-button">
        <img src={deleteIcon} alt="deleteIcon" width="32" height="32" />
      </Button>
    </>
  );
};

export default ActionButtons;
