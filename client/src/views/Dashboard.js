import { useContext, useEffect, useState } from "react";
import {
  Spinner,
  Card,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Toast,
} from "react-bootstrap";

import { AuthContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import DeletePostModal from "../components/posts/DeletePostModal";
import addIcon from "../assets/plus-circle-fill.svg";
// import Masonry from "react-masonry-css";

import PostService from "../services/PostService";

let postService = PostService.getInstance();

const Dashboard = () => {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    showDeletePostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(ModalContext);

  const [state, setState] = useState({
    list: [],
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await postService.getPosts();
      setState((prev) => ({
        ...prev,
        list: data,
        loading: false,
      }));
    };
    fetchData();
  }, [showAddPostModal, showUpdatePostModal, showDeletePostModal]);

  let body = null;

  // const breakPoints = {
  //   default: 4,
  //   1100: 3,
  //   768: 2,
  //   576: 1,
  // };

  if (state.loading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (state.list.length === 0) {
    body = (
      <div className="d-flex justify-content-center">
        <Card className="text-center mx-2 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Hiện tại bạn chưa có ghi chú nào cả</Card.Title>
            <Card.Text>
              Chọn nút bên dưới để thêm ghi chú đầu tiên của bạn.
            </Card.Text>
          </Card.Body>
          <Button
            variant="primary"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            Thêm một ghi chú
          </Button>
        </Card>
      </div>
    );
  } else {
    body = (
      <>
        {/* <Masonry
          breakpointCols={breakPoints}
          className="my-masonry-grid mt-3 px-3"
          columnClassName="my-masonry-grid_column"
        >
          {state.list.map((post) => (
            <div key={post._id}>
              <SinglePost post={post} />
            </div>
          ))}
        </Masonry> */}

        <Row className="mt-3 mx-3">
          {state.list.map((post) => (
            <Col
              key={post._id}
              className="col-sm-6 col-md-4 col-xl-3 mb-4 d-flex"
            >
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Thêm ghi chú mới</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {showUpdatePostModal && <UpdatePostModal />}
      {showDeletePostModal && <DeletePostModal />}

      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "20px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
