import { Form, Button, Row, Col, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
const CreateMateria = () => {
  let dias = [
    {
      dia: "Lunes",
    },
    {
      dia: "Martes",
    },
    {
      dia: "Miercoles",
    },
    {
      dia: "Jueves",
    },
    {
      dia: "Viernes",
    },
  ];
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onsubmit = async (data: any) => {
    await fetch(`http://localhost:5000/api/createMateria`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <Form className="border p-4 rounded" onSubmit={handleSubmit(onsubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" {...register("descripcion")} />
      </Form.Group>
      <h6 className="mb-0">Horario</h6>
      <hr />
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Hora Inicial</Form.Label>
            <Form.Control type="text" {...register("hora_inicial")} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Hora Final</Form.Label>
            <Form.Control type="text" {...register("hora_final")} />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Aula</Form.Label>
        <Form.Control type="text" {...register("aula")} />
      </Form.Group>
      <Stack direction="horizontal" gap={2}>
        {dias.map((item) => (
          <Form.Group className="mb-3" controlId={`check-item-${item.dia}`}>
            {/* <Form.Check type="checkbox" label={item.dia} ref={register} /> */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={item.dia}
                id="flexCheckIndeterminate"
                {...register(`${item.dia}`)}
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckIndeterminate"
              >
                {item.dia}
              </label>
            </div>
          </Form.Group>
        ))}
      </Stack>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateMateria;
