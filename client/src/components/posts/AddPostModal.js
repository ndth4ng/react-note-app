import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";

import PostService from "../../services/PostService";

let postService = PostService.getInstance();

const AddPostModal = () => {
  // Context

  const { showAddPostModal, setShowAddPostModal, setShowToast } =
    useContext(ModalContext);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    status: "CHƯA THỰC HIỆN",
  });

  const { title, description } = newPost;

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Clear add post data
  const resetAddPostData = () => {
    setNewPost({
      title: "",
      description: "",
      status: "CHƯA THỰC HIỆN",
    });
    setShowAddPostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const { success, message } = await postService.addPost(newPost);

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
        <Modal.Title>Thêm ghi chú mới</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={onHandleChange}
              type="text"
              placeholder="Tiêu đề"
              name="title"
              required
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
              placeholder="Nội dung"
              name="description"
              value={description}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Thêm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
