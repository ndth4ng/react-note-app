import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  // Context

  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Clear add post data
  const resetAddPostData = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
    setShowAddPostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const { success, message } = await addPost(newPost);

    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });

    resetAddPostData();
  };

  const closeDialog = () => {
    resetAddPostData();
  };

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
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

          <Form.Group>
            <Form.Control
              onChange={onHandleChange}
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
            />
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

export default AddPostModal;
