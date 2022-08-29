import { Form, Button, Row, Col, Stack } from "react-bootstrap";
import { useState } from "react";
import {
  UserEntity,
  CliclosAcademicosEntity,
  MateriaResponseServer,
} from "../../types/types";
import { useForm } from "react-hook-form";

import { CreateNoteAdmin } from "../../api/users";

interface Props {
  cicloAcademico: CliclosAcademicosEntity;
  cicloAcademicoLoading: Boolean;
}

const CreateNota = ({ cicloAcademico, cicloAcademicoLoading }: Props) => {
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
    let datos = {
      ...data,
      paralelo: paraleloAbsolute,
      id_ciclo: cicloAcademico._id.$oid,
    };
    console.log(datos);
    await CreateNoteAdmin(datos);
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
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Nota Inicial</Form.Label>
            <Form.Control type="text" {...register("nota_inicial")} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Nota final</Form.Label>
            <Form.Control type="text" {...register("nota_final")} />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3 mt-2">
        <Form.Label>
          <h6 className="mb-0">Estado</h6>{" "}
        </Form.Label>
        <Form.Check
          type="checkbox"
          id="Active"
          label="Active"
          {...register("estado")}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateNota;
