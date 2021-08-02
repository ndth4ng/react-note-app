import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";

const UpdatePostModal = () => {
  // Context

  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  const { title, description, url, status } = updatedPost;

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPost({ ...updatedPost, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setShowUpdatePostModal(false);

    const { success, message } = await updatePost(updatedPost);

    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  const closeDialog = () => {
    setShowUpdatePostModal(false);
    setUpdatedPost(post);
  };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={onHandleChange}
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              onChange={onHandleChange}
              as="textarea"
              row={3}
              placeholder="Description"
              name="description"
              value={description}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              onChange={onHandleChange}
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onHandleChange}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
