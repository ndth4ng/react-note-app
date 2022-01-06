import { Card, Row, Col, Badge } from "react-bootstrap";
import ActionButtons from "./ActionButtons";

const SinglePost = ({
  post: { _id, status, title, description, updatedAt },
}) => {
  return (
    <Card
      className="shadow w-100"
      border={
        status === "HOÀN THÀNH"
          ? "success"
          : status === "ĐANG THỰC HIỆN"
          ? "warning"
          : "danger"
      }
    >
      <Card.Header>
        <h6 className="post-title text-center">{title}</h6>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Row className="text-md-center">
            <Col className="mb-3 col-6 col-md-12 col-xl-6">
              <Badge
                pill
                bg={
                  status === "HOÀN THÀNH"
                    ? "success"
                    : status === "ĐANG THỰC HIỆN"
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="mb-3 text-end text-xl-end text-md-center col-6 col-md-12 col-xl-6">
              <ActionButtons _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text className="post-description">{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{updatedAt}</Card.Footer>
    </Card>
  );
};

export default SinglePost;
