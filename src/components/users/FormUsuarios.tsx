import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormEvent, useState, ChangeEvent } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUser } from "../../api/users";

type Inputs = {
  nombre: string;
  apellido: string;
  username: string;
  password: string;
  numCedula: number;
};
interface Props {
  rol: number;
}
const FormUsers = ({ rol }: Props) => {
  const [Picture, setPicture] = useState<any>();

  const schema = yup.object().shape({
    numCedula: yup.number().required("Field required"),
    nombre: yup.string().required("Field required"),
    username: yup.string().required("Field required"),
    password: yup.string().required("Field required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched", resolver: yupResolver(schema) });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget?.files[0];
    console.log(file);
    setPicture(file);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSubmit(async (data) => {
      // console.log(data);
      let rolResult =
        rol == 0 ? "estudiante" : rol == 1 ? "docente" : "administrador";
      // let datos = {
      // ...data,
      // image_usuario: Picture,
      // rol: rolResult,
      // };
      let URI = "http://localhost:5000/api";
      formData.append("image_perfil", Picture);
      formData.append("rol", rolResult);
      let response = await fetch(`${URI}/createUser`, {
        method: "POST",
        body: formData,
      });
      await response.json();
    })(e);
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Num Cl</Form.Label>
          <Form.Control
            {...register("numCedula")}
            type="text"
            placeholder="Enter number"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            {...register("nombre")}
            type="text"
            placeholder="Enter number"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            {...register("apellido")}
            type="text"
            placeholder="Enter number"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            {...register("username")}
            placeholder="Enter number"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password")}
            placeholder="****"
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Imagen perfil</Form.Label>
          <Form.Control
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            onChange={onChange}
            id="file"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default FormUsers;
