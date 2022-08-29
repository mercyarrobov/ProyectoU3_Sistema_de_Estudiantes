import { DragEvent } from "react";
import styled from "styled-components";
type data = {
  num: string;
  url: string;
};
interface Props {
  nums: data[];
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
}

const DropPoints = ({ nums, handleDragOver, handleDrop }: Props) => {
  return (
    <>
      {nums.map((item) => (
        <Contries
          className="contries"
          data-id={item.num}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Img src={item.url} />
        </Contries>
      ))}
    </>
  );
};

const Contries = styled.div`
  width: 10em;
  height: 8em;
  display: grid;
  place-items: center;
  border: 0.25em dashed #010c39;
  border-radius: 0.8em;
  overflow: hidden;
  .dropped {
    padding: 0;
    background-color: #e5ffc8;
  }
  .hide {
    display: none;
  }
  .images {
    width: 8em;
  }
`;
const Img = styled.img`
  width: 8em;
  filter: drop-shadow(0 0.3em 0.9em rgba(0, 0, 0, 0.25));
`;

export default DropPoints;
