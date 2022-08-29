// components
import SiginComponent from "../components/Form";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { Response } from "../context/types";
import { useNavigate } from "react-router-dom";
type FormValues = {
  username: string;
  password: string;
};
const SignPage = () => {
  const { authenticate } = useAuth();
  const [Errores, setErrores] = useState<Response>({
    error: null,
    message: "",
  });
  const navigate = useNavigate();
  const onSubmit = async (value: FormValues) => {
    let datos = await authenticate(value.username, value.password);
    if (datos.error)
      setErrores({
        ...Errores,
        error: true,
        message: datos.message,
      });
    console.log(datos);
    if (datos.rol?.toLowerCase() == "administrador")
      return navigate("/Admin/usuarios", { replace: true });
    if (datos.rol?.toLowerCase() == "docente")
      return navigate("/Docente/notas", { replace: true });
  };
  return (
    <Container>
      <h1 className="  mt-5 p-3 text-center rounded">Sign In</h1>
      <Row className="mt-5">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <SiginComponent
            submitData={onSubmit}
            error={Errores.error}
            message={Errores.message}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default SignPage;
