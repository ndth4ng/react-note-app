import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

const ActionButtons = ({ url, _id }) => {
  const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext);

  const choosePost = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };
  
  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="playIcon" width="32" height="32" />
      </Button>
      <Button onClick={choosePost.bind(this, _id)} className="post-button">
        <img src={editIcon} alt="editIcon" width="32" height="32" />
      </Button>
      <Button onClick={deletePost.bind(this, _id)} className="post-button">
        <img src={deleteIcon} alt="deleteIcon" width="32" height="32" />
      </Button>
    </>
  );
};

export default ActionButtons;
