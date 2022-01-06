import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";

import PostService from "../../services/PostService";

let postService = PostService.getInstance();

const UpdatePostModal = () => {
  // Context

  const { showUpdatePostModal, setShowUpdatePostModal, setShowToast } =
    useContext(ModalContext);

  const post = postService.getPost();

  const [updatedPost, setUpdatedPost] = useState(post);

  const { title, description, status } = updatedPost;

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPost({ ...updatedPost, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log(updatedPost);
    const { success, message } = await postService.updatePost(updatedPost);

    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });

    setShowUpdatePostModal(false);
  };

  const closeDialog = () => {
    setShowUpdatePostModal(false);
  };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật ghi chú</Modal.Title>
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
              rows={12}
              placeholder="Description"
              name="description"
              value={description}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onHandleChange}
            >
              <option value="CHƯA THỰC HIỆN">CHƯA THỰC HIỆN</option>
              <option value="ĐANG THỰC HIỆN">ĐANG THỰC HIỆN</option>
              <option value="HOÀN THÀNH">HOÀN THÀNH</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Cập nhật
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
