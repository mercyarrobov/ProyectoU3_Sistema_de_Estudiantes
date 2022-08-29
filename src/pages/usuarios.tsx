import React, { useState, FormEvent, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Stack,
  Form,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";

//componenst
import FormUsers from "../components/users/FormUsuarios";
import TableUsers from "../components/users/TableUser";
//Redux - Store
import { useAppDispatch, useAppSelector } from "../hooks/useReducer";
import { GetUsers, deleteUser } from "../features/users";
import { DeleteUser } from "../api/users";

export default function Usuarios() {
  const [State, setState] = useState<number>(0);
  const [Change, setChange] = useState<Boolean>(false);
  const [Show, setShow] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);
  const loading = useAppSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);
  //
  const handleCheck = (val: number) => {
    setState(val);
    setChange(true);
  };

  const handleDeleteUser = async (username: string) => {
    let response = await DeleteUser(username);
    dispatch(deleteUser({ username: response.username }));
    setShow(true);
  };

  return (
    <>
      <h2>Usuarios</h2>
      <Container>
        <Row>
          <Col xs={5} className="p-4 m-auto shadow-sm rounded-lg">
            <Stack gap={2} className="col-md-5 mx-auto">
              <Button
                variant={State == 0 ? "primary" : "outline-primary"}
                onClick={() => handleCheck(0)}
              >
                Estudiante
              </Button>
              <Button
                variant={State == 1 ? "primary" : "outline-primary"}
                onClick={() => handleCheck(1)}
              >
                Docente
              </Button>
              <Button
                variant={State == 3 ? "primary" : "outline-primary"}
                onClick={() => handleCheck(3)}
              >
                Admin
              </Button>
              {!Change && (
                <p className="h6 text-center text-muted">
                  Por defecto esta en Estudiante
                </p>
              )}
            </Stack>
            <FormUsers rol={State} />
          </Col>
          <Col>
            <TableUsers
              loading={loading}
              users={users}
              deleteUser={handleDeleteUser}
            />
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-start" className="p-3">
        <Toast
          onClose={() => setShow(false)}
          show={Show}
          className="d-inline-block m-1"
          bg="success"
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Sistema gestion Academica</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body className="text-white">
            Usuario eliminado correctamente
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
