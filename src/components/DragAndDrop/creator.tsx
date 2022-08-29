import { DragEvent } from "react";
import styled from "styled-components";
type data = {
  num: string;
  url: string;
};
interface Props {
  nums: data[];
  handleDragStart: (e: DragEvent<HTMLDivElement>) => void;
}

const CreateElements = ({ nums, handleDragStart }: Props) => {
  return (
    <>
      {nums.map((item) => (
        <DivDraggableImage
          className="draggable-image"
          draggable={true}
          onDragStart={handleDragStart}
          id={item.num}
        >
          <Img src={item.url} />
        </DivDraggableImage>
      ))}
    </>
  );
};

const DivDraggableImage = styled.div`
  width: 8em;
  cursor: move;
  .hide {
    display: none;
  }
`;
const Img = styled.img`
  width: 8em;
  filter: drop-shadow(0 0.3em 0.9em rgba(0, 0, 0, 0.25));
`;
export default CreateElements;
