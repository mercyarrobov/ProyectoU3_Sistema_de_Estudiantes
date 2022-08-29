import React, { DragEvent, useState } from "react";
import DragPoints from "../components/DragAndDrop/DropPoints";
import DragCreator from "../components/DragAndDrop/creator";
import { Container } from "react-bootstrap";
import ModalComponent from "../components/DragAndDrop/Modal";
import { useSearchParams } from "react-router-dom";
import { CreateNote, CreateScore } from "../api/users";
import { useNavigate } from "react-router-dom";

type data = {
  num: string;
  url: string;
};
interface Props {
  nums: data[];
}
const Games = () => {
  const [searchParams] = useSearchParams();

  const [ImageUrl, setUrlImage] = useState<string | null>();
  const [Errores, setErrores] = useState<number>(0);
  const [Modal, setModal] = useState<boolean>(false);
  const [Count, setCount] = useState(0);
  const [rating, setRating] = useState<number>(0);
  const navigate = useNavigate();

  let datos: data[] = [
    {
      num: "uno",
      url: "https://th.bing.com/th/id/OIP.RimV3K4QYioftW4NyKTcZgHaHa?pid=ImgDet&rs=1",
    },
    {
      num: "dos",
      url: "https://st3.depositphotos.com/1067257/14468/v/950/depositphotos_144685297-stock-illustration-human-cartoon-hand-showing-two.jpg",
    },
    {
      num: "tres",
      url: "https://st3.depositphotos.com/1067257/14467/v/950/depositphotos_144679431-stock-illustration-human-cartoon-hand-showing-three.jpg",
    },
    {
      num: "cuatro",
      url: "https://i.pinimg.com/736x/38/53/54/385354573d2afd7c4689dec86fc4d8c9.jpg",
    },
    {
      num: "cinco",
      url: "https://i.pinimg.com/736x/6f/e5/1a/6fe51a1990dddf60eec4835b1a15850f.jpg",
    },
  ];

  let datosNum: data[] = [
    {
      num: "uno",
      url: "https://th.bing.com/th/id/R.236d150900fe42418949255d4e5bd177?rik=Ueokur4mBjmGCg&riu=http%3a%2f%2fwww.businesspassioncuisine.fr%2fwa_p_albums%2fp_album_kapk4n3l0%2fkapk01ee62fbxk%2fnumber-1_1_(1).jpg&ehk=25hkCOb%2bzIyACBx432bjcrREYhuN13LwUcGDGil%2f80I%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      num: "dos",
      url: "https://st2.depositphotos.com/5389310/9481/i/450/depositphotos_94813506-stock-photo-3d-plastic-blue-number-2.jpg",
    },
    {
      num: "tres",
      url: "https://th.bing.com/th/id/OIP.1Kml4W8gTRA8ha2p2TM5HQHaHa?pid=ImgDet&w=800&h=800&rs=1",
    },
    {
      num: "cuatro",
      url: "https://th.bing.com/th/id/OIP.NCILA2GFxW6UAb2MKyUArwHaHa?pid=ImgDet&w=650&h=650&rs=1",
    },
    {
      num: "cinco",
      url: "https://media.istockphoto.com/photos/golden-yellow-wood-number-5-or-five-isolated-white-backgroundone-of-picture-id854051584?k=6&m=854051584&s=170667a&w=0&h=e-yIpYxvF9N1mQegV9n2KVuftnSIycq4n8LydYfPPA8=",
    },
  ];

  let count = 0;

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    // console.log(e.currentTarget.querySelector("img")?.src);
    setUrlImage(e.currentTarget.querySelector("img")?.src);
    e.dataTransfer.setData("text", e.currentTarget.id);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const draggedElementData = e.dataTransfer.getData("text");

    const droppableElementData = e.currentTarget.getAttribute("data-id");

    if (draggedElementData === droppableElementData) {
      count = count + 1;
      const draggedElement =
        document.getElementById(draggedElementData)?.lastChild;

      e.currentTarget.classList.add("dropped");
      draggedElement?.classList.add("hide");
      draggedElement?.setAttribute("draggable", "false");
      e.currentTarget.innerHTML = ``;
      e.currentTarget.insertAdjacentHTML(
        "afterbegin",
        `<img  class="images" src="${ImageUrl}" />`
      );
      setCount((prev) => prev + 1);
    } else {
      setErrores((prev) => prev + 1);
    }
    console.log(Count);
    if (Count >= 4) {
      //enviar los resultados a la api
      console.log(searchParams.get("user"));
      let id = searchParams.get("user");
      CreateNote(id, Errores).then((res) => console.log(res));
      setModal(true);
      console.log("WIN");
    }
  };

  const hidenModal = () => {
    setModal((prev) => !prev);
  };

  const handleRating = (n: number) => {
    setRating(n);
    console.log(n);
  };

  const handleScoreServer = () => {
    let id = searchParams.get("user");
    let score: number = rating;

    CreateScore(id, score).then((res) => console.log(res));
    return navigate("/", { replace: true });
  };

  return (
    <Container>
      <h2>Games</h2>
      <div className="d-flex justify-content-around mb-5">
        <DragCreator nums={datos} handleDragStart={handleDragStart} />
      </div>
      <div className="d-flex justify-content-around ">
        <DragPoints
          nums={datosNum}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
      </div>
      <ModalComponent
        onHide={hidenModal}
        show={Modal}
        handleRating={handleRating}
        ratingValue={rating}
        handleScoreServer={handleScoreServer}
      />
    </Container>
  );
};

export default Games;
