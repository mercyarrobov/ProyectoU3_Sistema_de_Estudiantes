import { Form, Button, Row, Col, Stack } from "react-bootstrap";
import { useState } from "react";
import {
  UserEntity,
  CliclosAcademicosEntity,
  MateriaResponseServer,
} from "../../types/types";
import { useForm } from "react-hook-form";

import { CreateAssignParalelo } from "../../api/users";

interface Props {
  users: UserEntity[];
  loading: Boolean;
  cicloAcademico: CliclosAcademicosEntity;
  cicloAcademicoLoading: Boolean;
  userDocentes: UserEntity[];
  materias: MateriaResponseServer[];
}

const CreateMateria = ({
  users,
  loading,
  cicloAcademico,
  cicloAcademicoLoading,
  userDocentes,
  materias,
}: Props) => {
  const [Active, setActive] = useState<number>(0);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const handleClick = (valor: number) => {
    setActive(valor);
  };

  const submited = async (data: any) => {
    let paraleloAbsolute = Active == 0 ? "A" : "B";
    let dataComplete = {
      ...data,
      id_ciclo: cicloAcademico._id.$oid,
      paralelo: paraleloAbsolute,
    };
    let responseServer = await CreateAssignParalelo(dataComplete);
  };
  return (
    <Form className="border p-4 rounded" onSubmit={handleSubmit(submited)}>
      <Stack gap={2} className="col-md-5 mx-auto">
        <Button
          variant={Active == 0 ? "primary" : "outline-primary"}
          onClick={() => handleClick(0)}
        >
          Paralelo A
        </Button>
        <Button
          variant={Active == 1 ? "primary" : "outline-primary"}
          onClick={() => handleClick(1)}
        >
          Paralelo B
        </Button>
      </Stack>
      <p className="mt-4 mb-0">
        <b>Ciclo Academico:</b>{" "}
        {cicloAcademicoLoading ? "loading..." : cicloAcademico?.descripcion}
      </p>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Docente</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...register("id_docente")}
        >
          <option>Selecione el Docente</option>
          {userDocentes.map((item) => (
            <option value={item._id}>{item.nombre}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mb-3">
        <Form.Label>Materia</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...register("id_materia")}
        >
          <option>Selecione la Materia</option>
          {materias.map((item) => (
            <option value={item._id.$oid}>{item.descripcion}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <h6>Asignar a estudiantes </h6>
      <hr />
      <Row className="mb-3">
        {users.map((item) => (
          <Col className="col-sm-4">
            <Form.Group controlId={`check-item-${item.nombre}`}>
              <Form.Check
                type="checkbox"
                value={item._id}
                {...register("user")}
                label={item.nombre}
              />
            </Form.Group>
          </Col>
        ))}
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateMateria;
