import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
const ComponentCicloAcademico = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    await fetch(`http://localhost:5000/api/createCicloAcademico`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  return (
    <Form className="border p-4 rounded" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control type="text" {...register("descripcion")} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Orden</Form.Label>
        <Form.Control type="text" {...register("orden")} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Agregar
      </Button>
    </Form>
  );
};

export default ComponentCicloAcademico;
