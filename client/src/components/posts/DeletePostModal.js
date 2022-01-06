import { Modal, Button, Form } from "react-bootstrap";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

import PostService from "../../services/PostService";

let postService = PostService.getInstance();

const DeletePostModal = () => {
  const { showDeletePostModal, setShowDeletePostModal, setShowToast } =
    useContext(ModalContext);

  const post = postService.getPost();

  const onSubmit = async (event) => {
    event.preventDefault();

    const { success, message } = await postService.deletePost(post._id);

    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });

    closeDialog();
  };

  const closeDialog = () => {
    setShowDeletePostModal(false);
  };

  return (
    <Modal show={showDeletePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Xóa ghi chú</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>Bạn có chắc chắn muốn xóa ghi chú này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Đồng ý
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeletePostModal;
