import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RatingComponent from "./Score";
interface Props {
  show: boolean;
  onHide: () => void;
  ratingValue: number;
  handleRating: (n: number) => void;
  handleScoreServer: () => void;
}

export default function MyVerticallyCenteredModal({
  onHide,
  show,
  handleRating,
  ratingValue,
  handleScoreServer,
  ...props
}: Props) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Felecitaciones lo has logrado
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-center">Califica la aplicacion</h4>
        <div className="d-flex justify-content-center">
          <RatingComponent
            ratingValue={ratingValue}
            handleRating={handleRating}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            onHide();
            handleScoreServer();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
